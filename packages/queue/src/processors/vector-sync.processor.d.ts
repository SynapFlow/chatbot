import { Job } from 'bull';
import { BaseProcessor } from './base.processor';
import { VectorSyncJobData, VectorSyncJobResult } from '../types';
export declare class VectorSyncProcessor extends BaseProcessor<VectorSyncJobData, VectorSyncJobResult> {
    constructor();
    process(job: Job<VectorSyncJobData>): Promise<VectorSyncJobResult>;
    private upsertVectors;
    private deleteVectors;
    private fetchChunksWithEmbeddings;
    private upsertBatch;
    private deleteBatch;
    private createBatches;
}
//# sourceMappingURL=vector-sync.processor.d.ts.map