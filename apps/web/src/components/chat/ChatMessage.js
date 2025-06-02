"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMessage = void 0;
const react_1 = require("react");
const react_markdown_1 = __importDefault(require("react-markdown"));
const remark_gfm_1 = __importDefault(require("remark-gfm"));
const rehype_highlight_1 = __importDefault(require("rehype-highlight"));
const clsx_1 = require("clsx");
const date_fns_1 = require("date-fns");
exports.ChatMessage = (0, react_1.memo)(function ChatMessage({ message, isLatest = false, isStreaming = false }) {
    const isUser = message.role === 'user';
    const isAssistant = message.role === 'assistant';
    return (<div className={(0, clsx_1.clsx)('group relative flex gap-x-4', isLatest && 'animate-in slide-in-from-bottom-2 duration-300')}>
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className={(0, clsx_1.clsx)('flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium', isUser
            ? 'bg-primary-600 text-white'
            : 'bg-gray-100 text-gray-700')}>
          {isUser ? 'U' : 'AI'}
        </div>
      </div>

      {/* Message content */}
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-x-2">
          <span className="text-sm font-medium text-gray-900">
            {isUser ? 'You' : 'Assistant'}
          </span>
          <span className="text-xs text-gray-500">
            {(0, date_fns_1.format)(message.timestamp, 'HH:mm')}
          </span>
          {isStreaming && (<div className="flex items-center gap-x-1">
              <div className="h-1 w-1 rounded-full bg-green-500 animate-pulse"/>
              <span className="text-xs text-green-600">Typing...</span>
            </div>)}
        </div>

        <div className={(0, clsx_1.clsx)('rounded-lg px-4 py-3 text-sm', isUser
            ? 'bg-primary-600 text-white'
            : 'bg-gray-100 text-gray-900')}>
          {isUser ? (<p className="whitespace-pre-wrap">{message.content}</p>) : (<div className="markdown-content">
              <react_markdown_1.default remarkPlugins={[remark_gfm_1.default]} rehypePlugins={[rehype_highlight_1.default]} components={{
                code: ({ node, inline, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (<pre className="rounded-md bg-gray-900 p-4 overflow-x-auto">
                        <code className={className} {...props}>
                          {children}
                        </code>
                      </pre>) : (<code className="bg-gray-200 px-1 py-0.5 rounded text-sm" {...props}>
                        {children}
                      </code>);
                },
                p: ({ children }) => (<p className="mb-2 last:mb-0">{children}</p>),
                ul: ({ children }) => (<ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>),
                ol: ({ children }) => (<ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>),
                blockquote: ({ children }) => (<blockquote className="border-l-4 border-gray-300 pl-4 italic mb-2">
                      {children}
                    </blockquote>),
            }}>
                {message.content}
              </react_markdown_1.default>
            </div>)}
        </div>

        {/* Metadata */}
        {message.metadata && isAssistant && (<div className="flex items-center gap-x-4 text-xs text-gray-500">
            {message.metadata.model && (<span>Model: {message.metadata.model}</span>)}
            {message.metadata.usage && (<span>Tokens: {message.metadata.usage.totalTokens}</span>)}
            {message.metadata.usage?.cost && (<span>Cost: ${message.metadata.usage.cost.toFixed(4)}</span>)}
          </div>)}
      </div>
    </div>);
});
//# sourceMappingURL=ChatMessage.js.map