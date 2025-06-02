import { Job } from 'bull';
import { BaseProcessor } from './base.processor';
import { WebhookJobData, WebhookJobResult } from '../types';
export declare class WebhookProcessor extends BaseProcessor<WebhookJobData, WebhookJobResult> {
    constructor();
    process(job: Job<WebhookJobData>): Promise<WebhookJobResult>;
    private sendWebhook;
    private logWebhookAttempt;
    protected withRetry<T>(operation: () => Promise<T>, maxAttempts?: number, baseDelay?: number): Promise<T>;
}
//# sourceMappingURL=webhook.processor.d.ts.map