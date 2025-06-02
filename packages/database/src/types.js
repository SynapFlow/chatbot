"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateJobSchema = exports.CreateMessageSchema = exports.CreateConversationSchema = exports.CreateDocumentSchema = exports.CreateSourceSchema = exports.CreateProjectSchema = exports.CreateOrganizationSchema = exports.CreateUserSchema = exports.JobStatusEnum = exports.SourceTypeEnum = exports.MessageRoleEnum = exports.AuthProviderEnum = exports.UserRoleEnum = exports.JobStatusSchema = exports.SourceTypeSchema = exports.MessageRoleSchema = exports.AuthProviderSchema = exports.UserRoleSchema = void 0;
const zod_1 = require("zod");
exports.UserRoleSchema = zod_1.z.enum(['admin', 'user', 'viewer']);
exports.AuthProviderSchema = zod_1.z.enum(['local', 'google', 'github']);
exports.MessageRoleSchema = zod_1.z.enum(['user', 'assistant', 'system']);
exports.SourceTypeSchema = zod_1.z.enum(['website', 'document', 'integration']);
exports.JobStatusSchema = zod_1.z.enum(['pending', 'processing', 'completed', 'failed']);
// Export actual enum objects for runtime use with different names to avoid conflicts
exports.UserRoleEnum = {
    ADMIN: 'admin',
    USER: 'user',
    VIEWER: 'viewer',
};
exports.AuthProviderEnum = {
    LOCAL: 'local',
    GOOGLE: 'google',
    GITHUB: 'github',
};
exports.MessageRoleEnum = {
    USER: 'user',
    ASSISTANT: 'assistant',
    SYSTEM: 'system',
};
exports.SourceTypeEnum = {
    WEBSITE: 'website',
    DOCUMENT: 'document',
    INTEGRATION: 'integration',
};
exports.JobStatusEnum = {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
};
exports.CreateUserSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    username: zod_1.z.string().optional(),
    password: zod_1.z.string().min(8).optional(),
    role: exports.UserRoleSchema.default('user'),
    provider: exports.AuthProviderSchema.default('local'),
    providerId: zod_1.z.string().optional(),
});
exports.CreateOrganizationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    slug: zod_1.z.string().min(1).regex(/^[a-z0-9-]+$/),
    ownerId: zod_1.z.string().uuid(),
});
exports.CreateProjectSchema = zod_1.z.object({
    organizationId: zod_1.z.string().uuid(),
    name: zod_1.z.string().min(1),
    slug: zod_1.z.string().min(1).regex(/^[a-z0-9-]+$/),
    description: zod_1.z.string().optional(),
    settings: zod_1.z.record(zod_1.z.any()).default({}),
    widgetSettings: zod_1.z.record(zod_1.z.any()).default({}),
});
exports.CreateSourceSchema = zod_1.z.object({
    projectId: zod_1.z.string().uuid(),
    type: exports.SourceTypeSchema,
    name: zod_1.z.string().min(1),
    config: zod_1.z.record(zod_1.z.any()).default({}),
    metadata: zod_1.z.record(zod_1.z.any()).default({}),
});
exports.CreateDocumentSchema = zod_1.z.object({
    sourceId: zod_1.z.string().uuid(),
    title: zod_1.z.string().min(1),
    content: zod_1.z.string().optional(),
    url: zod_1.z.string().url().optional(),
    metadata: zod_1.z.record(zod_1.z.any()).default({}),
});
exports.CreateConversationSchema = zod_1.z.object({
    projectId: zod_1.z.string().uuid(),
    sessionId: zod_1.z.string().min(1),
    userIdentifier: zod_1.z.string().optional(),
    metadata: zod_1.z.record(zod_1.z.any()).default({}),
});
exports.CreateMessageSchema = zod_1.z.object({
    conversationId: zod_1.z.string().uuid(),
    role: exports.MessageRoleSchema,
    content: zod_1.z.string().min(1),
    metadata: zod_1.z.record(zod_1.z.any()).default({}),
    tokensUsed: zod_1.z.number().optional(),
});
exports.CreateJobSchema = zod_1.z.object({
    projectId: zod_1.z.string().uuid(),
    type: zod_1.z.string().min(1),
    config: zod_1.z.record(zod_1.z.any()).default({}),
});
//# sourceMappingURL=types.js.map