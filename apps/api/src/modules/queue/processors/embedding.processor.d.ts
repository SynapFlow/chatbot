import { Job } from 'bull';
import { LoggerService } from '../../../common/logger/logger.service';
import { ConfigService } from '@nestjs/config';
export declare class EmbeddingProcessor {
    private logger;
    private configService;
    constructor(logger: LoggerService, configService: ConfigService);
    handleEmbeddingGeneration(job: Job<{
        documentId: string;
        projectId: string;
        content: string;
    }>): Promise<void>;
    private detectChunkingStrategy;
    private generateEmbeddings;
}
//# sourceMappingURL=embedding.processor.d.ts.map