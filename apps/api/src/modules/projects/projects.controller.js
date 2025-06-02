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
exports.ProjectsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
let ProjectsController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('Projects'), (0, common_1.Controller)('projects'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, swagger_1.ApiBearerAuth)()];
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
    let _generateApiKey_decorators;
    let _listApiKeys_decorators;
    let _revokeApiKey_decorators;
    let _getStats_decorators;
    var ProjectsController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _create_decorators = [(0, common_1.Post)(), (0, swagger_1.ApiOperation)({ summary: 'Create a new project' }), (0, swagger_1.ApiResponse)({
                    status: 201,
                    description: 'Project created successfully',
                    schema: {
                        example: {
                            id: '123e4567-e89b-12d3-a456-426614174000',
                            organizationId: '123e4567-e89b-12d3-a456-426614174001',
                            name: 'Customer Support Bot',
                            slug: 'customer-support',
                            description: 'AI-powered customer support chatbot',
                            apiKey: 'chatbot_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                            isActive: true,
                            createdAt: '2024-01-01T00:00:00.000Z',
                            updatedAt: '2024-01-01T00:00:00.000Z',
                        },
                    },
                }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Organization not found' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Access denied or limit reached' }), (0, swagger_1.ApiResponse)({ status: 409, description: 'Project slug already exists' })];
            _findAll_decorators = [(0, common_1.Get)('organization/:organizationId'), (0, swagger_1.ApiOperation)({ summary: 'Get all projects in an organization' }), (0, swagger_1.ApiParam)({ name: 'organizationId', type: String }), (0, swagger_1.ApiQuery)({ name: 'skip', required: false, type: Number, schema: { default: 0 } }), (0, swagger_1.ApiQuery)({ name: 'take', required: false, type: Number, schema: { default: 10 } }), (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Projects retrieved successfully',
                }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Organization not found' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Access denied' })];
            _findOne_decorators = [(0, common_1.Get)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Get project by ID' }), (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'Project ID' }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Project retrieved successfully',
                }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Project not found' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Access denied' })];
            _findBySlug_decorators = [(0, common_1.Get)('organization/:organizationId/slug/:slug'), (0, swagger_1.ApiOperation)({ summary: 'Get project by organization and slug' }), (0, swagger_1.ApiParam)({ name: 'organizationId', type: String }), (0, swagger_1.ApiParam)({ name: 'slug', type: String }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Project retrieved successfully',
                }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Project not found' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Access denied' })];
            _update_decorators = [(0, common_1.Patch)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Update project' }), (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'Project ID' }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Project updated successfully',
                }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Project not found' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Access denied' }), (0, swagger_1.ApiResponse)({ status: 409, description: 'Slug already exists' })];
            _delete_decorators = [(0, common_1.Delete)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Delete project' }), (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'Project ID' }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Project deleted successfully',
                }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Project not found' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Access denied' }), (0, swagger_1.ApiResponse)({
                    status: 409,
                    description: 'Cannot delete project with active sources',
                })];
            _generateApiKey_decorators = [(0, common_1.Post)(':id/api-keys'), (0, swagger_1.ApiOperation)({ summary: 'Generate new API key for project' }), (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'Project ID' }), (0, swagger_1.ApiResponse)({
                    status: 201,
                    description: 'API key generated successfully',
                    schema: {
                        example: {
                            id: '123e4567-e89b-12d3-a456-426614174000',
                            name: 'Production API Key',
                            apiKey: 'chatbot_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                            createdAt: '2024-01-01T00:00:00.000Z',
                        },
                    },
                }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Project not found' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Access denied' })];
            _listApiKeys_decorators = [(0, common_1.Get)(':id/api-keys'), (0, swagger_1.ApiOperation)({ summary: 'List API keys for project' }), (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'Project ID' }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'API keys retrieved successfully',
                }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Project not found' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Access denied' })];
            _revokeApiKey_decorators = [(0, common_1.Delete)(':id/api-keys/:keyId'), (0, swagger_1.ApiOperation)({ summary: 'Revoke API key' }), (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'Project ID' }), (0, swagger_1.ApiParam)({ name: 'keyId', type: String, description: 'API Key ID' }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'API key revoked successfully',
                }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Project or API key not found' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Access denied' })];
            _getStats_decorators = [(0, common_1.Get)(':id/stats'), (0, swagger_1.ApiOperation)({ summary: 'Get project statistics' }), (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'Project ID' }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Statistics retrieved successfully',
                    schema: {
                        example: {
                            messages: {
                                total: 10000,
                                today: 150,
                            },
                            conversations: {
                                total: 500,
                                active: 25,
                            },
                            documents: 250,
                            sources: 10,
                        },
                    },
                }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Project not found' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Access denied' })];
            __esDecorate(this, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: obj => "create" in obj, get: obj => obj.create }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: obj => "findAll" in obj, get: obj => obj.findAll }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: obj => "findOne" in obj, get: obj => obj.findOne }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findBySlug_decorators, { kind: "method", name: "findBySlug", static: false, private: false, access: { has: obj => "findBySlug" in obj, get: obj => obj.findBySlug }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: obj => "update" in obj, get: obj => obj.update }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _delete_decorators, { kind: "method", name: "delete", static: false, private: false, access: { has: obj => "delete" in obj, get: obj => obj.delete }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _generateApiKey_decorators, { kind: "method", name: "generateApiKey", static: false, private: false, access: { has: obj => "generateApiKey" in obj, get: obj => obj.generateApiKey }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _listApiKeys_decorators, { kind: "method", name: "listApiKeys", static: false, private: false, access: { has: obj => "listApiKeys" in obj, get: obj => obj.listApiKeys }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _revokeApiKey_decorators, { kind: "method", name: "revokeApiKey", static: false, private: false, access: { has: obj => "revokeApiKey" in obj, get: obj => obj.revokeApiKey }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getStats_decorators, { kind: "method", name: "getStats", static: false, private: false, access: { has: obj => "getStats" in obj, get: obj => obj.getStats }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ProjectsController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        projectsService = __runInitializers(this, _instanceExtraInitializers);
        constructor(projectsService) {
            this.projectsService = projectsService;
        }
        create(user, dto) {
            return this.projectsService.create(user.id, dto);
        }
        findAll(organizationId, user, skip, take, search) {
            return this.projectsService.findAll(organizationId, user.id, { skip, take, search });
        }
        findOne(id, user) {
            return this.projectsService.findOne(id, user.id);
        }
        findBySlug(organizationId, slug, user) {
            return this.projectsService.findBySlug(organizationId, slug, user.id);
        }
        update(id, user, dto) {
            return this.projectsService.update(id, user.id, dto);
        }
        delete(id, user) {
            return this.projectsService.delete(id, user.id);
        }
        generateApiKey(id, user, name) {
            return this.projectsService.generateApiKey(id, user.id, name);
        }
        listApiKeys(id, user) {
            return this.projectsService.listApiKeys(id, user.id);
        }
        revokeApiKey(id, keyId, user) {
            return this.projectsService.revokeApiKey(id, user.id, keyId);
        }
        getStats(id, user) {
            return this.projectsService.getStats(id, user.id);
        }
    };
    return ProjectsController = _classThis;
})();
exports.ProjectsController = ProjectsController;
//# sourceMappingURL=projects.controller.js.map