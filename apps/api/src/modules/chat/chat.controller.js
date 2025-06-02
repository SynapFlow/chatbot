"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
// TODO: Uncomment when @chatbot-rag/chat package is built
// import { ChatService } from '@chatbot-rag/chat';
// import {
//   ChatRequest,
//   ChatResponse,
//   StreamChatResponse,
// } from '@chatbot-rag/chat';
const tenant_guard_1 = require("../../common/guards/tenant.guard");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
let ChatController = (() => {
    let _classDecorators = [(0, common_1.Controller)('chat'), (0, common_1.UseGuards)(jwt_auth_guard_1.AuthGuard, tenant_guard_1.TenantGuard)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _chat_decorators;
    let _streamChat_decorators;
    let _getConversations_decorators;
    let _createConversation_decorators;
    let _getConversation_decorators;
    let _deleteConversation_decorators;
    let _getMessages_decorators;
    var ChatController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _chat_decorators = [(0, common_1.Post)()];
            _streamChat_decorators = [(0, common_1.Post)('stream')];
            _getConversations_decorators = [(0, common_1.Get)('conversations')];
            _createConversation_decorators = [(0, common_1.Post)('conversations')];
            _getConversation_decorators = [(0, common_1.Get)('conversations/:id')];
            _deleteConversation_decorators = [(0, common_1.Delete)('conversations/:id')];
            _getMessages_decorators = [(0, common_1.Get)('conversations/:id/messages')];
            __esDecorate(this, null, _chat_decorators, { kind: "method", name: "chat", static: false, private: false, access: { has: obj => "chat" in obj, get: obj => obj.chat }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _streamChat_decorators, { kind: "method", name: "streamChat", static: false, private: false, access: { has: obj => "streamChat" in obj, get: obj => obj.streamChat }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getConversations_decorators, { kind: "method", name: "getConversations", static: false, private: false, access: { has: obj => "getConversations" in obj, get: obj => obj.getConversations }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _createConversation_decorators, { kind: "method", name: "createConversation", static: false, private: false, access: { has: obj => "createConversation" in obj, get: obj => obj.createConversation }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getConversation_decorators, { kind: "method", name: "getConversation", static: false, private: false, access: { has: obj => "getConversation" in obj, get: obj => obj.getConversation }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _deleteConversation_decorators, { kind: "method", name: "deleteConversation", static: false, private: false, access: { has: obj => "deleteConversation" in obj, get: obj => obj.deleteConversation }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getMessages_decorators, { kind: "method", name: "getMessages", static: false, private: false, access: { has: obj => "getMessages" in obj, get: obj => obj.getMessages }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ChatController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        // TODO: Uncomment when ChatService is available
        // constructor(private readonly chatService: ChatService) {}
        async chat(chatRequest, req) {
            const requestWithTenant = {
                ...chatRequest,
                tenantId: req.tenantId,
                userId: req.user?.id,
            };
            // TODO: Re-enable when ChatService is available
            // return this.chatService.chat(requestWithTenant);
            // Mock response for now
            return {
                message: 'Mock response: ' + chatRequest.message,
                conversationId: 'mock_' + Date.now(),
                messageId: 'msg_' + Date.now(),
            };
        }
        async streamChat(chatRequest, req, res) {
            const requestWithTenant = {
                ...chatRequest,
                tenantId: req.tenantId,
                userId: req.user?.id,
            };
            res.setHeader('Content-Type', 'text/plain');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 'Cache-Control');
            // TODO: Re-enable when ChatService is available
            // const observable = await this.chatService.streamChat(requestWithTenant);
            // Mock streaming response for now
            res.write(`data: ${JSON.stringify({
                delta: 'Mock streaming response for: ' + chatRequest.message,
                finished: true,
            })}\n\n`);
            res.end();
            return;
            /*
            observable.subscribe({
              next: (data: StreamChatResponse) => {
                res.write(`data: ${JSON.stringify(data)}\n\n`);
              },
              error: (error) => {
                res.write(`data: ${JSON.stringify({
                  type: 'error',
                  error: error.message,
                })}\n\n`);
                res.end();
              },
              complete: () => {
                res.end();
              },
            });
            */
        }
        async getConversations(_req, limit, offset) {
            // Implementation would fetch conversations for the tenant
            return {
                conversations: [],
                total: 0,
                limit: limit || 20,
                offset: offset || 0,
            };
        }
        async createConversation(body, req) {
            // Implementation would create a new conversation
            return {
                id: 'conv_' + Date.now(),
                tenantId: req.tenantId,
                userId: req.user?.id,
                title: body.title,
                createdAt: new Date(),
                updatedAt: new Date(),
                messageCount: 0,
            };
        }
        async getConversation(conversationId, req) {
            // Implementation would fetch specific conversation
            return {
                id: conversationId,
                tenantId: req.tenantId,
                title: 'Sample Conversation',
                createdAt: new Date(),
                updatedAt: new Date(),
                messageCount: 0,
            };
        }
        async deleteConversation(_conversationId, _req) {
            // Implementation would delete conversation
            return { success: true };
        }
        async getMessages(_conversationId, _req, limit, offset) {
            // Implementation would fetch messages for conversation
            return {
                messages: [],
                total: 0,
                limit: limit || 50,
                offset: offset || 0,
            };
        }
        constructor() {
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
    return ChatController = _classThis;
})();
exports.ChatController = ChatController;
//# sourceMappingURL=chat.controller.js.map