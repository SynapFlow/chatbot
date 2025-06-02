import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { JobProgress, JobResult } from '../types';
export declare abstract class BaseProcessor<TData = any, TResult = any> {
    protected readonly logger: Logger;
    constructor(loggerContext: string);
    abstract process(job: Job<TData>): Promise<TResult>;
    protected updateProgress(job: Job<TData>, progress: JobProgress): Promise<void>;
    protected createSuccessResult(data?: any, metadata?: Record<string, any>): JobResult;
    protected createErrorResult(error: string | Error, data?: any, metadata?: Record<string, any>): JobResult;
    protected executeWithErrorHandling<T>(job: Job<TData>, operation: () => Promise<T>, context: string): Promise<T>;
    protected validateJobData(job: Job<TData>, requiredFields: string[]): void;
    protected getTenantId(job: Job<TData>): string;
    protected withRetry<T>(operation: () => Promise<T>, maxAttempts?: number, delay?: number): Promise<T>;
}
//# sourceMappingURL=base.processor.d.ts.map