import { Job } from 'bull';
import { BaseProcessor } from './base.processor';
import { DocumentProcessingJobData, DocumentProcessingJobResult } from '../types';
export declare class DocumentProcessingProcessor extends BaseProcessor<DocumentProcessingJobData, DocumentProcessingJobResult> {
    constructor();
    process(job: Job<DocumentProcessingJobData>): Promise<DocumentProcessingJobResult>;
    private parseDocument;
    private chunkContent;
    private saveChunks;
    private scheduleEmbeddingGeneration;
}
//# sourceMappingURL=document-processing.processor.d.ts.map