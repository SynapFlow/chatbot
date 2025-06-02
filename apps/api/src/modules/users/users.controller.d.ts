import { UsersService } from './users.service';
import { UserRole } from '@chatbot-rag/database';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(skip?: number, take?: number, search?: string): Promise<{
        data: any;
        total: any;
        skip: number;
        take: number;
    }>;
    findOne(id: string): Promise<any>;
    updateRole(id: string, role: UserRole): Promise<any>;
    toggleActive(id: string): Promise<any>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=users.controller.d.ts.map