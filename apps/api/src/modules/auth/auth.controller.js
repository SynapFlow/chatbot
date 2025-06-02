"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const local_auth_guard_1 = require("./guards/local-auth.guard");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const refresh_token_guard_1 = require("./guards/refresh-token.guard");
const public_decorator_1 = require("../../common/decorators/public.decorator");
let AuthController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('Auth'), (0, common_1.Controller)('auth')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _register_decorators;
    let _login_decorators;
    let _refresh_decorators;
    let _logout_decorators;
    let _getProfile_decorators;
    let _updateProfile_decorators;
    let _forgotPassword_decorators;
    let _resetPassword_decorators;
    let _verifyEmail_decorators;
    let _resendVerification_decorators;
    let _changePassword_decorators;
    let _enable2FA_decorators;
    let _disable2FA_decorators;
    let _verify2FA_decorators;
    var AuthController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _register_decorators = [(0, common_1.Post)('register'), (0, public_decorator_1.Public)(), (0, swagger_1.ApiOperation)({ summary: 'Register a new user' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'User successfully registered' }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' })];
            _login_decorators = [(0, common_1.Post)('login'), (0, public_decorator_1.Public)(), (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'Login with email and password' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Login successful' }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid credentials' })];
            _refresh_decorators = [(0, common_1.Post)('refresh'), (0, public_decorator_1.Public)(), (0, common_1.UseGuards)(refresh_token_guard_1.RefreshTokenGuard), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'Refresh access token' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Token refreshed successfully' }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid refresh token' })];
            _logout_decorators = [(0, common_1.Post)('logout'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Logout and invalidate refresh token' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Logout successful' })];
            _getProfile_decorators = [(0, common_1.Get)('profile'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Get current user profile' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Profile retrieved successfully' })];
            _updateProfile_decorators = [(0, common_1.Patch)('profile'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Update user profile' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Profile updated successfully' })];
            _forgotPassword_decorators = [(0, common_1.Post)('forgot-password'), (0, public_decorator_1.Public)(), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'Request password reset' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Password reset email sent' })];
            _resetPassword_decorators = [(0, common_1.Post)('reset-password'), (0, public_decorator_1.Public)(), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'Reset password with token' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Password reset successful' })];
            _verifyEmail_decorators = [(0, common_1.Post)('verify-email'), (0, public_decorator_1.Public)(), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'Verify email address' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Email verified successfully' })];
            _resendVerification_decorators = [(0, common_1.Post)('resend-verification'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Resend verification email' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Verification email sent' })];
            _changePassword_decorators = [(0, common_1.Post)('change-password'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Change password' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Password changed successfully' })];
            _enable2FA_decorators = [(0, common_1.Post)('2fa/enable'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Enable two-factor authentication' }), (0, swagger_1.ApiResponse)({ status: 200, description: '2FA enabled successfully' })];
            _disable2FA_decorators = [(0, common_1.Post)('2fa/disable'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Disable two-factor authentication' }), (0, swagger_1.ApiResponse)({ status: 200, description: '2FA disabled successfully' })];
            _verify2FA_decorators = [(0, common_1.Post)('2fa/verify'), (0, public_decorator_1.Public)(), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'Verify 2FA code during login' }), (0, swagger_1.ApiResponse)({ status: 200, description: '2FA verification successful' })];
            __esDecorate(this, null, _register_decorators, { kind: "method", name: "register", static: false, private: false, access: { has: obj => "register" in obj, get: obj => obj.register }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _login_decorators, { kind: "method", name: "login", static: false, private: false, access: { has: obj => "login" in obj, get: obj => obj.login }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _refresh_decorators, { kind: "method", name: "refresh", static: false, private: false, access: { has: obj => "refresh" in obj, get: obj => obj.refresh }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _logout_decorators, { kind: "method", name: "logout", static: false, private: false, access: { has: obj => "logout" in obj, get: obj => obj.logout }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getProfile_decorators, { kind: "method", name: "getProfile", static: false, private: false, access: { has: obj => "getProfile" in obj, get: obj => obj.getProfile }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _updateProfile_decorators, { kind: "method", name: "updateProfile", static: false, private: false, access: { has: obj => "updateProfile" in obj, get: obj => obj.updateProfile }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _forgotPassword_decorators, { kind: "method", name: "forgotPassword", static: false, private: false, access: { has: obj => "forgotPassword" in obj, get: obj => obj.forgotPassword }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _resetPassword_decorators, { kind: "method", name: "resetPassword", static: false, private: false, access: { has: obj => "resetPassword" in obj, get: obj => obj.resetPassword }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _verifyEmail_decorators, { kind: "method", name: "verifyEmail", static: false, private: false, access: { has: obj => "verifyEmail" in obj, get: obj => obj.verifyEmail }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _resendVerification_decorators, { kind: "method", name: "resendVerification", static: false, private: false, access: { has: obj => "resendVerification" in obj, get: obj => obj.resendVerification }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _changePassword_decorators, { kind: "method", name: "changePassword", static: false, private: false, access: { has: obj => "changePassword" in obj, get: obj => obj.changePassword }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _enable2FA_decorators, { kind: "method", name: "enable2FA", static: false, private: false, access: { has: obj => "enable2FA" in obj, get: obj => obj.enable2FA }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _disable2FA_decorators, { kind: "method", name: "disable2FA", static: false, private: false, access: { has: obj => "disable2FA" in obj, get: obj => obj.disable2FA }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _verify2FA_decorators, { kind: "method", name: "verify2FA", static: false, private: false, access: { has: obj => "verify2FA" in obj, get: obj => obj.verify2FA }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AuthController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        authService = __runInitializers(this, _instanceExtraInitializers);
        constructor(authService) {
            this.authService = authService;
        }
        async register(dto) {
            return this.authService.register(dto);
        }
        async login(req, _dto) {
            return this.authService.login(req.user);
        }
        async refresh(req, _dto) {
            return this.authService.refreshTokens(req.user.sub, req.user.refreshToken);
        }
        async logout(user) {
            return this.authService.logout(user.id);
        }
        async getProfile(user) {
            return this.authService.getProfile(user.id);
        }
        async updateProfile(user, dto) {
            return this.authService.updateProfile(user.id, dto);
        }
        async forgotPassword(dto) {
            return this.authService.forgotPassword(dto.email);
        }
        async resetPassword(dto) {
            return this.authService.resetPassword(dto.token, dto.newPassword);
        }
        async verifyEmail(dto) {
            return this.authService.verifyEmail(dto.token);
        }
        async resendVerification(user) {
            return this.authService.resendVerificationEmail(user.id);
        }
        async changePassword(user, dto) {
            return this.authService.changePassword(user.id, dto.currentPassword, dto.newPassword);
        }
        async enable2FA(user, dto) {
            return this.authService.enable2FA(user.id, dto.password);
        }
        async disable2FA(user, dto) {
            return this.authService.disable2FA(user.id, dto.password);
        }
        async verify2FA(dto) {
            return this.authService.verify2FA(dto.userId, dto.code);
        }
    };
    return AuthController = _classThis;
})();
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map