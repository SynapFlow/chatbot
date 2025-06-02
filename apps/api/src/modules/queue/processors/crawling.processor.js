"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrawlingProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
let CrawlingProcessor = (() => {
    let _classDecorators = [(0, bull_1.Processor)('crawling'), (0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _handleWebsiteCrawl_decorators;
    var CrawlingProcessor = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _handleWebsiteCrawl_decorators = [(0, bull_1.Process)('crawl-website')];
            __esDecorate(this, null, _handleWebsiteCrawl_decorators, { kind: "method", name: "handleWebsiteCrawl", static: false, private: false, access: { has: obj => "handleWebsiteCrawl" in obj, get: obj => obj.handleWebsiteCrawl }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            CrawlingProcessor = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        logger = __runInitializers(this, _instanceExtraInitializers);
        constructor(logger) {
            this.logger = logger;
            this.logger.setContext('CrawlingProcessor');
        }
        async handleWebsiteCrawl(job) {
            // TODO: Re-enable when @chatbot-rag packages are available
            throw new Error('Crawling functionality temporarily disabled - @chatbot-rag packages not available');
            /*
            const { sourceId, projectId, config } = job.data;
        
            this.logger.log(`Starting website crawl for source ${sourceId}`);
        
            // Create job record
            const crawlJob = await prisma.job.create({
              data: {
                projectId,
                type: 'website_crawl',
                status: JobStatusEnum.PROCESSING,
                config: {
                  sourceId,
                  ...config,
                },
              },
            });
        
            try {
              // Update job start time
              await prisma.job.update({
                where: { id: crawlJob.id },
                data: {
                  startedAt: new Date(),
                },
              });
        
              // Initialize crawler
              const crawler = new WebCrawler({
                url: config.url,
                maxDepth: config.crawlDepth || 3,
                maxPages: config.maxPages || 100,
                includePatterns: config.includePatterns || [],
                excludePatterns: config.excludePatterns || [],
                respectRobotsTxt: true,
                waitTime: 1000,
                timeout: 30000,
              });
        
              // Start crawling
              const results = await crawler.crawl((progress) => {
                // Update job progress
                job.progress(Math.round((progress.crawledPages / progress.totalPages) * 100));
              });
        
              // Process results
              await this.processCrawlResults(sourceId, results);
        
              // Update source last synced
              await prisma.source.update({
                where: { id: sourceId },
                data: {
                  lastSyncedAt: new Date(),
                  metadata: {
                    lastCrawl: {
                      pagesFound: results.length,
                      successfulPages: results.filter(r => !r.error).length,
                      failedPages: results.filter(r => r.error).length,
                    },
                  },
                },
              });
        
              // Mark job as completed
              await prisma.job.update({
                where: { id: crawlJob.id },
                data: {
                  status: JobStatusEnum.COMPLETED,
                  completedAt: new Date(),
                  result: {
                    pagesProcessed: results.length,
                    successCount: results.filter(r => !r.error).length,
                    errorCount: results.filter(r => r.error).length,
                  },
                },
              });
        
              this.logger.log(`Completed website crawl for source ${sourceId}`);
            } catch (error) {
              this.logger.error(`Failed to crawl website for source ${sourceId}`, error);
        
              // Mark job as failed
              await prisma.job.update({
                where: { id: crawlJob.id },
                data: {
                  status: JobStatusEnum.FAILED,
                  completedAt: new Date(),
                  error: error instanceof Error ? error.message : String(error),
                },
              });
        
              throw error;
            }
            */
        }
        async processCrawlResults(sourceId, results) {
            // TODO: Re-enable when @chatbot-rag packages are available
            throw new Error('processCrawlResults temporarily disabled');
            /*
            // Delete existing documents for this source
            await prisma.document.deleteMany({
              where: { sourceId },
            });
        
            // Create new documents
            for (const result of results) {
              if (!result.error && result.content) {
                await prisma.document.create({
                  data: {
                    sourceId,
                    title: result.title || result.url,
                    content: result.content,
                    url: result.url,
                    metadata: {
                      ...result.metadata,
                      contentType: result.contentType,
                      statusCode: result.statusCode,
                      crawledAt: result.crawledAt,
                    },
                  },
                });
              }
            }
            */
        }
    };
    return CrawlingProcessor = _classThis;
})();
exports.CrawlingProcessor = CrawlingProcessor;
//# sourceMappingURL=crawling.processor.js.map