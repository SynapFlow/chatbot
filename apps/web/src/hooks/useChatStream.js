"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useChatStream = useChatStream;
const react_1 = require("react");
function useChatStream(options = {}) {
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [isStreaming, setIsStreaming] = (0, react_1.useState)(false);
    const [streamingMessage, setStreamingMessage] = (0, react_1.useState)('');
    const [error, setError] = (0, react_1.useState)(null);
    const sendMessage = (0, react_1.useCallback)(async (content) => {
        setIsLoading(true);
        setError(null);
        setStreamingMessage('');
        try {
            const response = await fetch('/api/chat/stream', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: content,
                    conversationId: options.conversationId,
                    generationOptions: {
                        stream: true,
                    },
                }),
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error:', response.status, errorText);
                throw new Error(`Failed to send message: ${response.status} ${response.statusText}`);
            }
            if (!response.body) {
                throw new Error('No response body');
            }
            setIsLoading(false);
            setIsStreaming(true);
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';
            let fullContent = '';
            try {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) {
                        break;
                    }
                    buffer += decoder.decode(value, { stream: true });
                    const lines = buffer.split('\n');
                    buffer = lines.pop() || '';
                    for (const line of lines) {
                        if (line.trim() === '')
                            continue;
                        // Skip SSE comments
                        if (line.startsWith(':'))
                            continue;
                        // Handle SSE data format
                        if (line.startsWith('data: ')) {
                            const jsonStr = line.slice(6); // Remove 'data: ' prefix
                            // Skip [DONE] message
                            if (jsonStr === '[DONE]')
                                continue;
                            try {
                                const data = JSON.parse(jsonStr);
                                switch (data.type) {
                                    case 'content':
                                        if (data.content) {
                                            fullContent += data.content;
                                            setStreamingMessage(fullContent);
                                        }
                                        break;
                                    case 'retrieval':
                                        if (data.retrievedDocuments) {
                                            options.onDocumentsRetrieved?.(data.retrievedDocuments);
                                        }
                                        break;
                                    case 'end':
                                        setIsStreaming(false);
                                        if (options.onMessageComplete) {
                                            const message = {
                                                id: data.id,
                                                role: 'assistant',
                                                content: fullContent,
                                                timestamp: new Date(),
                                                metadata: {
                                                    model: data.metadata?.model,
                                                    provider: data.metadata?.provider,
                                                    usage: data.usage,
                                                },
                                            };
                                            options.onMessageComplete(message);
                                        }
                                        setStreamingMessage('');
                                        break;
                                    case 'error':
                                        throw new Error(data.error || 'Unknown error');
                                }
                            }
                            catch (parseError) {
                                console.warn('Failed to parse SSE data:', line, parseError);
                            }
                        }
                    }
                }
            }
            finally {
                reader.releaseLock();
            }
        }
        catch (err) {
            console.error('Chat stream error:', err);
            setError(err instanceof Error ? err.message : 'An error occurred');
        }
        finally {
            setIsLoading(false);
            setIsStreaming(false);
        }
    }, [options]);
    return {
        sendMessage,
        isLoading,
        isStreaming,
        streamingMessage,
        error,
    };
}
//# sourceMappingURL=useChatStream.js.map