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
exports.OrganizationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
let OrganizationsController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('Organizations'), (0, common_1.Controller)('organizations'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, swagger_1.ApiBearerAuth)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _create_decorators;
    let _findAll_decorators;
    let _findOne_decorators;
    let _findBySlug_decorators;
    let _update_decorators;
    let _delete_decorators;
    let _getStats_decorators;
    let _inviteUser_decorators;
    var OrganizationsController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _create_decorators = [(0, common_1.Post)(), (0, swagger_1.ApiOperation)({ summary: 'Create a new organization' }), (0, swagger_1.ApiResponse)({
                    status: 201,
                    description: 'Organization created successfully',
                    schema: {
                        example: {
                            id: '123e4567-e89b-12d3-a456-426614174000',
                            name: 'Acme Corporation',
                            slug: 'acme-corp',
                            subscriptionTier: 'free',
                            owner: {
                                id: '123e4567-e89b-12d3-a456-426614174001',
                                email: 'john@example.com',
                                username: 'john_doe',
                            },
                            createdAt: '2024-01-01T00:00:00.000Z',
                            updatedAt: '2024-01-01T00:00:00.000Z',
                        },
                    },
                }), (0, swagger_1.ApiResponse)({ status: 409, description: 'Organization slug already exists' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Organization limit reached' })];
            _findAll_decorators = [(0, common_1.Get)(), (0, swagger_1.ApiOperation)({ summary: 'Get all organizations for current user' }), (0, swagger_1.ApiQuery)({ name: 'skip', required: false, type: Number, schema: { default: 0 } }), (0, swagger_1.ApiQuery)({ name: 'take', required: false, type: Number, schema: { default: 10 } }), (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Organizations retrieved successfully',
                    schema: {
                        example: {
                            data: [
                                {
                                    id: '123e4567-e89b-12d3-a456-426614174000',
                                    name: 'Acme Corporation',
                                    slug: 'acme-corp',
                                    subscriptionTier: 'pro',
                                    owner: {
                                        id: '123e4567-e89b-12d3-a456-426614174001',
                                        email: 'john@example.com',
                                        username: 'john_doe',
                                    },
                                    _count: {
                                        projects: 5,
                                    },
                                    createdAt: '2024-01-01T00:00:00.000Z',
                                    updatedAt: '2024-01-01T00:00:00.000Z',
                                },
                            ],
                            total: 1,
                            skip: 0,
                            take: 10,
                        },
                    },
                })];
            _findOne_decorators = [(0, common_1.Get)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Get organization by ID' }), (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'Organization ID' }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Organization retrieved successfully',
                    schema: {
                        example: {
                            id: '123e4567-e89b-12d3-a456-426614174000',
                            name: 'Acme Corporation',
                            slug: 'acme-corp',
                            subscriptionTier: 'pro',
                            owner: {
                                id: '123e4567-e89b-12d3-a456-426614174001',
                                email: 'john@example.com',
                                username: 'john_doe',
                            },
                            projects: [
                                {
                                    id: '123e4567-e89b-12d3-a456-426614174002',
                                    name: 'Main Website',
                                    slug: 'main-website',
                                    isActive: true,
                                    _count: {
                                        sources: 10,
                                        conversations: 1000,
                                    },
                                },
                            ],
                            createdAt: '2024-01-01T00:00:00.000Z',
                            updatedAt: '2024-01-01T00:00:00.000Z',
                        },
                    },
                }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Organization not found' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Access denied' })];
            _findBySlug_decorators = [(0, common_1.Get)('slug/:slug'), (0, swagger_1.ApiOperation)({ summary: 'Get organization by slug' }), (0, swagger_1.ApiParam)({ name: 'slug', type: String, description: 'Organization slug' }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Organization retrieved successfully',
                }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Organization not found' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Access denied' })];
            _update_decorators = [(0, common_1.Patch)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Update organization' }), (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'Organization ID' }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Organization updated successfully',
                }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Organization not found' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Only owner can update' }), (0, swagger_1.ApiResponse)({ status: 409, description: 'Slug already exists' })];
            _delete_decorators = [(0, common_1.Delete)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Delete organization' }), (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'Organization ID' }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Organization deleted successfully',
                }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Organization not found' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Only owner can delete' }), (0, swagger_1.ApiResponse)({
                    status: 409,
                    description: 'Cannot delete organization with active projects',
                })];
            _getStats_decorators = [(0, common_1.Get)(':id/stats'), (0, swagger_1.ApiOperation)({ summary: 'Get organization statistics' }), (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'Organization ID' }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Statistics retrieved successfully',
                    schema: {
                        example: {
                            projects: 5,
                            messages: 10000,
                            documents: 500,
                            storageUsedBytes: 1073741824,
                        },
                    },
                }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Organization not found' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Access denied' })];
            _inviteUser_decorators = [(0, common_1.Post)(':id/invite'), (0, swagger_1.ApiOperation)({ summary: 'Invite user to organization' }), (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'Organization ID' }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Invitation sent successfully',
                }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Organization not found' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Only owner can invite users' })];
            __esDecorate(this, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: obj => "create" in obj, get: obj => obj.create }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: obj => "findAll" in obj, get: obj => obj.findAll }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: obj => "findOne" in obj, get: obj => obj.findOne }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findBySlug_decorators, { kind: "method", name: "findBySlug", static: false, private: false, access: { has: obj => "findBySlug" in obj, get: obj => obj.findBySlug }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: obj => "update" in obj, get: obj => obj.update }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _delete_decorators, { kind: "method", name: "delete", static: false, private: false, access: { has: obj => "delete" in obj, get: obj => obj.delete }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getStats_decorators, { kind: "method", name: "getStats", static: false, private: false, access: { has: obj => "getStats" in obj, get: obj => obj.getStats }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _inviteUser_decorators, { kind: "method", name: "inviteUser", static: false, private: false, access: { has: obj => "inviteUser" in obj, get: obj => obj.inviteUser }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            OrganizationsController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        organizationsService = __runInitializers(this, _instanceExtraInitializers);
        constructor(organizationsService) {
            this.organizationsService = organizationsService;
        }
        create(user, dto) {
            return this.organizationsService.create(user.id, dto);
        }
        findAll(user, skip, take, search) {
            return this.organizationsService.findAll(user.id, { skip, take, search });
        }
        findOne(id, user) {
            return this.organizationsService.findOne(id, user.id);
        }
        findBySlug(slug, user) {
            return this.organizationsService.findBySlug(slug, user.id);
        }
        update(id, user, dto) {
            return this.organizationsService.update(id, user.id, dto);
        }
        delete(id, user) {
            return this.organizationsService.delete(id, user.id);
        }
        getStats(id, user) {
            return this.organizationsService.getStats(id, user.id);
        }
        inviteUser(id, user, dto) {
            return this.organizationsService.inviteUser(id, user.id, dto.email, dto.role);
        }
    };
    return OrganizationsController = _classThis;
})();
exports.OrganizationsController = OrganizationsController;
//# sourceMappingURL=organizations.controller.js.map