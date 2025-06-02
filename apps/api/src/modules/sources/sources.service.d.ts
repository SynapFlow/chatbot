import { Queue } from 'bull';
import { Source } from '@chatbot-rag/database';
interface WebsiteSourceConfig {
    name?: string;
    url: string;
    crawlDepth?: number;
    maxPages?: number;
    includePatterns?: string[];
    excludePatterns?: string[];
}
export declare class SourcesService {
    private crawlingQueue;
    constructor(crawlingQueue: Queue);
    createWebsiteSource(projectId: string, config: WebsiteSourceConfig): Promise<Source>;
    syncSource(sourceId: string): Promise<void>;
}
export {};
//# sourceMappingURL=sources.service.d.ts.map