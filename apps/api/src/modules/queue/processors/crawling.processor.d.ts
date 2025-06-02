import { Job } from 'bull';
import { LoggerService } from '../../../common/logger/logger.service';
export declare class CrawlingProcessor {
    private logger;
    constructor(logger: LoggerService);
    handleWebsiteCrawl(job: Job<{
        sourceId: string;
        projectId: string;
        config: any;
    }>): Promise<void>;
    private processCrawlResults;
}
//# sourceMappingURL=crawling.processor.d.ts.map