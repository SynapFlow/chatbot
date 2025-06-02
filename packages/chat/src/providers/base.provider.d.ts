import { Logger } from '@nestjs/common';
import { ChatProvider, ChatMessage, GenerationOptions, TokenUsage } from '../types';
export declare abstract class BaseChatProvider implements ChatProvider {
    protected readonly logger: Logger;
    abstract readonly name: string;
    constructor(loggerContext: string);
    abstract generateResponse(messages: ChatMessage[], options: GenerationOptions): Promise<{
        content: string;
        usage: TokenUsage;
        finishReason: string;
    }>;
    abstract generateStreamResponse(messages: ChatMessage[], options: GenerationOptions): AsyncGenerator<{
        content: string;
        delta?: string;
        usage?: TokenUsage;
        finishReason?: string;
    }>;
    abstract isAvailable(): Promise<boolean>;
    protected formatMessages(messages: ChatMessage[]): any[];
    protected extractSystemPrompt(messages: ChatMessage[]): string | undefined;
    protected validateOptions(options: GenerationOptions): void;
    protected calculateCost(usage: TokenUsage, model: string): number;
    protected withRetry<T>(operation: () => Promise<T>, maxRetries?: number, baseDelay?: number): Promise<T>;
}
//# sourceMappingURL=base.provider.d.ts.map