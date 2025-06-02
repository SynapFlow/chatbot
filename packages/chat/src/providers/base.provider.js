"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseChatProvider = void 0;
const common_1 = require("@nestjs/common");
class BaseChatProvider {
    logger;
    constructor(loggerContext) {
        this.logger = new common_1.Logger(loggerContext);
    }
    formatMessages(messages) {
        return messages
            .filter(msg => msg.role !== 'system' || msg.content.trim())
            .map(msg => ({
            role: msg.role,
            content: msg.content,
        }));
    }
    extractSystemPrompt(messages) {
        const systemMessage = messages.find(msg => msg.role === 'system');
        return systemMessage?.content;
    }
    validateOptions(options) {
        if (options.temperature !== undefined && (options.temperature < 0 || options.temperature > 2)) {
            throw new Error('Temperature must be between 0 and 2');
        }
        if (options.maxTokens !== undefined && options.maxTokens <= 0) {
            throw new Error('Max tokens must be positive');
        }
        if (options.topP !== undefined && (options.topP < 0 || options.topP > 1)) {
            throw new Error('Top P must be between 0 and 1');
        }
    }
    calculateCost(usage, model) {
        // Default cost calculation - override in specific providers
        const costPer1KTokens = {
            'gpt-4': { prompt: 0.03, completion: 0.06 },
            'gpt-3.5-turbo': { prompt: 0.0015, completion: 0.002 },
            'claude-3-opus': { prompt: 0.015, completion: 0.075 },
            'claude-3-sonnet': { prompt: 0.003, completion: 0.015 },
        };
        const modelCost = costPer1KTokens[model];
        if (!modelCost)
            return 0;
        const promptCost = (usage.promptTokens / 1000) * modelCost.prompt;
        const completionCost = (usage.completionTokens / 1000) * modelCost.completion;
        return promptCost + completionCost;
    }
    async withRetry(operation, maxRetries = 3, baseDelay = 1000) {
        let lastError;
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                return await operation();
            }
            catch (error) {
                lastError = error;
                if (attempt === maxRetries) {
                    break;
                }
                const delay = baseDelay * Math.pow(2, attempt - 1);
                this.logger.warn(`${this.name} request failed (attempt ${attempt}/${maxRetries}): ${error.message}. Retrying in ${delay}ms...`);
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }
        throw lastError;
    }
}
exports.BaseChatProvider = BaseChatProvider;
//# sourceMappingURL=base.provider.js.map