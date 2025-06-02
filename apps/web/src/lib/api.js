"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingsApi = exports.analyticsApi = exports.documentsApi = exports.chatApi = exports.api = void 0;
const axios_1 = __importDefault(require("axios"));
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
class ApiClient {
    client;
    constructor() {
        this.client = axios_1.default.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // Request interceptor
        this.client.interceptors.request.use((config) => {
            // Add auth token if available
            const token = localStorage.getItem('auth_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            // Add tenant ID if available
            const tenantId = localStorage.getItem('tenant_id');
            if (tenantId) {
                config.headers['X-Tenant-ID'] = tenantId;
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        });
        // Response interceptor
        this.client.interceptors.response.use((response) => {
            return response.data;
        }, (error) => {
            if (error.response) {
                const { status, data } = error.response;
                switch (status) {
                    case 401:
                        // Handle unauthorized
                        localStorage.removeItem('auth_token');
                        react_hot_toast_1.default.error('Session expired. Please log in again.');
                        window.location.href = '/login';
                        break;
                    case 403:
                        react_hot_toast_1.default.error('Access denied');
                        break;
                    case 404:
                        react_hot_toast_1.default.error('Resource not found');
                        break;
                    case 429:
                        react_hot_toast_1.default.error('Too many requests. Please try again later.');
                        break;
                    case 500:
                        react_hot_toast_1.default.error('Server error. Please try again later.');
                        break;
                    default:
                        react_hot_toast_1.default.error(data?.message || 'An error occurred');
                }
            }
            else if (error.request) {
                react_hot_toast_1.default.error('Network error. Please check your connection.');
            }
            else {
                react_hot_toast_1.default.error('An unexpected error occurred');
            }
            return Promise.reject(error);
        });
    }
    async get(url, params) {
        return this.client.get(url, { params });
    }
    async post(url, data) {
        return this.client.post(url, data);
    }
    async put(url, data) {
        return this.client.put(url, data);
    }
    async patch(url, data) {
        return this.client.patch(url, data);
    }
    async delete(url) {
        return this.client.delete(url);
    }
    async upload(url, file, onProgress) {
        const formData = new FormData();
        formData.append('file', file);
        return this.client.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                if (onProgress && progressEvent.total) {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    onProgress(progress);
                }
            },
        });
    }
}
exports.api = new ApiClient();
// Helper functions for specific API calls
exports.chatApi = {
    sendMessage: (data) => exports.api.post('/chat', data),
    streamChat: (data) => exports.api.post('/chat/stream', data),
    getConversations: () => exports.api.get('/conversations'),
    getConversation: (id) => exports.api.get(`/conversations/${id}`),
    createConversation: (data) => exports.api.post('/conversations', data),
    deleteConversation: (id) => exports.api.delete(`/conversations/${id}`),
    getMessages: (conversationId) => exports.api.get(`/conversations/${conversationId}/messages`),
};
exports.documentsApi = {
    getDocuments: (params) => exports.api.get('/documents', params),
    getDocument: (id) => exports.api.get(`/documents/${id}`),
    uploadDocument: (file, onProgress) => exports.api.upload('/documents/upload', file, onProgress),
    deleteDocument: (id) => exports.api.delete(`/documents/${id}`),
    updateDocument: (id, data) => exports.api.patch(`/documents/${id}`, data),
};
exports.analyticsApi = {
    getDashboard: () => exports.api.get('/analytics/dashboard'),
    getUsage: (params) => exports.api.get('/analytics/usage', params),
    getConversationStats: (params) => exports.api.get('/analytics/conversations', params),
    getDocumentStats: (params) => exports.api.get('/analytics/documents', params),
};
exports.settingsApi = {
    getSettings: () => exports.api.get('/settings'),
    updateSettings: (data) => exports.api.patch('/settings', data),
    getModels: () => exports.api.get('/settings/models'),
    testConnection: (provider, config) => exports.api.post(`/settings/test-connection/${provider}`, config),
};
//# sourceMappingURL=api.js.map