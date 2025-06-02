"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewport = exports.metadata = void 0;
exports.default = RootLayout;
const google_1 = require("next/font/google");
const react_hot_toast_1 = require("react-hot-toast");
require("./globals.css");
const inter = (0, google_1.Inter)({ subsets: ['latin'] });
exports.metadata = {
    title: 'ChatBot RAG - Intelligent Document Chat',
    description: 'AI-powered chatbot with document retrieval and generation capabilities',
    keywords: 'chatbot, AI, RAG, document, retrieval, generation, chat',
    authors: [{ name: 'ChatBot RAG Team' }],
};
exports.viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#3b82f6',
};
function RootLayout({ children, }) {
    return (<html lang="en" className="h-full">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  primary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                  }
                }
              }
            }
          }
        ` }}/>
      </head>
      <body className={`${inter.className} h-full bg-gray-50 antialiased`}>
        <div id="root" className="h-full">
          {children}
        </div>
        <react_hot_toast_1.Toaster position="top-right" toastOptions={{
            duration: 4000,
            style: {
                background: '#363636',
                color: '#fff',
            },
            success: {
                style: {
                    background: '#10b981',
                },
            },
            error: {
                style: {
                    background: '#ef4444',
                },
            },
        }}/>
      </body>
    </html>);
}
//# sourceMappingURL=layout.js.map