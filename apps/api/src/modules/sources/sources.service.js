"use strict";
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourcesService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("@chatbot-rag/database");
let SourcesService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SourcesService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SourcesService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        crawlingQueue;
        constructor(crawlingQueue) {
            this.crawlingQueue = crawlingQueue;
        }
        async createWebsiteSource(projectId, config) {
            const source = await database_1.prisma.source.create({
                data: {
                    projectId,
                    type: database_1.SourceTypeEnum.WEBSITE,
                    name: config.name || new URL(config.url).hostname,
                    config: {
                        url: config.url,
                        crawlDepth: config.crawlDepth || 3,
                        maxPages: config.maxPages || 100,
                        includePatterns: config.includePatterns || [],
                        excludePatterns: config.excludePatterns || [],
                    },
                    metadata: {},
                },
            });
            // Queue crawling job
            await this.crawlingQueue.add('crawl-website', {
                sourceId: source.id,
                projectId,
                config: source.config,
            });
            return source;
        }
        async syncSource(sourceId) {
            const source = await database_1.prisma.source.findUnique({
                where: { id: sourceId },
            });
            if (!source) {
                throw new Error('Source not found');
            }
            switch (source.type) {
                case database_1.SourceTypeEnum.WEBSITE:
                    await this.crawlingQueue.add('crawl-website', {
                        sourceId: source.id,
                        projectId: source.projectId,
                        config: source.config,
                    });
                    break;
                case database_1.SourceTypeEnum.DOCUMENT:
                    // Handle document sync
                    break;
                case database_1.SourceTypeEnum.INTEGRATION:
                    // Handle integration sync
                    break;
            }
        }
    };
    return SourcesService = _classThis;
})();
exports.SourcesService = SourcesService;
//# sourceMappingURL=sources.service.js.map