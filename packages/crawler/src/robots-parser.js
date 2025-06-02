"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RobotsParser = void 0;
const robots_parser_1 = __importDefault(require("robots-parser"));
const got_1 = __importDefault(require("got"));
class RobotsParser {
    parser = null;
    userAgent;
    sitemapUrls = [];
    constructor(userAgent) {
        this.userAgent = userAgent;
    }
    async parse(robotsUrl) {
        try {
            const response = await (0, got_1.default)(robotsUrl, {
                timeout: { request: 5000 },
                retry: { limit: 1 },
            });
            const robotsTxt = response.body;
            this.parser = (0, robots_parser_1.default)(robotsUrl, robotsTxt);
            // Extract sitemap URLs
            const lines = robotsTxt.split('\n');
            for (const line of lines) {
                const trimmedLine = line.trim().toLowerCase();
                if (trimmedLine.startsWith('sitemap:')) {
                    const sitemapUrl = line.substring(8).trim();
                    if (sitemapUrl) {
                        this.sitemapUrls.push(sitemapUrl);
                    }
                }
            }
        }
        catch (error) {
            // If robots.txt doesn't exist or can't be fetched, allow all
            this.parser = null;
        }
    }
    isAllowed(url) {
        if (!this.parser) {
            return true; // No robots.txt means everything is allowed
        }
        return this.parser.isAllowed(url, this.userAgent) ?? true;
    }
    getCrawlDelay() {
        if (!this.parser) {
            return 0;
        }
        return this.parser.getCrawlDelay(this.userAgent) ?? 0;
    }
}
exports.RobotsParser = RobotsParser;
//# sourceMappingURL=robots-parser.js.map