import { SitemapEntry } from './types';
export declare class SitemapParser {
    parse(sitemapUrl: string): Promise<SitemapEntry[]>;
    private parseSitemapIndex;
    private parseUrlSet;
}
//# sourceMappingURL=sitemap-parser.d.ts.map