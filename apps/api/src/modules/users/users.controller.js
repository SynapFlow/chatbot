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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
let UsersController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('Users'), (0, common_1.Controller)('users'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, swagger_1.ApiBearerAuth)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _findAll_decorators;
    let _findOne_decorators;
    let _updateRole_decorators;
    let _toggleActive_decorators;
    let _delete_decorators;
    var UsersController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _findAll_decorators = [(0, common_1.Get)(), (0, roles_decorator_1.Roles)('admin'), (0, swagger_1.ApiOperation)({ summary: 'Get all users (admin only)' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Users retrieved successfully' })];
            _findOne_decorators = [(0, common_1.Get)(':id'), (0, roles_decorator_1.Roles)('admin'), (0, swagger_1.ApiOperation)({ summary: 'Get user by ID (admin only)' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'User retrieved successfully' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' })];
            _updateRole_decorators = [(0, common_1.Patch)(':id/role'), (0, roles_decorator_1.Roles)('admin'), (0, swagger_1.ApiOperation)({ summary: 'Update user role (admin only)' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Role updated successfully' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' })];
            _toggleActive_decorators = [(0, common_1.Patch)(':id/toggle-active'), (0, roles_decorator_1.Roles)('admin'), (0, swagger_1.ApiOperation)({ summary: 'Toggle user active status (admin only)' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Status toggled successfully' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' })];
            _delete_decorators = [(0, common_1.Delete)(':id'), (0, roles_decorator_1.Roles)('admin'), (0, swagger_1.ApiOperation)({ summary: 'Delete user (admin only)' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'User deleted successfully' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' })];
            __esDecorate(this, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: obj => "findAll" in obj, get: obj => obj.findAll }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: obj => "findOne" in obj, get: obj => obj.findOne }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _updateRole_decorators, { kind: "method", name: "updateRole", static: false, private: false, access: { has: obj => "updateRole" in obj, get: obj => obj.updateRole }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _toggleActive_decorators, { kind: "method", name: "toggleActive", static: false, private: false, access: { has: obj => "toggleActive" in obj, get: obj => obj.toggleActive }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _delete_decorators, { kind: "method", name: "delete", static: false, private: false, access: { has: obj => "delete" in obj, get: obj => obj.delete }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            UsersController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        usersService = __runInitializers(this, _instanceExtraInitializers);
        constructor(usersService) {
            this.usersService = usersService;
        }
        async findAll(skip, take, search) {
            const where = search
                ? {
                    OR: [
                        { email: { contains: search, mode: 'insensitive' } },
                        { username: { contains: search, mode: 'insensitive' } },
                    ],
                }
                : undefined;
            return this.usersService.findAll({
                skip: skip ? +skip : 0,
                take: take ? +take : 10,
                where,
            });
        }
        async findOne(id) {
            const user = await this.usersService.findById(id);
            if (!user) {
                throw new Error('User not found');
            }
            const { passwordHash, twoFactorSecret, ...userWithoutSensitive } = user;
            return userWithoutSensitive;
        }
        async updateRole(id, role) {
            return this.usersService.updateRole(id, role);
        }
        async toggleActive(id) {
            return this.usersService.toggleActive(id);
        }
        async delete(id) {
            return this.usersService.delete(id);
        }
    };
    return UsersController = _classThis;
})();
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map