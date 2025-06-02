import { Job } from 'bull';
import { BaseProcessor } from './base.processor';
import { EmbeddingJobData, EmbeddingJobResult } from '../types';
export declare class EmbeddingProcessor extends BaseProcessor<EmbeddingJobData, EmbeddingJobResult> {
    constructor();
    process(job: Job<EmbeddingJobData>): Promise<EmbeddingJobResult>;
    private fetchChunks;
    private generateEmbeddingsBatch;
    private saveEmbeddings;
    private scheduleVectorSync;
    private createBatches;
}
//# sourceMappingURL=embedding.processor.d.ts.map