import { OnModuleDestroy } from '@nestjs/common';
import { Queue, Job } from 'bull';
import { JobOptions, QueueStats, QueueHealth, QueueName, AnyJobData } from './types';
export declare class QueueService implements OnModuleDestroy {
    private readonly documentProcessingQueue;
    private readonly embeddingQueue;
    private readonly vectorSyncQueue;
    private readonly webhookQueue;
    private readonly cleanupQueue;
    private readonly exportQueue;
    private readonly logger;
    private queues;
    constructor(documentProcessingQueue: Queue, embeddingQueue: Queue, vectorSyncQueue: Queue, webhookQueue: Queue, cleanupQueue: Queue, exportQueue: Queue);
    onModuleDestroy(): Promise<void>;
    addJob<T extends AnyJobData>(queueName: QueueName, jobName: string, data: T, options?: JobOptions): Promise<Job<T>>;
    getJob(queueName: QueueName, jobId: string): Promise<Job | null>;
    removeJob(queueName: QueueName, jobId: string): Promise<void>;
    retryJob(queueName: QueueName, jobId: string): Promise<void>;
    getJobsByState(queueName: QueueName, state: 'waiting' | 'active' | 'completed' | 'failed' | 'delayed', start?: number, end?: number): Promise<Job[]>;
    getQueueStats(queueName: QueueName): Promise<QueueStats>;
    getAllStats(): Promise<Record<QueueName, QueueStats>>;
    getQueueHealth(queueName: QueueName): Promise<QueueHealth>;
    pauseQueue(queueName: QueueName): Promise<void>;
    resumeQueue(queueName: QueueName): Promise<void>;
    cleanQueue(queueName: QueueName, grace?: number, status?: 'completed' | 'failed'): Promise<void>;
    drainQueue(queueName: QueueName): Promise<void>;
    getQueueNames(): QueueName[];
    addDocumentProcessingJob(data: import('./types').DocumentProcessingJobData, options?: JobOptions): Promise<Job<import("./types").DocumentProcessingJobData>>;
    addEmbeddingJob(data: import('./types').EmbeddingJobData, options?: JobOptions): Promise<Job<import("./types").EmbeddingJobData>>;
    addVectorSyncJob(data: import('./types').VectorSyncJobData, options?: JobOptions): Promise<Job<import("./types").VectorSyncJobData>>;
    addWebhookJob(data: import('./types').WebhookJobData, options?: JobOptions): Promise<Job<import("./types").WebhookJobData>>;
    addCleanupJob(data: import('./types').CleanupJobData, options?: JobOptions): Promise<Job<import("./types").CleanupJobData>>;
    addExportJob(data: import('./types').ExportJobData, options?: JobOptions): Promise<Job<import("./types").ExportJobData>>;
    private getQueue;
    private isQueueHealthy;
}
//# sourceMappingURL=queue.service.d.ts.map