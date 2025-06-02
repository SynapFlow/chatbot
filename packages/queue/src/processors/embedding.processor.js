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
exports.EmbeddingProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const base_processor_1 = require("./base.processor");
const types_1 = require("../types");
let EmbeddingProcessor = (() => {
    let _classDecorators = [(0, common_1.Injectable)(), (0, bull_1.Processor)(types_1.QUEUE_NAMES.EMBEDDING_GENERATION)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = base_processor_1.BaseProcessor;
    let _instanceExtraInitializers = [];
    let _process_decorators;
    var EmbeddingProcessor = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _process_decorators = [(0, bull_1.Process)('generate-embeddings')];
            __esDecorate(this, null, _process_decorators, { kind: "method", name: "process", static: false, private: false, access: { has: obj => "process" in obj, get: obj => obj.process }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            EmbeddingProcessor = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        constructor() {
            super('EmbeddingProcessor');
            __runInitializers(this, _instanceExtraInitializers);
        }
        async process(job) {
            return this.executeWithErrorHandling(job, async () => {
                this.validateJobData(job, ['chunkIds', 'tenantId']);
                const { chunkIds, tenantId, documentId, model = 'text-embedding-ada-002', provider = 'openai', batchSize = 10, } = job.data;
                await this.updateProgress(job, {
                    current: 0,
                    total: chunkIds.length,
                    message: 'Starting embedding generation',
                });
                // Step 1: Fetch chunk contents
                await this.updateProgress(job, {
                    current: 0,
                    total: chunkIds.length,
                    message: 'Fetching chunk contents',
                });
                const chunks = await this.fetchChunks(chunkIds, tenantId);
                // Step 2: Generate embeddings in batches
                const embeddings = [];
                const batches = this.createBatches(chunks, batchSize);
                for (let i = 0; i < batches.length; i++) {
                    const batch = batches[i];
                    await this.updateProgress(job, {
                        current: i * batchSize,
                        total: chunkIds.length,
                        message: `Processing batch ${i + 1}/${batches.length}`,
                    });
                    const batchEmbeddings = await this.generateEmbeddingsBatch(batch, model, provider);
                    embeddings.push(...batchEmbeddings);
                    // Save embeddings to database
                    await this.saveEmbeddings(batchEmbeddings, tenantId);
                    // Schedule vector store sync
                    await this.scheduleVectorSync(batchEmbeddings.map(e => e.chunkId), tenantId);
                }
                await this.updateProgress(job, {
                    current: chunkIds.length,
                    total: chunkIds.length,
                    message: 'Embedding generation completed',
                });
                return this.createSuccessResult({
                    processedChunks: embeddings.length,
                    embeddings,
                }, {
                    tenantId,
                    documentId,
                    model,
                    provider,
                    batchCount: batches.length,
                    processingTime: Date.now() - job.timestamp,
                });
            }, 'Embedding generation');
        }
        async fetchChunks(chunkIds, tenantId) {
            return this.withRetry(async () => {
                // In a real implementation, fetch from database
                this.logger.debug(`Fetching ${chunkIds.length} chunks for tenant ${tenantId}`);
                // Simulate database fetch
                await new Promise(resolve => setTimeout(resolve, 100));
                return chunkIds.map(id => ({
                    id,
                    content: `Sample content for chunk ${id}`, // This would come from DB
                }));
            });
        }
        async generateEmbeddingsBatch(chunks, model, provider) {
            return this.withRetry(async () => {
                // Import embedding service dynamically
                const { EmbeddingService } = await Promise.resolve().then(() => __importStar(require('@chatbot-rag/embeddings')));
                const embeddingService = new EmbeddingService();
                const texts = chunks.map(chunk => chunk.content);
                const response = await embeddingService.embed(texts, {
                    model,
                    provider,
                });
                return chunks.map((chunk, index) => ({
                    chunkId: chunk.id,
                    embedding: response.embeddings[index],
                }));
            });
        }
        async saveEmbeddings(embeddings, tenantId) {
            return this.withRetry(async () => {
                this.logger.debug(`Saving ${embeddings.length} embeddings for tenant ${tenantId}`);
                // In a real implementation, save to database
                // This would update the chunks table with embedding data
                // Simulate async operation
                await new Promise(resolve => setTimeout(resolve, 50));
            });
        }
        async scheduleVectorSync(chunkIds, tenantId) {
            return this.withRetry(async () => {
                this.logger.debug(`Scheduling vector sync for ${chunkIds.length} chunks`);
                // In a real implementation, schedule vector sync job
                // await this.queueService.addVectorSyncJob({
                //   chunkIds,
                //   tenantId,
                //   collectionName: `tenant_${tenantId}`,
                //   operation: 'upsert',
                // });
                // Simulate async operation
                await new Promise(resolve => setTimeout(resolve, 25));
            });
        }
        createBatches(items, batchSize) {
            const batches = [];
            for (let i = 0; i < items.length; i += batchSize) {
                batches.push(items.slice(i, i + batchSize));
            }
            return batches;
        }
    };
    return EmbeddingProcessor = _classThis;
})();
exports.EmbeddingProcessor = EmbeddingProcessor;
//# sourceMappingURL=embedding.processor.js.map