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
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("@chatbot-rag/database");
const shared_1 = require("@chatbot-rag/shared");
const database_2 = require("@chatbot-rag/database");
let ProjectsService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ProjectsService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ProjectsService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        async create(userId, dto) {
            // Verify organization access
            const organization = await database_1.prisma.organization.findUnique({
                where: { id: dto.organizationId },
            });
            if (!organization) {
                throw new common_1.NotFoundException('Organization not found');
            }
            if (organization.ownerId !== userId) {
                throw new common_1.ForbiddenException('Access denied to organization');
            }
            // Check if slug exists within organization
            const existing = await database_1.prisma.project.findUnique({
                where: {
                    organizationId_slug: {
                        organizationId: dto.organizationId,
                        slug: dto.slug,
                    },
                },
            });
            if (existing) {
                throw new common_1.ConflictException('Project slug already exists in this organization');
            }
            // Check project limit based on subscription
            const projectCount = await database_1.prisma.project.count({
                where: { organizationId: dto.organizationId },
            });
            const limits = organization.settings?.limits;
            if (limits?.projectsPerOrg && projectCount >= limits.projectsPerOrg) {
                throw new common_1.ForbiddenException('Project limit reached for organization');
            }
            // Create project with default API key
            const project = await database_1.prisma.$transaction(async (tx) => {
                const newProject = await tx.project.create({
                    data: {
                        organizationId: dto.organizationId,
                        name: dto.name,
                        slug: dto.slug,
                        description: dto.description,
                        settings: dto.settings || {},
                        widgetSettings: {
                            ...shared_1.DEFAULT_WIDGET_SETTINGS,
                            ...dto.widgetSettings,
                        },
                    },
                });
                // Generate default API key
                const apiKey = (0, shared_1.generateApiKey)();
                const keyHash = (0, shared_1.hashApiKey)(apiKey);
                await tx.apiKey.create({
                    data: {
                        projectId: newProject.id,
                        name: 'Default API Key',
                        keyHash,
                    },
                });
                // Initialize vector store collection for this project
                await database_2.vectorStore.initialize();
                return { ...newProject, apiKey };
            });
            return project;
        }
        async findAll(organizationId, userId, params) {
            // Verify organization access
            const organization = await database_1.prisma.organization.findUnique({
                where: { id: organizationId },
            });
            if (!organization) {
                throw new common_1.NotFoundException('Organization not found');
            }
            if (organization.ownerId !== userId) {
                throw new common_1.ForbiddenException('Access denied to organization');
            }
            const { skip = 0, take = 10, search } = params || {};
            const where = {
                organizationId,
                ...(search && {
                    OR: [
                        { name: { contains: search, mode: 'insensitive' } },
                        { slug: { contains: search, mode: 'insensitive' } },
                        { description: { contains: search, mode: 'insensitive' } },
                    ],
                }),
            };
            const [projects, total] = await Promise.all([
                database_1.prisma.project.findMany({
                    where,
                    skip,
                    take,
                    orderBy: { createdAt: 'desc' },
                    include: {
                        _count: {
                            select: {
                                sources: true,
                                conversations: true,
                                apiKeys: {
                                    where: { isActive: true },
                                },
                            },
                        },
                    },
                }),
                database_1.prisma.project.count({ where }),
            ]);
            return {
                data: projects,
                total,
                skip,
                take,
            };
        }
        async findOne(id, userId) {
            const project = await database_1.prisma.project.findUnique({
                where: { id },
                include: {
                    organization: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                            ownerId: true,
                        },
                    },
                    sources: {
                        select: {
                            id: true,
                            type: true,
                            name: true,
                            isActive: true,
                            lastSyncedAt: true,
                            _count: {
                                select: {
                                    documents: true,
                                },
                            },
                        },
                    },
                    apiKeys: {
                        where: { isActive: true },
                        select: {
                            id: true,
                            name: true,
                            lastUsedAt: true,
                            createdAt: true,
                        },
                    },
                    _count: {
                        select: {
                            conversations: true,
                            jobs: true,
                        },
                    },
                },
            });
            if (!project) {
                throw new common_1.NotFoundException('Project not found');
            }
            // Check access
            if (project.organization.ownerId !== userId) {
                throw new common_1.ForbiddenException('Access denied');
            }
            return project;
        }
        async findBySlug(organizationId, slug, userId) {
            const project = await database_1.prisma.project.findUnique({
                where: {
                    organizationId_slug: {
                        organizationId,
                        slug,
                    },
                },
                include: {
                    organization: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                            ownerId: true,
                        },
                    },
                },
            });
            if (!project) {
                throw new common_1.NotFoundException('Project not found');
            }
            if (project.organization.ownerId !== userId) {
                throw new common_1.ForbiddenException('Access denied');
            }
            return project;
        }
        async update(id, userId, dto) {
            const project = await this.findOne(id, userId);
            if (dto.slug && dto.slug !== project.slug) {
                const existing = await database_1.prisma.project.findUnique({
                    where: {
                        organizationId_slug: {
                            organizationId: project.organizationId,
                            slug: dto.slug,
                        },
                    },
                });
                if (existing) {
                    throw new common_1.ConflictException('Project slug already exists');
                }
            }
            return database_1.prisma.project.update({
                where: { id },
                data: {
                    ...dto,
                    widgetSettings: dto.widgetSettings
                        ? { ...project.widgetSettings, ...dto.widgetSettings }
                        : undefined,
                },
            });
        }
        async delete(id, userId) {
            const project = await this.findOne(id, userId);
            // Check if project has active sources
            const activeSources = await database_1.prisma.source.count({
                where: {
                    projectId: id,
                    isActive: true,
                },
            });
            if (activeSources > 0) {
                throw new common_1.ConflictException('Cannot delete project with active sources');
            }
            // Delete from vector store
            await database_2.vectorStore.deleteByProject(id);
            // Delete project (cascades to related data)
            await database_1.prisma.project.delete({
                where: { id },
            });
        }
        async generateApiKey(projectId, userId, name) {
            await this.findOne(projectId, userId);
            const apiKey = (0, shared_1.generateApiKey)();
            const keyHash = (0, shared_1.hashApiKey)(apiKey);
            const apiKeyRecord = await database_1.prisma.apiKey.create({
                data: {
                    projectId,
                    name,
                    keyHash,
                },
            });
            return {
                id: apiKeyRecord.id,
                name: apiKeyRecord.name,
                apiKey, // Only returned on creation
                createdAt: apiKeyRecord.createdAt,
            };
        }
        async listApiKeys(projectId, userId) {
            await this.findOne(projectId, userId);
            return database_1.prisma.apiKey.findMany({
                where: {
                    projectId,
                    isActive: true,
                },
                select: {
                    id: true,
                    name: true,
                    lastUsedAt: true,
                    createdAt: true,
                },
                orderBy: { createdAt: 'desc' },
            });
        }
        async revokeApiKey(projectId, userId, keyId) {
            await this.findOne(projectId, userId);
            const apiKey = await database_1.prisma.apiKey.findFirst({
                where: {
                    id: keyId,
                    projectId,
                },
            });
            if (!apiKey) {
                throw new common_1.NotFoundException('API key not found');
            }
            await database_1.prisma.apiKey.update({
                where: { id: keyId },
                data: { isActive: false },
            });
            return { message: 'API key revoked successfully' };
        }
        async getStats(projectId, userId) {
            await this.findOne(projectId, userId);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const [totalMessages, messagesToday, totalConversations, activeConversations, totalDocuments, totalSources,] = await Promise.all([
                database_1.prisma.message.count({
                    where: {
                        conversation: { projectId },
                    },
                }),
                database_1.prisma.message.count({
                    where: {
                        conversation: { projectId },
                        createdAt: { gte: today },
                    },
                }),
                database_1.prisma.conversation.count({
                    where: { projectId },
                }),
                database_1.prisma.conversation.count({
                    where: {
                        projectId,
                        updatedAt: {
                            gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
                        },
                    },
                }),
                database_1.prisma.document.count({
                    where: {
                        source: { projectId },
                    },
                }),
                database_1.prisma.source.count({
                    where: { projectId },
                }),
            ]);
            return {
                messages: {
                    total: totalMessages,
                    today: messagesToday,
                },
                conversations: {
                    total: totalConversations,
                    active: activeConversations,
                },
                documents: totalDocuments,
                sources: totalSources,
            };
        }
    };
    return ProjectsService = _classThis;
})();
exports.ProjectsService = ProjectsService;
//# sourceMappingURL=projects.service.js.map