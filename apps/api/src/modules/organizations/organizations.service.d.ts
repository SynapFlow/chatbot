import { Organization } from '@chatbot-rag/database';
import { CreateOrganizationDto, UpdateOrganizationDto } from './dto';
export declare class OrganizationsService {
    create(userId: string, dto: CreateOrganizationDto): Promise<Organization>;
    findAll(userId: string, params?: {
        skip?: number;
        take?: number;
        search?: string;
    }): Promise<{
        data: any;
        total: any;
        skip: number;
        take: number;
    }>;
    findOne(id: string, userId: string): Promise<Organization>;
    findBySlug(slug: string, userId: string): Promise<Organization>;
    update(id: string, userId: string, dto: UpdateOrganizationDto): Promise<Organization>;
    delete(id: string, userId: string): Promise<void>;
    getStats(id: string, userId: string): Promise<{
        projects: any;
        messages: any;
        documents: any;
        storageUsedBytes: number;
    }>;
    inviteUser(organizationId: string, ownerId: string, email: string, role: string): Promise<{
        message: string;
        email: string;
        role: string;
    }>;
}
//# sourceMappingURL=organizations.service.d.ts.map