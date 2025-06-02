import { CrawlOptions, CrawlResult, CrawlProgress } from './types';
export declare class WebCrawler {
    private browser;
    private context;
    private queue;
    private visited;
    private results;
    private robotsParser;
    private sitemapParser;
    private contentExtractor;
    private options;
    private progress;
    constructor(options: CrawlOptions);
    crawl(onProgress?: (progress: CrawlProgress) => void): Promise<CrawlResult[]>;
    private initialize;
    private cleanup;
    private crawlPage;
    private extractLinks;
    private shouldCrawl;
    private tryParseSitemap;
}
//# sourceMappingURL=crawler.d.ts.map