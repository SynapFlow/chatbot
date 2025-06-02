"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const server_1 = require("next/server");
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
async function POST(request) {
    try {
        const body = await request.json();
        // Forward the request to the backend API
        const response = await fetch(`${API_URL}/chat/stream`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Forward auth headers if present
                ...(request.headers.get('authorization') && {
                    'Authorization': request.headers.get('authorization')
                }),
                ...(request.headers.get('x-tenant-id') && {
                    'X-Tenant-ID': request.headers.get('x-tenant-id')
                }),
            },
            body: JSON.stringify(body),
            signal: AbortSignal.timeout(30000), // 30 second timeout
        });
        if (!response.ok) {
            return server_1.NextResponse.json({ error: 'Failed to connect to chat service' }, { status: response.status });
        }
        // Return a streaming response
        const stream = new ReadableStream({
            async start(controller) {
                const reader = response.body?.getReader();
                if (!reader) {
                    controller.close();
                    return;
                }
                try {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done)
                            break;
                        controller.enqueue(value);
                    }
                }
                catch (error) {
                    controller.error(error);
                }
                finally {
                    controller.close();
                    reader.releaseLock();
                }
            },
        });
        return new server_1.NextResponse(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });
    }
    catch (error) {
        console.error('Chat stream error:', error);
        return server_1.NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
//# sourceMappingURL=route.js.map