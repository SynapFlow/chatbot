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
exports.TenantGuard = exports.RequireTenant = exports.REQUIRE_TENANT_KEY = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("@chatbot-rag/database");
exports.REQUIRE_TENANT_KEY = 'requireTenant';
const RequireTenant = (type = 'both') => Reflect.metadata(exports.REQUIRE_TENANT_KEY, type);
exports.RequireTenant = RequireTenant;
let TenantGuard = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TenantGuard = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TenantGuard = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        reflector;
        constructor(reflector) {
            this.reflector = reflector;
        }
        async canActivate(context) {
            const requireTenant = this.reflector.getAllAndOverride(exports.REQUIRE_TENANT_KEY, [
                context.getHandler(),
                context.getClass(),
            ]);
            if (!requireTenant) {
                return true;
            }
            const request = context.switchToHttp().getRequest();
            const user = request.user;
            const tenant = request.tenant;
            if (!user) {
                throw new common_1.ForbiddenException('Authentication required');
            }
            // Check organization access
            if ((requireTenant === 'organization' || requireTenant === 'both') &&
                tenant?.organizationId) {
                const hasOrgAccess = await this.checkOrganizationAccess(tenant.organizationId, user.id);
                if (!hasOrgAccess) {
                    throw new common_1.ForbiddenException('Access denied to organization');
                }
            }
            // Check project access
            if ((requireTenant === 'project' || requireTenant === 'both') &&
                tenant?.projectId) {
                const hasProjectAccess = await this.checkProjectAccess(tenant.projectId, user.id);
                if (!hasProjectAccess) {
                    throw new common_1.ForbiddenException('Access denied to project');
                }
            }
            return true;
        }
        async checkOrganizationAccess(organizationId, userId) {
            const organization = await database_1.prisma.organization.findUnique({
                where: { id: organizationId },
                select: { ownerId: true },
            });
            if (!organization) {
                return false;
            }
            // Check if user is owner
            if (organization.ownerId === userId) {
                return true;
            }
            // Check if user has access through organization members (future implementation)
            // const member = await prisma.organizationMember.findUnique({
            //   where: {
            //     organizationId_userId: {
            //       organizationId,
            //       userId,
            //     },
            //   },
            // });
            return false;
        }
        async checkProjectAccess(projectId, userId) {
            const project = await database_1.prisma.project.findUnique({
                where: { id: projectId },
                select: {
                    organization: {
                        select: { ownerId: true },
                    },
                },
            });
            if (!project) {
                return false;
            }
            // Check if user is organization owner
            if (project.organization.ownerId === userId) {
                return true;
            }
            // Check if user has project-specific access (future implementation)
            // const access = await prisma.projectAccess.findUnique({
            //   where: {
            //     projectId_userId: {
            //       projectId,
            //       userId,
            //     },
            //   },
            // });
            return false;
        }
    };
    return TenantGuard = _classThis;
})();
exports.TenantGuard = TenantGuard;
//# sourceMappingURL=tenant.guard.js.map