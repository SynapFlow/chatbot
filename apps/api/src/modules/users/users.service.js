"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("@chatbot-rag/database");
let UsersService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var UsersService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            UsersService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        async findById(id) {
            return database_1.prisma.user.findUnique({
                where: { id },
            });
        }
        async findByEmail(email) {
            return database_1.prisma.user.findUnique({
                where: { email },
            });
        }
        async findByUsername(username) {
            return database_1.prisma.user.findUnique({
                where: { username },
            });
        }
        async findAll(params) {
            const { skip = 0, take = 10, where, orderBy } = params || {};
            const [users, total] = await Promise.all([
                database_1.prisma.user.findMany({
                    skip,
                    take,
                    where,
                    orderBy: orderBy || { createdAt: 'desc' },
                    select: {
                        id: true,
                        email: true,
                        username: true,
                        role: true,
                        isActive: true,
                        isVerified: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                }),
                database_1.prisma.user.count({ where }),
            ]);
            return {
                data: users,
                total,
                skip,
                take,
            };
        }
        async updateRole(userId, role) {
            const user = await this.findById(userId);
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            return database_1.prisma.user.update({
                where: { id: userId },
                data: { role },
                select: {
                    id: true,
                    email: true,
                    username: true,
                    role: true,
                    isActive: true,
                    isVerified: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
        }
        async toggleActive(userId) {
            const user = await this.findById(userId);
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            return database_1.prisma.user.update({
                where: { id: userId },
                data: { isActive: !user.isActive },
                select: {
                    id: true,
                    email: true,
                    username: true,
                    role: true,
                    isActive: true,
                    isVerified: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
        }
        async delete(userId) {
            const user = await this.findById(userId);
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            await database_1.prisma.user.delete({
                where: { id: userId },
            });
            return { message: 'User deleted successfully' };
        }
    };
    return UsersService = _classThis;
})();
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map