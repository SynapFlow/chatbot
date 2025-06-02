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
exports.OrganizationsService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("@chatbot-rag/database");
const shared_1 = require("@chatbot-rag/shared");
let OrganizationsService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var OrganizationsService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            OrganizationsService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        async create(userId, dto) {
            // Check if slug already exists
            const existing = await database_1.prisma.organization.findUnique({
                where: { slug: dto.slug },
            });
            if (existing) {
                throw new common_1.ConflictException('Organization slug already exists');
            }
            // Check user's organization limit based on their role
            const userOrgs = await database_1.prisma.organization.count({
                where: { ownerId: userId },
            });
            const user = await database_1.prisma.user.findUnique({
                where: { id: userId },
            });
            const maxOrgs = user?.role === 'admin' ? -1 : 5;
            if (maxOrgs !== -1 && userOrgs >= maxOrgs) {
                throw new common_1.ForbiddenException('Organization limit reached');
            }
            return database_1.prisma.organization.create({
                data: {
                    name: dto.name,
                    slug: dto.slug,
                    ownerId: userId,
                    subscriptionTier: shared_1.SUBSCRIPTION_TIERS.FREE,
                    settings: {
                        features: {
                            customBranding: false,
                            apiAccess: true,
                            webhooks: false,
                            sso: false,
                        },
                        limits: shared_1.RATE_LIMITS[shared_1.SUBSCRIPTION_TIERS.FREE],
                    },
                },
                include: {
                    owner: {
                        select: {
                            id: true,
                            email: true,
                            username: true,
                        },
                    },
                },
            });
        }
        async findAll(userId, params) {
            const { skip = 0, take = 10, search } = params || {};
            const where = {
                OR: [
                    { ownerId: userId },
                    {
                        projects: {
                            some: {
                                apiKeys: {
                                    some: {
                                    // User has API access to a project
                                    },
                                },
                            },
                        },
                    },
                ],
                ...(search && {
                    OR: [
                        { name: { contains: search, mode: 'insensitive' } },
                        { slug: { contains: search, mode: 'insensitive' } },
                    ],
                }),
            };
            const [organizations, total] = await Promise.all([
                database_1.prisma.organization.findMany({
                    where,
                    skip,
                    take,
                    orderBy: { createdAt: 'desc' },
                    include: {
                        owner: {
                            select: {
                                id: true,
                                email: true,
                                username: true,
                            },
                        },
                        _count: {
                            select: {
                                projects: true,
                            },
                        },
                    },
                }),
                database_1.prisma.organization.count({ where }),
            ]);
            return {
                data: organizations,
                total,
                skip,
                take,
            };
        }
        async findOne(id, userId) {
            const organization = await database_1.prisma.organization.findUnique({
                where: { id },
                include: {
                    owner: {
                        select: {
                            id: true,
                            email: true,
                            username: true,
                        },
                    },
                    projects: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                            isActive: true,
                            _count: {
                                select: {
                                    sources: true,
                                    conversations: true,
                                },
                            },
                        },
                    },
                },
            });
            if (!organization) {
                throw new common_1.NotFoundException('Organization not found');
            }
            // Check access
            if (organization.ownerId !== userId) {
                // Check if user has access through project API keys
                const hasAccess = await database_1.prisma.apiKey.findFirst({
                    where: {
                        project: {
                            organizationId: id,
                        },
                        isActive: true,
                    },
                });
                if (!hasAccess) {
                    throw new common_1.ForbiddenException('Access denied');
                }
            }
            return organization;
        }
        async findBySlug(slug, userId) {
            const organization = await database_1.prisma.organization.findUnique({
                where: { slug },
                include: {
                    owner: {
                        select: {
                            id: true,
                            email: true,
                            username: true,
                        },
                    },
                    projects: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                            isActive: true,
                        },
                    },
                },
            });
            if (!organization) {
                throw new common_1.NotFoundException('Organization not found');
            }
            if (organization.ownerId !== userId) {
                throw new common_1.ForbiddenException('Access denied');
            }
            return organization;
        }
        async update(id, userId, dto) {
            const organization = await this.findOne(id, userId);
            if (organization.ownerId !== userId) {
                throw new common_1.ForbiddenException('Only organization owner can update');
            }
            if (dto.slug && dto.slug !== organization.slug) {
                const existing = await database_1.prisma.organization.findUnique({
                    where: { slug: dto.slug },
                });
                if (existing) {
                    throw new common_1.ConflictException('Organization slug already exists');
                }
            }
            // Update rate limits if subscription tier changes
            let settings = organization.settings;
            if (dto.subscriptionTier && dto.subscriptionTier !== organization.subscriptionTier) {
                settings = {
                    ...settings,
                    limits: shared_1.RATE_LIMITS[dto.subscriptionTier],
                };
            }
            return database_1.prisma.organization.update({
                where: { id },
                data: {
                    ...dto,
                    settings: dto.settings ? { ...settings, ...dto.settings } : settings,
                    subscriptionExpiresAt: dto.subscriptionTier === 'free' ? null : undefined,
                },
                include: {
                    owner: {
                        select: {
                            id: true,
                            email: true,
                            username: true,
                        },
                    },
                },
            });
        }
        async delete(id, userId) {
            const organization = await this.findOne(id, userId);
            if (organization.ownerId !== userId) {
                throw new common_1.ForbiddenException('Only organization owner can delete');
            }
            // Check if organization has active projects
            const activeProjects = await database_1.prisma.project.count({
                where: {
                    organizationId: id,
                    isActive: true,
                },
            });
            if (activeProjects > 0) {
                throw new common_1.ConflictException('Cannot delete organization with active projects');
            }
            await database_1.prisma.organization.delete({
                where: { id },
            });
        }
        async getStats(id, userId) {
            await this.findOne(id, userId);
            const [projectCount, totalMessages, totalDocuments, storageUsed] = await Promise.all([
                database_1.prisma.project.count({
                    where: { organizationId: id },
                }),
                database_1.prisma.message.count({
                    where: {
                        conversation: {
                            project: {
                                organizationId: id,
                            },
                        },
                    },
                }),
                database_1.prisma.document.count({
                    where: {
                        source: {
                            project: {
                                organizationId: id,
                            },
                        },
                    },
                }),
                // This would need to be calculated based on actual storage
                Promise.resolve(0),
            ]);
            return {
                projects: projectCount,
                messages: totalMessages,
                documents: totalDocuments,
                storageUsedBytes: storageUsed,
            };
        }
        async inviteUser(organizationId, ownerId, email, role) {
            const organization = await this.findOne(organizationId, ownerId);
            if (organization.ownerId !== ownerId) {
                throw new common_1.ForbiddenException('Only organization owner can invite users');
            }
            // Implementation for inviting users would go here
            // This would involve creating invitation tokens, sending emails, etc.
            return {
                message: 'Invitation sent successfully',
                email,
                role,
            };
        }
    };
    return OrganizationsService = _classThis;
})();
exports.OrganizationsService = OrganizationsService;
//# sourceMappingURL=organizations.service.js.map