export interface ExtractedContent {
    title: string;
    content: string;
    metadata: {
        description?: string;
        keywords?: string;
        author?: string;
        publishedDate?: string;
        modifiedDate?: string;
        language?: string;
        ogTitle?: string;
        ogDescription?: string;
        ogImage?: string;
        twitterTitle?: string;
        twitterDescription?: string;
        [key: string]: any;
    };
}
export declare class ContentExtractor {
    extract(html: string, url: string): Promise<ExtractedContent>;
    private extractTitle;
    private extractMainContent;
    private extractMetadata;
    private cleanText;
}
//# sourceMappingURL=content-extractor.d.ts.map