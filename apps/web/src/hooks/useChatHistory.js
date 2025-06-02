"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useChatHistory = useChatHistory;
const react_1 = require("react");
const swr_1 = __importDefault(require("swr"));
const api_1 = require("@/lib/api");
function useChatHistory() {
    const [selectedConversation, setSelectedConversation] = (0, react_1.useState)(null);
    const { data: conversations, error: conversationsError, mutate: mutateConversations } = (0, swr_1.default)('/api/conversations', api_1.api.get);
    const { data: messages, error: messagesError, mutate: mutateMessages } = (0, swr_1.default)(selectedConversation ? `/api/conversations/${selectedConversation}/messages` : null, api_1.api.get);
    const createConversation = async (firstMessage) => {
        try {
            const conversation = await api_1.api.post('/api/conversations', {
                title: firstMessage?.substring(0, 50) + (firstMessage && firstMessage.length > 50 ? '...' : ''),
            });
            mutateConversations();
            setSelectedConversation(conversation.id);
            return conversation;
        }
        catch (error) {
            console.error('Failed to create conversation:', error);
            throw error;
        }
    };
    const deleteConversation = async (conversationId) => {
        try {
            await api_1.api.delete(`/api/conversations/${conversationId}`);
            if (selectedConversation === conversationId) {
                setSelectedConversation(null);
            }
            mutateConversations();
        }
        catch (error) {
            console.error('Failed to delete conversation:', error);
            throw error;
        }
    };
    const updateConversationTitle = async (conversationId, title) => {
        try {
            await api_1.api.patch(`/api/conversations/${conversationId}`, { title });
            mutateConversations();
        }
        catch (error) {
            console.error('Failed to update conversation title:', error);
            throw error;
        }
    };
    return {
        conversations: conversations || [],
        messages: messages || [],
        selectedConversation,
        setSelectedConversation,
        createConversation,
        deleteConversation,
        updateConversationTitle,
        isLoadingConversations: !conversations && !conversationsError,
        isLoadingMessages: selectedConversation && !messages && !messagesError,
        conversationsError,
        messagesError,
        refreshConversations: mutateConversations,
        refreshMessages: mutateMessages,
    };
}
//# sourceMappingURL=useChatHistory.js.map