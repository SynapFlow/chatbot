"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const uuid_1 = require("uuid");
const providers_1 = require("./providers");
let ChatService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ChatService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ChatService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        configService;
        embeddingService;
        vectorStoreService;
        logger = new common_1.Logger(ChatService.name);
        providers = new Map();
        config;
        constructor(configService, embeddingService, vectorStoreService) {
            this.configService = configService;
            this.embeddingService = embeddingService;
            this.vectorStoreService = vectorStoreService;
            this.config = this.loadConfig();
            this.initializeProviders();
        }
        async chat(request) {
            const startTime = Date.now();
            try {
                // Get or create conversation
                const conversation = await this.getOrCreateConversation(request.conversationId, request.tenantId, request.userId);
                // Create user message
                const userMessage = await this.createMessage(conversation.id, 'user', request.message, request.tenantId, request.userId, request.metadata);
                // Get conversation context
                const context = await this.buildContext(conversation.id, request.tenantId, request.systemPrompt);
                // Perform retrieval if enabled
                let retrievedDocuments = [];
                let retrievalTime = 0;
                if (request.retrievalOptions?.enabled !== false && this.config.enableRetrieval) {
                    const retrievalStart = Date.now();
                    retrievedDocuments = await this.performRetrieval(request.message, request.tenantId, request.retrievalOptions || {});
                    retrievalTime = Date.now() - retrievalStart;
                }
                // Build enhanced context with retrieved documents
                const enhancedContext = await this.enhanceContextWithRetrieval(context, retrievedDocuments, request.systemPrompt);
                // Generate response
                const generationStart = Date.now();
                const provider = this.getProvider(request.generationOptions?.provider);
                const generationOptions = {
                    ...this.getDefaultGenerationOptions(),
                    ...request.generationOptions,
                    stream: false,
                };
                const generation = await provider.generateResponse(enhancedContext.messages, generationOptions);
                const generationTime = Date.now() - generationStart;
                // Create assistant message
                const assistantMessage = await this.createMessage(conversation.id, 'assistant', generation.content, request.tenantId, request.userId, {
                    retrievedDocuments: retrievedDocuments.map(doc => doc.id),
                    model: generationOptions.model,
                    provider: provider.name,
                    usage: generation.usage,
                });
                // Update conversation
                await this.updateConversation(conversation.id, {
                    updatedAt: new Date(),
                    lastMessageAt: new Date(),
                    messageCount: conversation.messageCount + 2,
                });
                const totalTime = Date.now() - startTime;
                return {
                    id: assistantMessage.id,
                    conversationId: conversation.id,
                    message: assistantMessage,
                    retrievedDocuments,
                    usage: generation.usage,
                    metadata: {
                        retrievalTime,
                        generationTime,
                        totalTime,
                        model: generationOptions.model || this.config.defaultModel,
                        provider: provider.name,
                    },
                };
            }
            catch (error) {
                this.logger.error('Chat request failed', error);
                throw error;
            }
        }
        async streamChat(request) {
            const subject = new rxjs_1.Subject();
            // Process asynchronously
            this.processStreamChat(request, subject).catch(error => {
                this.logger.error('Stream chat error', error);
                subject.next({
                    id: (0, uuid_1.v4)(),
                    conversationId: request.conversationId || '',
                    type: 'error',
                    error: error.message,
                });
                subject.complete();
            });
            return subject.asObservable();
        }
        async processStreamChat(request, subject) {
            const startTime = Date.now();
            try {
                // Get or create conversation
                const conversation = await this.getOrCreateConversation(request.conversationId, request.tenantId, request.userId);
                const responseId = (0, uuid_1.v4)();
                subject.next({
                    id: responseId,
                    conversationId: conversation.id,
                    type: 'start',
                });
                // Create user message
                await this.createMessage(conversation.id, 'user', request.message, request.tenantId, request.userId, request.metadata);
                // Get conversation context
                const context = await this.buildContext(conversation.id, request.tenantId, request.systemPrompt);
                // Perform retrieval if enabled
                let retrievedDocuments = [];
                if (request.retrievalOptions?.enabled !== false && this.config.enableRetrieval) {
                    retrievedDocuments = await this.performRetrieval(request.message, request.tenantId, request.retrievalOptions || {});
                    if (retrievedDocuments.length > 0) {
                        subject.next({
                            id: responseId,
                            conversationId: conversation.id,
                            type: 'retrieval',
                            retrievedDocuments,
                        });
                    }
                }
                // Build enhanced context
                const enhancedContext = await this.enhanceContextWithRetrieval(context, retrievedDocuments, request.systemPrompt);
                // Generate streaming response
                const provider = this.getProvider(request.generationOptions?.provider);
                const generationOptions = {
                    ...this.getDefaultGenerationOptions(),
                    ...request.generationOptions,
                    stream: true,
                };
                let fullContent = '';
                for await (const chunk of provider.generateStreamResponse(enhancedContext.messages, generationOptions)) {
                    if (chunk.delta) {
                        fullContent += chunk.delta;
                        subject.next({
                            id: responseId,
                            conversationId: conversation.id,
                            type: 'content',
                            content: chunk.delta,
                        });
                    }
                    if (chunk.finishReason) {
                        // Create assistant message
                        await this.createMessage(conversation.id, 'assistant', fullContent, request.tenantId, request.userId, {
                            retrievedDocuments: retrievedDocuments.map(doc => doc.id),
                            model: generationOptions.model,
                            provider: provider.name,
                            usage: chunk.usage,
                        });
                        // Update conversation
                        await this.updateConversation(conversation.id, {
                            updatedAt: new Date(),
                            lastMessageAt: new Date(),
                            messageCount: conversation.messageCount + 2,
                        });
                        subject.next({
                            id: responseId,
                            conversationId: conversation.id,
                            type: 'end',
                            usage: chunk.usage,
                            metadata: {
                                totalTime: Date.now() - startTime,
                                model: generationOptions.model || this.config.defaultModel,
                                provider: provider.name,
                            },
                        });
                    }
                }
                subject.complete();
            }
            catch (error) {
                throw error;
            }
        }
        async performRetrieval(query, tenantId, options) {
            try {
                // Generate query embedding
                const embedding = await this.embeddingService.embed(query);
                // Search vector store
                const searchResults = await this.vectorStoreService.search(options.collections?.[0] || `tenant_${tenantId}`, embedding.embeddings[0], {
                    limit: options.maxDocuments || 5,
                    scoreThreshold: options.scoreThreshold || 0.7,
                    tenantId,
                    filter: options.filters,
                    includeVectors: false,
                });
                return searchResults.map(result => ({
                    id: result.id,
                    content: result.content,
                    score: result.score,
                    metadata: result.metadata,
                    chunkId: result.id,
                }));
            }
            catch (error) {
                this.logger.error('Retrieval failed', error);
                return [];
            }
        }
        async enhanceContextWithRetrieval(context, retrievedDocuments, systemPrompt) {
            if (retrievedDocuments.length === 0) {
                return context;
            }
            // Build context from retrieved documents
            const contextText = retrievedDocuments
                .map((doc, index) => `[${index + 1}] ${doc.content}`)
                .join('\n\n');
            // Enhanced system prompt
            const enhancedSystemPrompt = `
${systemPrompt || 'You are a helpful AI assistant.'}

Use the following context to answer the user's question. If the context doesn't contain relevant information, say so.

## Context:
${contextText}

## Instructions:
- Answer based on the provided context
- Be specific and cite relevant information
- If the context is insufficient, acknowledge this
- Do not make up information not present in the context
    `.trim();
            // Replace or add system message
            const messages = [...context.messages];
            const systemMessageIndex = messages.findIndex(msg => msg.role === 'system');
            if (systemMessageIndex >= 0) {
                messages[systemMessageIndex] = {
                    ...messages[systemMessageIndex],
                    content: enhancedSystemPrompt,
                };
            }
            else {
                messages.unshift({
                    id: (0, uuid_1.v4)(),
                    conversationId: context.conversationId,
                    role: 'system',
                    content: enhancedSystemPrompt,
                    timestamp: new Date(),
                    tenantId: messages[0]?.tenantId || '',
                });
            }
            return {
                ...context,
                messages,
                retrievedDocuments,
            };
        }
        async getOrCreateConversation(conversationId, tenantId, userId) {
            if (conversationId) {
                // Try to get existing conversation
                const conversation = await this.getConversation(conversationId, tenantId);
                if (conversation) {
                    return conversation;
                }
            }
            // Create new conversation
            return this.createConversation(tenantId, userId);
        }
        async getConversation(conversationId, tenantId) {
            // In a real implementation, fetch from database
            // For now, simulate
            return {
                id: conversationId,
                tenantId,
                createdAt: new Date(),
                updatedAt: new Date(),
                messageCount: 0,
            };
        }
        async createConversation(tenantId, userId) {
            const conversation = {
                id: (0, uuid_1.v4)(),
                tenantId,
                userId,
                createdAt: new Date(),
                updatedAt: new Date(),
                messageCount: 0,
            };
            // In a real implementation, save to database
            return conversation;
        }
        async updateConversation(conversationId, updates) {
            // In a real implementation, update database
            this.logger.debug(`Updating conversation ${conversationId}`, updates);
        }
        async createMessage(conversationId, role, content, tenantId, userId, metadata) {
            const message = {
                id: (0, uuid_1.v4)(),
                conversationId,
                role,
                content,
                metadata,
                timestamp: new Date(),
                tenantId,
                userId,
            };
            // In a real implementation, save to database
            return message;
        }
        async buildContext(conversationId, tenantId, systemPrompt) {
            // In a real implementation, fetch messages from database
            const messages = [];
            if (systemPrompt) {
                messages.push({
                    id: (0, uuid_1.v4)(),
                    conversationId,
                    role: 'system',
                    content: systemPrompt,
                    timestamp: new Date(),
                    tenantId,
                });
            }
            return {
                conversationId,
                messages,
                systemPrompt,
            };
        }
        getProvider(providerName) {
            const name = (providerName || this.config.defaultProvider);
            const provider = this.providers.get(name);
            if (!provider) {
                throw new Error(`Chat provider ${name} not available`);
            }
            return provider;
        }
        getDefaultGenerationOptions() {
            return {
                model: this.config.defaultModel,
                provider: this.config.defaultProvider,
                temperature: this.config.defaultTemperature,
                maxTokens: 2048,
            };
        }
        loadConfig() {
            return {
                defaultProvider: this.configService.get('CHAT_DEFAULT_PROVIDER', 'openai'),
                defaultModel: this.configService.get('CHAT_DEFAULT_MODEL', 'gpt-3.5-turbo'),
                maxContextWindow: this.configService.get('CHAT_MAX_CONTEXT_WINDOW', 4096),
                defaultTemperature: this.configService.get('CHAT_DEFAULT_TEMPERATURE', 0.7),
                maxRetries: this.configService.get('CHAT_MAX_RETRIES', 3),
                timeout: this.configService.get('CHAT_TIMEOUT', 60000),
                enableRetrieval: this.configService.get('CHAT_ENABLE_RETRIEVAL', true),
                enableStreaming: this.configService.get('CHAT_ENABLE_STREAMING', true),
                enableSafety: this.configService.get('CHAT_ENABLE_SAFETY', true),
                enableAnalytics: this.configService.get('CHAT_ENABLE_ANALYTICS', true),
                enableCaching: this.configService.get('CHAT_ENABLE_CACHING', true),
            };
        }
        initializeProviders() {
            // Initialize OpenAI provider
            const openaiApiKey = this.configService.get('OPENAI_API_KEY');
            if (openaiApiKey) {
                const openaiConfig = {
                    apiKey: openaiApiKey,
                    baseURL: this.configService.get('OPENAI_BASE_URL'),
                    organization: this.configService.get('OPENAI_ORGANIZATION'),
                    timeout: this.configService.get('OPENAI_TIMEOUT', 60000),
                };
                this.providers.set('openai', new providers_1.OpenAIProvider(openaiConfig));
            }
            // Initialize Anthropic provider
            const anthropicApiKey = this.configService.get('ANTHROPIC_API_KEY');
            if (anthropicApiKey) {
                const anthropicConfig = {
                    apiKey: anthropicApiKey,
                    baseURL: this.configService.get('ANTHROPIC_BASE_URL'),
                    timeout: this.configService.get('ANTHROPIC_TIMEOUT', 60000),
                };
                this.providers.set('anthropic', new providers_1.AnthropicProvider(anthropicConfig));
            }
            this.logger.log(`Initialized ${this.providers.size} chat providers`);
        }
    };
    return ChatService = _classThis;
})();
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map