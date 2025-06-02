import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto, UpdateOrganizationDto } from './dto';
import { User } from '@chatbot-rag/database';
export declare class OrganizationsController {
    private readonly organizationsService;
    constructor(organizationsService: OrganizationsService);
    create(user: User, dto: CreateOrganizationDto): Promise<Organization>;
    findAll(user: User, skip: number, take: number, search?: string): Promise<{
        data: any;
        total: any;
        skip: number;
        take: number;
    }>;
    findOne(id: string, user: User): Promise<Organization>;
    findBySlug(slug: string, user: User): Promise<Organization>;
    update(id: string, user: User, dto: UpdateOrganizationDto): Promise<Organization>;
    delete(id: string, user: User): Promise<void>;
    getStats(id: string, user: User): Promise<{
        projects: any;
        messages: any;
        documents: any;
        storageUsedBytes: number;
    }>;
    inviteUser(id: string, user: User, dto: {
        email: string;
        role: string;
    }): Promise<{
        message: string;
        email: string;
        role: string;
    }>;
}
//# sourceMappingURL=organizations.controller.d.ts.map