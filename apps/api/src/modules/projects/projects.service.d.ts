import { Project } from '@chatbot-rag/database';
import { CreateProjectDto, UpdateProjectDto } from './dto';
export declare class ProjectsService {
    create(userId: string, dto: CreateProjectDto): Promise<Project>;
    findAll(organizationId: string, userId: string, params?: {
        skip?: number;
        take?: number;
        search?: string;
    }): Promise<{
        data: any;
        total: any;
        skip: number;
        take: number;
    }>;
    findOne(id: string, userId: string): Promise<Project>;
    findBySlug(organizationId: string, slug: string, userId: string): Promise<Project>;
    update(id: string, userId: string, dto: UpdateProjectDto): Promise<Project>;
    delete(id: string, userId: string): Promise<void>;
    generateApiKey(projectId: string, userId: string, name: string): Promise<{
        id: any;
        name: any;
        apiKey: string;
        createdAt: any;
    }>;
    listApiKeys(projectId: string, userId: string): Promise<any>;
    revokeApiKey(projectId: string, userId: string, keyId: string): Promise<{
        message: string;
    }>;
    getStats(projectId: string, userId: string): Promise<{
        messages: {
            total: any;
            today: any;
        };
        conversations: {
            total: any;
            active: any;
        };
        documents: any;
        sources: any;
    }>;
}
//# sourceMappingURL=projects.service.d.ts.map