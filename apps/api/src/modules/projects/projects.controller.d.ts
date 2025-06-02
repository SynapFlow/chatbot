import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto } from './dto';
import { User } from '@chatbot-rag/database';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(user: User, dto: CreateProjectDto): Promise<Project>;
    findAll(organizationId: string, user: User, skip: number, take: number, search?: string): Promise<{
        data: any;
        total: any;
        skip: number;
        take: number;
    }>;
    findOne(id: string, user: User): Promise<Project>;
    findBySlug(organizationId: string, slug: string, user: User): Promise<Project>;
    update(id: string, user: User, dto: UpdateProjectDto): Promise<Project>;
    delete(id: string, user: User): Promise<void>;
    generateApiKey(id: string, user: User, name: string): Promise<{
        id: any;
        name: any;
        apiKey: string;
        createdAt: any;
    }>;
    listApiKeys(id: string, user: User): Promise<any>;
    revokeApiKey(id: string, keyId: string, user: User): Promise<{
        message: string;
    }>;
    getStats(id: string, user: User): Promise<{
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
//# sourceMappingURL=projects.controller.d.ts.map