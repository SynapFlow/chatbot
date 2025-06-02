export declare class RobotsParser {
    private parser;
    private userAgent;
    sitemapUrls: string[];
    constructor(userAgent: string);
    parse(robotsUrl: string): Promise<void>;
    isAllowed(url: string): boolean;
    getCrawlDelay(): number;
}
//# sourceMappingURL=robots-parser.d.ts.map