"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SitemapParser = void 0;
const got_1 = __importDefault(require("got"));
const xml2js_1 = require("xml2js");
class SitemapParser {
    async parse(sitemapUrl) {
        try {
            const response = await (0, got_1.default)(sitemapUrl, {
                timeout: { request: 10000 },
                retry: { limit: 2 },
            });
            const xml = response.body;
            const parsed = await (0, xml2js_1.parseStringPromise)(xml);
            // Check if it's a sitemap index
            if (parsed.sitemapindex) {
                return await this.parseSitemapIndex(parsed.sitemapindex);
            }
            // Parse regular sitemap
            if (parsed.urlset && parsed.urlset.url) {
                return this.parseUrlSet(parsed.urlset.url);
            }
            return [];
        }
        catch (error) {
            throw new Error(`Failed to parse sitemap: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async parseSitemapIndex(sitemapindex) {
        const entries = [];
        if (sitemapindex.sitemap) {
            for (const sitemap of sitemapindex.sitemap) {
                if (sitemap.loc && sitemap.loc[0]) {
                    try {
                        const subEntries = await this.parse(sitemap.loc[0]);
                        entries.push(...subEntries);
                    }
                    catch {
                        // Skip failed sub-sitemaps
                    }
                }
            }
        }
        return entries;
    }
    parseUrlSet(urls) {
        const entries = [];
        for (const url of urls) {
            if (url.loc && url.loc[0]) {
                const entry = {
                    url: url.loc[0],
                };
                if (url.lastmod && url.lastmod[0]) {
                    entry.lastmod = url.lastmod[0];
                }
                if (url.changefreq && url.changefreq[0]) {
                    entry.changefreq = url.changefreq[0];
                }
                if (url.priority && url.priority[0]) {
                    entry.priority = parseFloat(url.priority[0]);
                }
                entries.push(entry);
            }
        }
        return entries;
    }
}
exports.SitemapParser = SitemapParser;
//# sourceMappingURL=sitemap-parser.js.map