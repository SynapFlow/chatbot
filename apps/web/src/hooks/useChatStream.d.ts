import { Message, RetrievedDocument } from '@/types/chat';
interface UseChatStreamOptions {
    onMessageComplete?: (message: Message) => void;
    onDocumentsRetrieved?: (documents: RetrievedDocument[]) => void;
    conversationId?: string | null;
}
export declare function useChatStream(options?: UseChatStreamOptions): {
    sendMessage: (content: string) => Promise<void>;
    isLoading: boolean;
    isStreaming: boolean;
    streamingMessage: string;
    error: string | null;
};
export {};
//# sourceMappingURL=useChatStream.d.ts.map