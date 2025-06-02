"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("@chatbot-rag/database");
const bcryptjs_1 = require("bcryptjs");
const crypto_1 = require("crypto");
const speakeasy = __importStar(require("speakeasy"));
const qrcode = __importStar(require("qrcode"));
let AuthService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AuthService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AuthService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        usersService;
        jwtService;
        configService;
        constructor(usersService, jwtService, configService) {
            this.usersService = usersService;
            this.jwtService = jwtService;
            this.configService = configService;
        }
        async validateUser(email, password) {
            const user = await this.usersService.findByEmail(email);
            if (user && user.passwordHash && (0, bcryptjs_1.compareSync)(password, user.passwordHash)) {
                return user;
            }
            return null;
        }
        async login(user) {
            const tokens = await this.generateTokens(user.id, user.email);
            await this.updateRefreshToken(user.id, tokens.refreshToken);
            if (user.twoFactorEnabled) {
                return {
                    requiresTwoFactor: true,
                    userId: user.id,
                };
            }
            return {
                ...tokens,
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    role: user.role,
                },
            };
        }
        async register(dto) {
            const existingUser = await this.usersService.findByEmail(dto.email);
            if (existingUser) {
                throw new common_1.ConflictException('User with this email already exists');
            }
            if (dto.username) {
                const existingUsername = await this.usersService.findByUsername(dto.username);
                if (existingUsername) {
                    throw new common_1.ConflictException('Username already taken');
                }
            }
            const passwordHash = (0, bcryptjs_1.hashSync)(dto.password, 10);
            const user = await database_1.prisma.user.create({
                data: {
                    email: dto.email,
                    username: dto.username,
                    passwordHash,
                    role: 'user',
                },
            });
            const verificationToken = (0, crypto_1.randomBytes)(32).toString('hex');
            await database_1.prisma.verificationToken.create({
                data: {
                    userId: user.id,
                    token: verificationToken,
                    type: 'email_verification',
                    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
                },
            });
            // TODO: Send verification email
            const tokens = await this.generateTokens(user.id, user.email);
            await this.updateRefreshToken(user.id, tokens.refreshToken);
            return {
                ...tokens,
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    role: user.role,
                },
            };
        }
        async refreshTokens(userId, refreshToken) {
            const user = await this.usersService.findById(userId);
            if (!user) {
                throw new common_1.UnauthorizedException('User not found');
            }
            const refreshTokenRecord = await database_1.prisma.refreshToken.findFirst({
                where: {
                    userId,
                    token: refreshToken,
                    expiresAt: {
                        gt: new Date(),
                    },
                },
            });
            if (!refreshTokenRecord) {
                throw new common_1.UnauthorizedException('Invalid refresh token');
            }
            const tokens = await this.generateTokens(user.id, user.email);
            await this.updateRefreshToken(user.id, tokens.refreshToken);
            return tokens;
        }
        async logout(userId) {
            await database_1.prisma.refreshToken.deleteMany({
                where: { userId },
            });
            return { message: 'Logged out successfully' };
        }
        async getProfile(userId) {
            const user = await this.usersService.findById(userId);
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            const { passwordHash, twoFactorSecret, ...profile } = user;
            return profile;
        }
        async updateProfile(userId, dto) {
            const user = await database_1.prisma.user.update({
                where: { id: userId },
                data: {
                    username: dto.username,
                },
            });
            const { passwordHash, twoFactorSecret, ...profile } = user;
            return profile;
        }
        async forgotPassword(email) {
            const user = await this.usersService.findByEmail(email);
            if (!user) {
                return { message: 'If the email exists, a reset link has been sent' };
            }
            const resetToken = (0, crypto_1.randomBytes)(32).toString('hex');
            await database_1.prisma.verificationToken.create({
                data: {
                    userId: user.id,
                    token: resetToken,
                    type: 'password_reset',
                    expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
                },
            });
            // TODO: Send password reset email
            return { message: 'If the email exists, a reset link has been sent' };
        }
        async resetPassword(token, newPassword) {
            const verificationToken = await database_1.prisma.verificationToken.findFirst({
                where: {
                    token,
                    type: 'password_reset',
                    expiresAt: {
                        gt: new Date(),
                    },
                },
            });
            if (!verificationToken) {
                throw new common_1.BadRequestException('Invalid or expired token');
            }
            const passwordHash = (0, bcryptjs_1.hashSync)(newPassword, 10);
            await database_1.prisma.user.update({
                where: { id: verificationToken.userId },
                data: { passwordHash },
            });
            await database_1.prisma.verificationToken.delete({
                where: { id: verificationToken.id },
            });
            return { message: 'Password reset successfully' };
        }
        async verifyEmail(token) {
            const verificationToken = await database_1.prisma.verificationToken.findFirst({
                where: {
                    token,
                    type: 'email_verification',
                    expiresAt: {
                        gt: new Date(),
                    },
                },
            });
            if (!verificationToken) {
                throw new common_1.BadRequestException('Invalid or expired token');
            }
            await database_1.prisma.user.update({
                where: { id: verificationToken.userId },
                data: { isVerified: true },
            });
            await database_1.prisma.verificationToken.delete({
                where: { id: verificationToken.id },
            });
            return { message: 'Email verified successfully' };
        }
        async resendVerificationEmail(userId) {
            const user = await this.usersService.findById(userId);
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            if (user.isVerified) {
                throw new common_1.BadRequestException('Email already verified');
            }
            await database_1.prisma.verificationToken.deleteMany({
                where: {
                    userId,
                    type: 'email_verification',
                },
            });
            const verificationToken = (0, crypto_1.randomBytes)(32).toString('hex');
            await database_1.prisma.verificationToken.create({
                data: {
                    userId: user.id,
                    token: verificationToken,
                    type: 'email_verification',
                    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
                },
            });
            // TODO: Send verification email
            return { message: 'Verification email sent' };
        }
        async changePassword(userId, currentPassword, newPassword) {
            const user = await this.usersService.findById(userId);
            if (!user || !user.passwordHash) {
                throw new common_1.NotFoundException('User not found');
            }
            if (!(0, bcryptjs_1.compareSync)(currentPassword, user.passwordHash)) {
                throw new common_1.UnauthorizedException('Current password is incorrect');
            }
            const passwordHash = (0, bcryptjs_1.hashSync)(newPassword, 10);
            await database_1.prisma.user.update({
                where: { id: userId },
                data: { passwordHash },
            });
            return { message: 'Password changed successfully' };
        }
        async enable2FA(userId, password) {
            const user = await this.usersService.findById(userId);
            if (!user || !user.passwordHash) {
                throw new common_1.NotFoundException('User not found');
            }
            if (!(0, bcryptjs_1.compareSync)(password, user.passwordHash)) {
                throw new common_1.UnauthorizedException('Password is incorrect');
            }
            const secret = speakeasy.generateSecret({
                name: `Chatbot RAG (${user.email})`,
                issuer: 'Chatbot RAG',
            });
            await database_1.prisma.user.update({
                where: { id: userId },
                data: { twoFactorSecret: secret.base32 },
            });
            const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url);
            return {
                secret: secret.base32,
                qrCode: qrCodeUrl,
            };
        }
        async disable2FA(userId, password) {
            const user = await this.usersService.findById(userId);
            if (!user || !user.passwordHash) {
                throw new common_1.NotFoundException('User not found');
            }
            if (!(0, bcryptjs_1.compareSync)(password, user.passwordHash)) {
                throw new common_1.UnauthorizedException('Password is incorrect');
            }
            await database_1.prisma.user.update({
                where: { id: userId },
                data: {
                    twoFactorEnabled: false,
                    twoFactorSecret: null,
                },
            });
            return { message: '2FA disabled successfully' };
        }
        async verify2FA(userId, code) {
            const user = await this.usersService.findById(userId);
            if (!user || !user.twoFactorSecret) {
                throw new common_1.NotFoundException('User not found or 2FA not enabled');
            }
            const verified = speakeasy.totp.verify({
                secret: user.twoFactorSecret,
                encoding: 'base32',
                token: code,
                window: 2,
            });
            if (!verified) {
                throw new common_1.UnauthorizedException('Invalid 2FA code');
            }
            if (!user.twoFactorEnabled) {
                await database_1.prisma.user.update({
                    where: { id: userId },
                    data: { twoFactorEnabled: true },
                });
            }
            const tokens = await this.generateTokens(user.id, user.email);
            await this.updateRefreshToken(user.id, tokens.refreshToken);
            return {
                ...tokens,
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    role: user.role,
                },
            };
        }
        async generateTokens(userId, email) {
            const payload = { sub: userId, email };
            const [accessToken, refreshToken] = await Promise.all([
                this.jwtService.signAsync(payload, {
                    secret: this.configService.get('jwt.secret'),
                    expiresIn: this.configService.get('jwt.expiresIn'),
                }),
                this.jwtService.signAsync(payload, {
                    secret: this.configService.get('jwt.refreshSecret'),
                    expiresIn: this.configService.get('jwt.refreshExpiresIn'),
                }),
            ]);
            return {
                accessToken,
                refreshToken,
            };
        }
        async updateRefreshToken(userId, refreshToken) {
            await database_1.prisma.refreshToken.deleteMany({
                where: { userId },
            });
            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + 7); // 7 days
            await database_1.prisma.refreshToken.create({
                data: {
                    userId,
                    token: refreshToken,
                    expiresAt,
                },
            });
        }
    };
    return AuthService = _classThis;
})();
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map