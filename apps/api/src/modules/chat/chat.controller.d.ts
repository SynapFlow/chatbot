import { Response } from 'express';
interface ChatRequest {
    message: string;
    conversationId?: string;
    projectId: string;
}
interface ChatResponse {
    message: string;
    conversationId: string;
    messageId: string;
}
export declare class ChatController {
    chat(chatRequest: ChatRequest, req: any): Promise<ChatResponse>;
    streamChat(chatRequest: ChatRequest, req: any, res: Response): Promise<void>;
    getConversations(_req: any, limit?: number, offset?: number): Promise<{
        conversations: never[];
        total: number;
        limit: number;
        offset: number;
    }>;
    createConversation(body: {
        title?: string;
    }, req: any): Promise<{
        id: string;
        tenantId: any;
        userId: any;
        title: string | undefined;
        createdAt: Date;
        updatedAt: Date;
        messageCount: number;
    }>;
    getConversation(conversationId: string, req: any): Promise<{
        id: string;
        tenantId: any;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        messageCount: number;
    }>;
    deleteConversation(_conversationId: string, _req: any): Promise<{
        success: boolean;
    }>;
    getMessages(_conversationId: string, _req: any, limit?: number, offset?: number): Promise<{
        messages: never[];
        total: number;
        limit: number;
        offset: number;
    }>;
}
export {};
//# sourceMappingURL=chat.controller.d.ts.map