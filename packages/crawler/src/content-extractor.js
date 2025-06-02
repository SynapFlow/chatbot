"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentExtractor = void 0;
const cheerio = __importStar(require("cheerio"));
const jsdom_1 = require("jsdom");
const readability_1 = require("@mozilla/readability");
class ContentExtractor {
    async extract(html, url) {
        const $ = cheerio.load(html);
        // Try Readability first for main content
        let mainContent = '';
        try {
            const dom = new jsdom_1.JSDOM(html, { url });
            const reader = new readability_1.Readability(dom.window.document);
            const article = reader.parse();
            if (article && article.textContent) {
                mainContent = this.cleanText(article.textContent);
            }
        }
        catch {
            // Fallback to manual extraction
        }
        // If Readability fails, use manual extraction
        if (!mainContent) {
            mainContent = this.extractMainContent($);
        }
        // Extract metadata
        const metadata = this.extractMetadata($);
        // Extract title
        const title = this.extractTitle($, metadata);
        return {
            title,
            content: mainContent,
            metadata,
        };
    }
    extractTitle($, metadata) {
        // Priority order for title
        const title = metadata.ogTitle ||
            metadata.twitterTitle ||
            $('title').text() ||
            $('h1').first().text() ||
            '';
        return this.cleanText(title);
    }
    extractMainContent($) {
        // Remove script, style, and other non-content elements
        $('script, style, noscript, iframe, svg').remove();
        // Try to find main content areas
        const contentSelectors = [
            'main',
            'article',
            '[role="main"]',
            '#main',
            '#content',
            '.content',
            '.main',
            '.post',
            '.entry-content',
            '.article-content',
            '.page-content',
        ];
        let content = '';
        for (const selector of contentSelectors) {
            const element = $(selector);
            if (element.length > 0) {
                content = element.text();
                if (content.length > 100) {
                    break;
                }
            }
        }
        // If no main content found, extract all text
        if (!content || content.length < 100) {
            content = $('body').text();
        }
        return this.cleanText(content);
    }
    extractMetadata($) {
        const metadata = {};
        // Standard meta tags
        metadata.description = $('meta[name="description"]').attr('content') || undefined;
        metadata.keywords = $('meta[name="keywords"]').attr('content') || undefined;
        metadata.author = $('meta[name="author"]').attr('content') || undefined;
        metadata.language = $('html').attr('lang') || $('meta[name="language"]').attr('content') || undefined;
        // Open Graph tags
        metadata.ogTitle = $('meta[property="og:title"]').attr('content') || undefined;
        metadata.ogDescription = $('meta[property="og:description"]').attr('content') || undefined;
        metadata.ogImage = $('meta[property="og:image"]').attr('content') || undefined;
        // Twitter tags
        metadata.twitterTitle = $('meta[name="twitter:title"]').attr('content') || undefined;
        metadata.twitterDescription = $('meta[name="twitter:description"]').attr('content') || undefined;
        // Dates
        metadata.publishedDate =
            $('meta[property="article:published_time"]').attr('content') ||
                $('meta[name="publish_date"]').attr('content') ||
                $('time[datetime]').first().attr('datetime') ||
                undefined;
        metadata.modifiedDate =
            $('meta[property="article:modified_time"]').attr('content') ||
                $('meta[name="last-modified"]').attr('content') ||
                undefined;
        // Schema.org data
        const schemaScripts = $('script[type="application/ld+json"]');
        schemaScripts.each((_, element) => {
            try {
                const schemaData = JSON.parse($(element).html() || '{}');
                if (schemaData['@type'] === 'Article' || schemaData['@type'] === 'BlogPosting') {
                    metadata.schemaType = schemaData['@type'];
                    metadata.schemaHeadline = schemaData.headline;
                    metadata.schemaDatePublished = schemaData.datePublished;
                    metadata.schemaDateModified = schemaData.dateModified;
                    metadata.schemaAuthor = schemaData.author?.name;
                }
            }
            catch {
                // Invalid JSON, skip
            }
        });
        return metadata;
    }
    cleanText(text) {
        return text
            .replace(/\s+/g, ' ')
            .replace(/\n{3,}/g, '\n\n')
            .trim();
    }
}
exports.ContentExtractor = ContentExtractor;
//# sourceMappingURL=content-extractor.js.map