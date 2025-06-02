import { z } from 'zod';
export declare const UserRoleSchema: z.ZodEnum<["admin", "user", "viewer"]>;
export declare const AuthProviderSchema: z.ZodEnum<["local", "google", "github"]>;
export declare const MessageRoleSchema: z.ZodEnum<["user", "assistant", "system"]>;
export declare const SourceTypeSchema: z.ZodEnum<["website", "document", "integration"]>;
export declare const JobStatusSchema: z.ZodEnum<["pending", "processing", "completed", "failed"]>;
export type UserRole = z.infer<typeof UserRoleSchema>;
export type AuthProvider = z.infer<typeof AuthProviderSchema>;
export type MessageRole = z.infer<typeof MessageRoleSchema>;
export type SourceType = z.infer<typeof SourceTypeSchema>;
export type JobStatus = z.infer<typeof JobStatusSchema>;
export declare const UserRoleEnum: {
    ADMIN: "admin";
    USER: "user";
    VIEWER: "viewer";
};
export declare const AuthProviderEnum: {
    LOCAL: "local";
    GOOGLE: "google";
    GITHUB: "github";
};
export declare const MessageRoleEnum: {
    USER: "user";
    ASSISTANT: "assistant";
    SYSTEM: "system";
};
export declare const SourceTypeEnum: {
    WEBSITE: "website";
    DOCUMENT: "document";
    INTEGRATION: "integration";
};
export declare const JobStatusEnum: {
    PENDING: "pending";
    PROCESSING: "processing";
    COMPLETED: "completed";
    FAILED: "failed";
};
export declare const CreateUserSchema: z.ZodObject<{
    email: z.ZodString;
    username: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
    role: z.ZodDefault<z.ZodEnum<["admin", "user", "viewer"]>>;
    provider: z.ZodDefault<z.ZodEnum<["local", "google", "github"]>>;
    providerId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    role: "admin" | "user" | "viewer";
    provider: "local" | "google" | "github";
    username?: string | undefined;
    password?: string | undefined;
    providerId?: string | undefined;
}, {
    email: string;
    username?: string | undefined;
    password?: string | undefined;
    role?: "admin" | "user" | "viewer" | undefined;
    provider?: "local" | "google" | "github" | undefined;
    providerId?: string | undefined;
}>;
export declare const CreateOrganizationSchema: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodString;
    ownerId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    slug: string;
    ownerId: string;
}, {
    name: string;
    slug: string;
    ownerId: string;
}>;
export declare const CreateProjectSchema: z.ZodObject<{
    organizationId: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    settings: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>;
    widgetSettings: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    slug: string;
    organizationId: string;
    settings: Record<string, any>;
    widgetSettings: Record<string, any>;
    description?: string | undefined;
}, {
    name: string;
    slug: string;
    organizationId: string;
    description?: string | undefined;
    settings?: Record<string, any> | undefined;
    widgetSettings?: Record<string, any> | undefined;
}>;
export declare const CreateSourceSchema: z.ZodObject<{
    projectId: z.ZodString;
    type: z.ZodEnum<["website", "document", "integration"]>;
    name: z.ZodString;
    config: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    type: "website" | "document" | "integration";
    name: string;
    projectId: string;
    config: Record<string, any>;
    metadata: Record<string, any>;
}, {
    type: "website" | "document" | "integration";
    name: string;
    projectId: string;
    config?: Record<string, any> | undefined;
    metadata?: Record<string, any> | undefined;
}>;
export declare const CreateDocumentSchema: z.ZodObject<{
    sourceId: z.ZodString;
    title: z.ZodString;
    content: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, any>;
    sourceId: string;
    title: string;
    url?: string | undefined;
    content?: string | undefined;
}, {
    sourceId: string;
    title: string;
    url?: string | undefined;
    metadata?: Record<string, any> | undefined;
    content?: string | undefined;
}>;
export declare const CreateConversationSchema: z.ZodObject<{
    projectId: z.ZodString;
    sessionId: z.ZodString;
    userIdentifier: z.ZodOptional<z.ZodString>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    projectId: string;
    metadata: Record<string, any>;
    sessionId: string;
    userIdentifier?: string | undefined;
}, {
    projectId: string;
    sessionId: string;
    metadata?: Record<string, any> | undefined;
    userIdentifier?: string | undefined;
}>;
export declare const CreateMessageSchema: z.ZodObject<{
    conversationId: z.ZodString;
    role: z.ZodEnum<["user", "assistant", "system"]>;
    content: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>;
    tokensUsed: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    role: "user" | "assistant" | "system";
    metadata: Record<string, any>;
    content: string;
    conversationId: string;
    tokensUsed?: number | undefined;
}, {
    role: "user" | "assistant" | "system";
    content: string;
    conversationId: string;
    metadata?: Record<string, any> | undefined;
    tokensUsed?: number | undefined;
}>;
export declare const CreateJobSchema: z.ZodObject<{
    projectId: z.ZodString;
    type: z.ZodString;
    config: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    type: string;
    projectId: string;
    config: Record<string, any>;
}, {
    type: string;
    projectId: string;
    config?: Record<string, any> | undefined;
}>;
export type CreateUserInput = z.infer<typeof CreateUserSchema>;
export type CreateOrganizationInput = z.infer<typeof CreateOrganizationSchema>;
export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;
export type CreateSourceInput = z.infer<typeof CreateSourceSchema>;
export type CreateDocumentInput = z.infer<typeof CreateDocumentSchema>;
export type CreateConversationInput = z.infer<typeof CreateConversationSchema>;
export type CreateMessageInput = z.infer<typeof CreateMessageSchema>;
export type CreateJobInput = z.infer<typeof CreateJobSchema>;
//# sourceMappingURL=types.d.ts.map