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
exports.VectorSyncProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const base_processor_1 = require("./base.processor");
const types_1 = require("../types");
let VectorSyncProcessor = (() => {
    let _classDecorators = [(0, common_1.Injectable)(), (0, bull_1.Processor)(types_1.QUEUE_NAMES.VECTOR_SYNC)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = base_processor_1.BaseProcessor;
    let _instanceExtraInitializers = [];
    let _process_decorators;
    var VectorSyncProcessor = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _process_decorators = [(0, bull_1.Process)('sync-vectors')];
            __esDecorate(this, null, _process_decorators, { kind: "method", name: "process", static: false, private: false, access: { has: obj => "process" in obj, get: obj => obj.process }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            VectorSyncProcessor = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        constructor() {
            super('VectorSyncProcessor');
            __runInitializers(this, _instanceExtraInitializers);
        }
        async process(job) {
            return this.executeWithErrorHandling(job, async () => {
                this.validateJobData(job, ['chunkIds', 'tenantId', 'collectionName', 'operation']);
                const { chunkIds, tenantId, collectionName, operation, batchSize = 50, } = job.data;
                await this.updateProgress(job, {
                    current: 0,
                    total: chunkIds.length,
                    message: `Starting vector ${operation} operation`,
                });
                let processedItems = 0;
                let skippedItems = 0;
                if (operation === 'upsert') {
                    const result = await this.upsertVectors(job, chunkIds, tenantId, collectionName, batchSize);
                    processedItems = result.processed;
                    skippedItems = result.skipped;
                }
                else if (operation === 'delete') {
                    processedItems = await this.deleteVectors(job, chunkIds, collectionName, batchSize);
                }
                else {
                    throw new Error(`Unsupported operation: ${operation}`);
                }
                await this.updateProgress(job, {
                    current: chunkIds.length,
                    total: chunkIds.length,
                    message: `Vector ${operation} operation completed`,
                });
                return this.createSuccessResult({
                    processedItems,
                    skippedItems,
                }, {
                    tenantId,
                    collectionName,
                    operation,
                    totalItems: chunkIds.length,
                    processingTime: Date.now() - job.timestamp,
                });
            }, 'Vector sync');
        }
        async upsertVectors(job, chunkIds, tenantId, collectionName, batchSize) {
            let processed = 0;
            let skipped = 0;
            // Fetch chunk data with embeddings
            const chunks = await this.fetchChunksWithEmbeddings(chunkIds, tenantId);
            // Filter out chunks without embeddings
            const chunksWithEmbeddings = chunks.filter(chunk => chunk.embedding);
            skipped = chunks.length - chunksWithEmbeddings.length;
            if (skipped > 0) {
                this.logger.warn(`Skipping ${skipped} chunks without embeddings in job ${job.id}`);
            }
            // Process in batches
            const batches = this.createBatches(chunksWithEmbeddings, batchSize);
            for (let i = 0; i < batches.length; i++) {
                const batch = batches[i];
                await this.updateProgress(job, {
                    current: processed,
                    total: chunkIds.length,
                    message: `Upserting batch ${i + 1}/${batches.length}`,
                });
                await this.upsertBatch(batch, collectionName, tenantId);
                processed += batch.length;
            }
            return { processed, skipped };
        }
        async deleteVectors(job, chunkIds, collectionName, batchSize) {
            let processed = 0;
            // Process in batches
            const batches = this.createBatches(chunkIds, batchSize);
            for (let i = 0; i < batches.length; i++) {
                const batch = batches[i];
                await this.updateProgress(job, {
                    current: processed,
                    total: chunkIds.length,
                    message: `Deleting batch ${i + 1}/${batches.length}`,
                });
                await this.deleteBatch(batch, collectionName);
                processed += batch.length;
            }
            return processed;
        }
        async fetchChunksWithEmbeddings(chunkIds, tenantId) {
            return this.withRetry(async () => {
                this.logger.debug(`Fetching ${chunkIds.length} chunks with embeddings for tenant ${tenantId}`);
                // In a real implementation, fetch from database with embeddings
                // Simulate database fetch
                await new Promise(resolve => setTimeout(resolve, 100));
                return chunkIds.map(id => ({
                    id,
                    content: `Content for chunk ${id}`,
                    embedding: new Array(1536).fill(0).map(() => Math.random()), // Simulate embedding
                    metadata: {
                        chunkId: id,
                        tenantId,
                    },
                }));
            });
        }
        async upsertBatch(chunks, collectionName, tenantId) {
            return this.withRetry(async () => {
                // Import vector store service dynamically
                const { VectorStoreService } = await Promise.resolve().then(() => __importStar(require('@chatbot-rag/vector-store')));
                const vectorStoreService = new VectorStoreService(null); // Would be injected
                const documents = chunks.map(chunk => ({
                    id: chunk.id,
                    vector: chunk.embedding,
                    content: chunk.content,
                    metadata: chunk.metadata,
                    tenantId,
                }));
                // In a real implementation:
                // await vectorStoreService.upsert(collectionName, documents);
                this.logger.debug(`Upserted ${chunks.length} vectors to collection ${collectionName}`);
                // Simulate async operation
                await new Promise(resolve => setTimeout(resolve, 50));
            });
        }
        async deleteBatch(chunkIds, collectionName) {
            return this.withRetry(async () => {
                // Import vector store service dynamically
                const { VectorStoreService } = await Promise.resolve().then(() => __importStar(require('@chatbot-rag/vector-store')));
                const vectorStoreService = new VectorStoreService(null); // Would be injected
                // In a real implementation:
                // await vectorStoreService.delete(collectionName, chunkIds);
                this.logger.debug(`Deleted ${chunkIds.length} vectors from collection ${collectionName}`);
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
    return VectorSyncProcessor = _classThis;
})();
exports.VectorSyncProcessor = VectorSyncProcessor;
//# sourceMappingURL=vector-sync.processor.js.map