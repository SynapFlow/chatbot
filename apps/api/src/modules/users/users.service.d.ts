import { User, UserRole } from '@chatbot-rag/database';
export declare class UsersService {
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
    findAll(params?: {
        skip?: number;
        take?: number;
        where?: any;
        orderBy?: any;
    }): Promise<{
        data: any;
        total: any;
        skip: number;
        take: number;
    }>;
    updateRole(userId: string, role: UserRole): Promise<any>;
    toggleActive(userId: string): Promise<any>;
    delete(userId: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=users.service.d.ts.map