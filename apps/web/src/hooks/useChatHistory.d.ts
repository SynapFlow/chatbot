interface Conversation {
    id: string;
    title?: string;
    createdAt: Date;
    updatedAt: Date;
    messageCount: number;
    lastMessageAt?: Date;
}
export declare function useChatHistory(): {
    conversations: Conversation[];
    messages: Message[];
    selectedConversation: string | null;
    setSelectedConversation: import("react").Dispatch<import("react").SetStateAction<string | null>>;
    createConversation: (firstMessage?: string) => Promise<any>;
    deleteConversation: (conversationId: string) => Promise<void>;
    updateConversationTitle: (conversationId: string, title: string) => Promise<void>;
    isLoadingConversations: boolean;
    isLoadingMessages: boolean | "" | null;
    conversationsError: any;
    messagesError: any;
    refreshConversations: import("swr").KeyedMutator<Conversation[]>;
    refreshMessages: import("swr").KeyedMutator<Message[]>;
};
export {};
//# sourceMappingURL=useChatHistory.d.ts.map