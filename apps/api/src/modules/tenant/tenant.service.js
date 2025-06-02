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
exports.TenantService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("@chatbot-rag/database");
const shared_1 = require("@chatbot-rag/shared");
let TenantService = (() => {
    let _classDecorators = [(0, common_1.Injectable)({ scope: common_1.Scope.REQUEST })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TenantService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TenantService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        context = {};
        setContext(context) {
            this.context = { ...this.context, ...context };
        }
        getContext() {
            return this.context;
        }
        getOrganizationId() {
            return this.context.organizationId;
        }
        getProjectId() {
            return this.context.projectId;
        }
        async loadOrganization(organizationId) {
            if (!organizationId)
                return null;
            const organization = await database_1.prisma.organization.findUnique({
                where: { id: organizationId },
            });
            if (organization) {
                this.context.organization = organization;
                this.context.organizationId = organizationId;
                this.context.limits = this.extractLimits(organization);
            }
            return organization;
        }
        async loadProject(projectId) {
            if (!projectId)
                return null;
            const project = await database_1.prisma.project.findUnique({
                where: { id: projectId },
                include: {
                    organization: true,
                },
            });
            if (project) {
                this.context.project = project;
                this.context.projectId = projectId;
                this.context.organization = project.organization;
                this.context.organizationId = project.organizationId;
                this.context.limits = this.extractLimits(project.organization);
            }
            return project;
        }
        async checkLimit(resource, current) {
            const limits = this.context.limits;
            if (!limits)
                return true;
            const limit = limits[resource];
            if (limit === -1)
                return true; // Unlimited
            return current < limit;
        }
        async enforceLimit(resource, current) {
            const canProceed = await this.checkLimit(resource, current);
            if (!canProceed) {
                throw new Error(`${resource} limit reached for current subscription tier`);
            }
        }
        async getUsage() {
            if (!this.context.organizationId) {
                return {};
            }
            const [projects, messages, documents] = await Promise.all([
                database_1.prisma.project.count({
                    where: { organizationId: this.context.organizationId },
                }),
                database_1.prisma.message.count({
                    where: {
                        conversation: {
                            project: {
                                organizationId: this.context.organizationId,
                            },
                        },
                        createdAt: {
                            gte: new Date(new Date().setHours(0, 0, 0, 0)),
                        },
                    },
                }),
                database_1.prisma.document.count({
                    where: {
                        source: {
                            project: {
                                organizationId: this.context.organizationId,
                            },
                        },
                    },
                }),
            ]);
            return {
                projects,
                messagestoday: messages,
                documents,
            };
        }
        extractLimits(organization) {
            const tier = organization.subscriptionTier || 'free';
            const customLimits = organization.settings?.limits || {};
            const defaultLimits = shared_1.RATE_LIMITS[tier] || shared_1.RATE_LIMITS.free;
            return {
                ...defaultLimits,
                ...customLimits,
            };
        }
        // Data isolation helpers
        addOrganizationFilter(query) {
            if (!this.context.organizationId)
                return query;
            return {
                ...query,
                where: {
                    ...query.where,
                    organizationId: this.context.organizationId,
                },
            };
        }
        addProjectFilter(query) {
            if (!this.context.projectId)
                return query;
            return {
                ...query,
                where: {
                    ...query.where,
                    projectId: this.context.projectId,
                },
            };
        }
        validateOrganizationAccess(organizationId) {
            return this.context.organizationId === organizationId;
        }
        validateProjectAccess(projectId) {
            return this.context.projectId === projectId;
        }
        async userHasAccessToTenant(userId, tenantId) {
            try {
                const userOrganization = await database_1.prisma.organizationMember.findFirst({
                    where: {
                        userId,
                        organizationId: tenantId,
                    },
                });
                return !!userOrganization;
            }
            catch (error) {
                return false;
            }
        }
    };
    return TenantService = _classThis;
})();
exports.TenantService = TenantService;
//# sourceMappingURL=tenant.service.js.map