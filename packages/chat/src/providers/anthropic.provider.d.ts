import { BaseChatProvider } from './base.provider';
import { ChatMessage, GenerationOptions, TokenUsage } from '../types';
export interface AnthropicConfig {
    apiKey: string;
    baseURL?: string;
    timeout?: number;
}
export declare class AnthropicProvider extends BaseChatProvider {
    readonly name = "anthropic";
    private client;
    private config;
    constructor(config: AnthropicConfig);
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
    private formatAnthropicMessages;
    protected calculateCost(usage: TokenUsage, model: string): number;
}
//# sourceMappingURL=anthropic.provider.d.ts.map