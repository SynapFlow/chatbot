import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { EmbeddingService } from '@chatbot-rag/embeddings';
import { VectorStoreService } from '@chatbot-rag/vector-store';
import { ChatRequest, ChatResponse, StreamChatResponse } from './types';
export declare class ChatService {
    private readonly configService;
    private readonly embeddingService;
    private readonly vectorStoreService;
    private readonly logger;
    private providers;
    private config;
    constructor(configService: ConfigService, embeddingService: EmbeddingService, vectorStoreService: VectorStoreService);
    chat(request: ChatRequest): Promise<ChatResponse>;
    streamChat(request: ChatRequest): Promise<Observable<StreamChatResponse>>;
    private processStreamChat;
    private performRetrieval;
    private enhanceContextWithRetrieval;
    private getOrCreateConversation;
    private getConversation;
    private createConversation;
    private updateConversation;
    private createMessage;
    private buildContext;
    private getProvider;
    private getDefaultGenerationOptions;
    private loadConfig;
    private initializeProviders;
}
//# sourceMappingURL=chat.service.d.ts.map