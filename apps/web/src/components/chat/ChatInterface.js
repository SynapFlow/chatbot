"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatInterface = ChatInterface;
const react_1 = require("react");
const ChatMessage_1 = require("./ChatMessage");
const ChatInput_1 = require("./ChatInput");
const TypingIndicator_1 = require("./TypingIndicator");
const RetrievedDocuments_1 = require("./RetrievedDocuments");
const useChatStream_1 = require("@/hooks/useChatStream");
function ChatInterface() {
    const [messages, setMessages] = (0, react_1.useState)([]);
    const [retrievedDocuments, setRetrievedDocuments] = (0, react_1.useState)([]);
    const [conversationId, setConversationId] = (0, react_1.useState)(null);
    const messagesEndRef = (0, react_1.useRef)(null);
    const { sendMessage, isLoading, isStreaming, streamingMessage, error } = (0, useChatStream_1.useChatStream)({
        onMessageComplete: (message) => {
            setMessages(prev => [...prev, message]);
        },
        onDocumentsRetrieved: (documents) => {
            setRetrievedDocuments(documents);
        },
        conversationId,
    });
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    (0, react_1.useEffect)(() => {
        scrollToBottom();
    }, [messages, streamingMessage]);
    const handleSendMessage = async (content) => {
        const userMessage = {
            id: Date.now().toString(),
            role: 'user',
            content,
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMessage]);
        setRetrievedDocuments([]);
        await sendMessage(content);
    };
    const handleNewConversation = () => {
        setMessages([]);
        setRetrievedDocuments([]);
        setConversationId(null);
    };
    return (<div className="flex h-full">
      {/* Main chat area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Chat</h2>
            <button onClick={handleNewConversation} className="btn btn-secondary btn-sm">
              New Conversation
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 chat-scrollbar">
          <div className="mx-auto max-w-3xl">
            {messages.length === 0 && !isStreaming && (<div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                    <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Start a conversation
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Ask me anything about your documents or general questions.
                  </p>
                  <div className="grid grid-cols-1 gap-2 max-w-md mx-auto">
                    {[
                "What documents do I have?",
                "Summarize my latest reports",
                "Help me find information about...",
            ].map((suggestion, index) => (<button key={index} onClick={() => handleSendMessage(suggestion)} className="text-left p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors text-sm">
                        {suggestion}
                      </button>))}
                  </div>
                </div>
              </div>)}

            <div className="space-y-6">
              {messages.map((message, index) => (<ChatMessage_1.ChatMessage key={message.id} message={message} isLatest={index === messages.length - 1}/>))}
              
              {isStreaming && streamingMessage && (<ChatMessage_1.ChatMessage message={{
                id: 'streaming',
                role: 'assistant',
                content: streamingMessage,
                timestamp: new Date(),
            }} isLatest isStreaming/>)}
              
              {isLoading && !isStreaming && <TypingIndicator_1.TypingIndicator />}
            </div>
            
            <div ref={messagesEndRef}/>
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-6">
          <div className="mx-auto max-w-3xl">
            <ChatInput_1.ChatInput onSendMessage={handleSendMessage} disabled={isLoading} placeholder="Type your message..."/>
            
            {error && (<div className="mt-2 text-sm text-red-600">
                Error: {error}
              </div>)}
          </div>
        </div>
      </div>

      {/* Sidebar with retrieved documents */}
      {retrievedDocuments.length > 0 && (<div className="w-80 border-l border-gray-200 bg-gray-50">
          <RetrievedDocuments_1.RetrievedDocuments documents={retrievedDocuments}/>
        </div>)}
    </div>);
}
//# sourceMappingURL=ChatInterface.js.map