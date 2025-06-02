import { Organization, Project } from '@chatbot-rag/database';
export interface TenantContext {
    organizationId?: string;
    projectId?: string;
    organization?: Organization;
    project?: Project;
    limits?: any;
}
export declare class TenantService {
    private context;
    setContext(context: Partial<TenantContext>): void;
    getContext(): TenantContext;
    getOrganizationId(): string | undefined;
    getProjectId(): string | undefined;
    loadOrganization(organizationId: string): Promise<Organization | null>;
    loadProject(projectId: string): Promise<Project | null>;
    checkLimit(resource: string, current: number): Promise<boolean>;
    enforceLimit(resource: string, current: number): Promise<void>;
    getUsage(): Promise<Record<string, any>>;
    private extractLimits;
    addOrganizationFilter(query: any): any;
    addProjectFilter(query: any): any;
    validateOrganizationAccess(organizationId: string): boolean;
    validateProjectAccess(projectId: string): boolean;
    userHasAccessToTenant(userId: string, tenantId: string): Promise<boolean>;
}
//# sourceMappingURL=tenant.service.d.ts.map