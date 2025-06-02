import { Job } from 'bull';
import { LoggerService } from '../../../common/logger/logger.service';
import { Queue } from 'bull';
export declare class DocumentProcessor {
    private logger;
    private embeddingQueue;
    constructor(logger: LoggerService, embeddingQueue: Queue);
    handleDocumentProcessing(job: Job<{
        documentId: string;
        sourceId: string;
        projectId: string;
        fileBuffer: string;
        filename: string;
        mimeType?: string;
    }>): Promise<void>;
    private estimateTokenCount;
}
//# sourceMappingURL=document.processor.d.ts.map