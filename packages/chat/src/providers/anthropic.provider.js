"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnthropicProvider = void 0;
const sdk_1 = __importDefault(require("@anthropic-ai/sdk"));
const base_provider_1 = require("./base.provider");
class AnthropicProvider extends base_provider_1.BaseChatProvider {
    name = 'anthropic';
    client;
    config;
    constructor(config) {
        super('AnthropicProvider');
        this.config = config;
        this.client = new sdk_1.default({
            apiKey: config.apiKey,
            baseURL: config.baseURL,
            timeout: config.timeout || 60000,
        });
    }
    async generateResponse(messages, options) {
        this.validateOptions(options);
        return this.withRetry(async () => {
            const { system, messages: formattedMessages } = this.formatAnthropicMessages(messages);
            const response = await this.client.messages.create({
                model: options.model || 'claude-3-sonnet-20240229',
                messages: formattedMessages,
                system,
                max_tokens: options.maxTokens || 4096,
                temperature: options.temperature,
                top_p: options.topP,
                stop_sequences: options.stop,
                stream: false,
            });
            const content = response.content
                .filter((block) => block.type === 'text')
                .map((block) => block.text)
                .join('');
            if (!content) {
                throw new Error('No content in Anthropic response');
            }
            const usage = {
                promptTokens: response.usage.input_tokens,
                completionTokens: response.usage.output_tokens,
                totalTokens: response.usage.input_tokens + response.usage.output_tokens,
                cost: this.calculateCost({
                    promptTokens: response.usage.input_tokens,
                    completionTokens: response.usage.output_tokens,
                    totalTokens: response.usage.input_tokens + response.usage.output_tokens,
                }, options.model || 'claude-3-sonnet-20240229'),
            };
            return {
                content,
                usage,
                finishReason: response.stop_reason || 'end_turn',
            };
        });
    }
    async *generateStreamResponse(messages, options) {
        this.validateOptions(options);
        const { system, messages: formattedMessages } = this.formatAnthropicMessages(messages);
        const stream = await this.client.messages.create({
            model: options.model || 'claude-3-sonnet-20240229',
            messages: formattedMessages,
            system,
            max_tokens: options.maxTokens || 4096,
            temperature: options.temperature,
            top_p: options.topP,
            stop_sequences: options.stop,
            stream: true,
        });
        let fullContent = '';
        try {
            for await (const event of stream) {
                if (event.type === 'content_block_delta') {
                    const delta = event.delta.text || '';
                    if (delta) {
                        fullContent += delta;
                        yield {
                            content: fullContent,
                            delta,
                        };
                    }
                }
                if (event.type === 'message_stop') {
                    const usage = {
                        promptTokens: 0, // Not available in streaming
                        completionTokens: 0,
                        totalTokens: 0,
                    };
                    yield {
                        content: fullContent,
                        usage,
                        finishReason: 'end_turn',
                    };
                }
            }
        }
        catch (error) {
            this.logger.error('Anthropic streaming error', error);
            throw error;
        }
    }
    async isAvailable() {
        try {
            // Test with a minimal request
            await this.client.messages.create({
                model: 'claude-3-haiku-20240307',
                messages: [{ role: 'user', content: 'Hi' }],
                max_tokens: 1,
            });
            return true;
        }
        catch (error) {
            this.logger.error('Anthropic availability check failed', error);
            return false;
        }
    }
    formatAnthropicMessages(messages) {
        const systemMessage = messages.find(msg => msg.role === 'system');
        const conversationMessages = messages
            .filter(msg => msg.role !== 'system')
            .map(msg => ({
            role: msg.role,
            content: msg.content,
        }));
        return {
            system: systemMessage?.content,
            messages: conversationMessages,
        };
    }
    calculateCost(usage, model) {
        const costPer1KTokens = {
            'claude-3-opus-20240229': { prompt: 0.015, completion: 0.075 },
            'claude-3-sonnet-20240229': { prompt: 0.003, completion: 0.015 },
            'claude-3-haiku-20240307': { prompt: 0.00025, completion: 0.00125 },
        };
        const modelCost = costPer1KTokens[model];
        if (!modelCost)
            return 0;
        const promptCost = (usage.promptTokens / 1000) * modelCost.prompt;
        const completionCost = (usage.completionTokens / 1000) * modelCost.completion;
        return promptCost + completionCost;
    }
}
exports.AnthropicProvider = AnthropicProvider;
//# sourceMappingURL=anthropic.provider.js.map