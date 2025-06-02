declare class ApiClient {
    private client;
    constructor();
    get<T = any>(url: string, params?: any): Promise<T>;
    post<T = any>(url: string, data?: any): Promise<T>;
    put<T = any>(url: string, data?: any): Promise<T>;
    patch<T = any>(url: string, data?: any): Promise<T>;
    delete<T = any>(url: string): Promise<T>;
    upload<T = any>(url: string, file: File, onProgress?: (progress: number) => void): Promise<T>;
}
export declare const api: ApiClient;
export declare const chatApi: {
    sendMessage: (data: any) => Promise<any>;
    streamChat: (data: any) => Promise<any>;
    getConversations: () => Promise<any>;
    getConversation: (id: string) => Promise<any>;
    createConversation: (data: any) => Promise<any>;
    deleteConversation: (id: string) => Promise<any>;
    getMessages: (conversationId: string) => Promise<any>;
};
export declare const documentsApi: {
    getDocuments: (params?: any) => Promise<any>;
    getDocument: (id: string) => Promise<any>;
    uploadDocument: (file: File, onProgress?: (progress: number) => void) => Promise<any>;
    deleteDocument: (id: string) => Promise<any>;
    updateDocument: (id: string, data: any) => Promise<any>;
};
export declare const analyticsApi: {
    getDashboard: () => Promise<any>;
    getUsage: (params?: any) => Promise<any>;
    getConversationStats: (params?: any) => Promise<any>;
    getDocumentStats: (params?: any) => Promise<any>;
};
export declare const settingsApi: {
    getSettings: () => Promise<any>;
    updateSettings: (data: any) => Promise<any>;
    getModels: () => Promise<any>;
    testConnection: (provider: string, config: any) => Promise<any>;
};
export {};
//# sourceMappingURL=api.d.ts.map