import { BaseChatProvider } from './base.provider';
import { ChatMessage, GenerationOptions, TokenUsage } from '../types';
export interface OpenAIConfig {
    apiKey: string;
    baseURL?: string;
    organization?: string;
    timeout?: number;
}
export declare class OpenAIProvider extends BaseChatProvider {
    readonly name = "openai";
    private client;
    private config;
    constructor(config: OpenAIConfig);
    generateResponse(messages: ChatMessage[], options: GenerationOptions): Promise<{
        content: string;
        usage: TokenUsage;
        finishReason: string;
    }>;
    generateStreamResponse(messages: ChatMessage[], options: GenerationOptions): AsyncGenerator<{
        content: string;
        delta?: string;
        usage?: TokenUsage;
        finishReason?: string;
    }>;
    isAvailable(): Promise<boolean>;
    protected calculateCost(usage: TokenUsage, model: string): number;
}
//# sourceMappingURL=openai.provider.d.ts.map