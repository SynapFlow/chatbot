export interface JobOptions {
    priority?: number;
    delay?: number;
    attempts?: number;
    backoff?: {
        type: 'fixed' | 'exponential';
        delay: number;
    };
    removeOnComplete?: number | boolean;
    removeOnFail?: number | boolean;
    jobId?: string;
    timeout?: number;
    tenantId?: string;
}
export interface JobProgress {
    current: number;
    total: number;
    message?: string;
    data?: any;
}
export interface JobResult {
    success: boolean;
    data?: any;
    error?: string;
    duration?: number;
    metadata?: Record<string, any>;
}
export interface QueueStats {
    waiting: number;
    active: number;
    completed: number;
    failed: number;
    delayed: number;
    paused: number;
}
export interface QueueHealth {
    isHealthy: boolean;
    stats: QueueStats;
    lastProcessed?: Date;
    errors: string[];
}
export interface DocumentProcessingJobData {
    documentId: string;
    tenantId: string;
    filePath: string;
    fileName: string;
    mimeType: string;
    metadata?: Record<string, any>;
}
export interface DocumentProcessingJobResult extends JobResult {
    chunks?: Array<{
        id: string;
        content: string;
        metadata: Record<string, any>;
    }>;
    totalChunks?: number;
}
export interface EmbeddingJobData {
    chunkIds: string[];
    tenantId: string;
    documentId?: string;
    model?: string;
    provider?: string;
    batchSize?: number;
}
export interface EmbeddingJobResult extends JobResult {
    processedChunks: number;
    embeddings?: Array<{
        chunkId: string;
        embedding: number[];
    }>;
}
export interface VectorSyncJobData {
    chunkIds: string[];
    tenantId: string;
    collectionName: string;
    operation: 'upsert' | 'delete';
    batchSize?: number;
}
export interface VectorSyncJobResult extends JobResult {
    processedItems: number;
    skippedItems?: number;
}
export interface WebhookJobData {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    payload?: any;
    tenantId: string;
    eventType: string;
    eventId: string;
    retryAttempts?: number;
}
export interface WebhookJobResult extends JobResult {
    statusCode?: number;
    responseTime?: number;
    responseBody?: any;
}
export interface CleanupJobData {
    type: 'documents' | 'embeddings' | 'vectors' | 'logs';
    olderThan: Date;
    tenantId?: string;
    batchSize?: number;
}
export interface CleanupJobResult extends JobResult {
    deletedCount: number;
    processedBatches: number;
}
export interface ExportJobData {
    tenantId: string;
    type: 'documents' | 'conversations' | 'analytics';
    format: 'json' | 'csv' | 'xlsx';
    filters?: Record<string, any>;
    outputPath?: string;
    email?: string;
}
export interface ExportJobResult extends JobResult {
    filePath?: string;
    fileSize?: number;
    recordCount?: number;
}
export type AnyJobData = DocumentProcessingJobData | EmbeddingJobData | VectorSyncJobData | WebhookJobData | CleanupJobData | ExportJobData;
export type AnyJobResult = DocumentProcessingJobResult | EmbeddingJobResult | VectorSyncJobResult | WebhookJobResult | CleanupJobResult | ExportJobResult;
export declare const QUEUE_NAMES: {
    readonly DOCUMENT_PROCESSING: "document-processing";
    readonly EMBEDDING_GENERATION: "embedding-generation";
    readonly VECTOR_SYNC: "vector-sync";
    readonly WEBHOOKS: "webhooks";
    readonly CLEANUP: "cleanup";
    readonly EXPORT: "export";
};
export type QueueName = typeof QUEUE_NAMES[keyof typeof QUEUE_NAMES];
//# sourceMappingURL=types.d.ts.map