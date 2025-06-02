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
exports.DocumentProcessingProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const base_processor_1 = require("./base.processor");
const types_1 = require("../types");
let DocumentProcessingProcessor = (() => {
    let _classDecorators = [(0, common_1.Injectable)(), (0, bull_1.Processor)(types_1.QUEUE_NAMES.DOCUMENT_PROCESSING)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = base_processor_1.BaseProcessor;
    let _instanceExtraInitializers = [];
    let _process_decorators;
    var DocumentProcessingProcessor = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _process_decorators = [(0, bull_1.Process)('process-document')];
            __esDecorate(this, null, _process_decorators, { kind: "method", name: "process", static: false, private: false, access: { has: obj => "process" in obj, get: obj => obj.process }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            DocumentProcessingProcessor = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        constructor() {
            super('DocumentProcessingProcessor');
            __runInitializers(this, _instanceExtraInitializers);
        }
        async process(job) {
            return this.executeWithErrorHandling(job, async () => {
                this.validateJobData(job, ['documentId', 'tenantId', 'filePath', 'fileName', 'mimeType']);
                const { documentId, tenantId, filePath, fileName, mimeType, metadata = {} } = job.data;
                await this.updateProgress(job, {
                    current: 0,
                    total: 100,
                    message: 'Starting document processing',
                });
                // Step 1: Parse document content
                await this.updateProgress(job, {
                    current: 10,
                    total: 100,
                    message: 'Parsing document content',
                });
                const content = await this.parseDocument(filePath, mimeType);
                // Step 2: Chunk the content
                await this.updateProgress(job, {
                    current: 40,
                    total: 100,
                    message: 'Chunking document content',
                });
                const chunks = await this.chunkContent(content, {
                    documentId,
                    fileName,
                    mimeType,
                    ...metadata,
                });
                // Step 3: Save chunks to database
                await this.updateProgress(job, {
                    current: 70,
                    total: 100,
                    message: 'Saving chunks to database',
                });
                await this.saveChunks(chunks, tenantId, documentId);
                // Step 4: Trigger embedding generation
                await this.updateProgress(job, {
                    current: 90,
                    total: 100,
                    message: 'Scheduling embedding generation',
                });
                await this.scheduleEmbeddingGeneration(chunks.map(c => c.id), tenantId, documentId);
                await this.updateProgress(job, {
                    current: 100,
                    total: 100,
                    message: 'Document processing completed',
                });
                return this.createSuccessResult({
                    chunks: chunks.map(chunk => ({
                        id: chunk.id,
                        content: chunk.content,
                        metadata: chunk.metadata,
                    })),
                    totalChunks: chunks.length,
                }, {
                    documentId,
                    tenantId,
                    processingTime: Date.now() - job.timestamp,
                });
            }, 'Document processing');
        }
        async parseDocument(filePath, mimeType) {
            return this.withRetry(async () => {
                // Import parser service dynamically to avoid circular dependencies
                const { ParserService } = await Promise.resolve().then(() => __importStar(require('@chatbot-rag/parser')));
                const parserService = new ParserService();
                const result = await parserService.parseFile(filePath);
                return result.content;
            });
        }
        async chunkContent(content, metadata) {
            return this.withRetry(async () => {
                // Import chunker service dynamically
                const { ChunkerService } = await Promise.resolve().then(() => __importStar(require('@chatbot-rag/chunker')));
                const chunkerService = new ChunkerService();
                const chunks = await chunkerService.chunkText(content, {
                    autoDetectStrategy: true,
                    metadata,
                });
                return chunks.map(chunk => ({
                    id: chunk.id,
                    content: chunk.content,
                    metadata: {
                        ...chunk.metadata,
                        ...metadata,
                    },
                }));
            });
        }
        async saveChunks(chunks, tenantId, documentId) {
            return this.withRetry(async () => {
                // This would typically use a database service
                // For now, we'll simulate the operation
                this.logger.debug(`Saving ${chunks.length} chunks for document ${documentId} in tenant ${tenantId}`);
                // In a real implementation, you would:
                // 1. Insert chunks into the database
                // 2. Update document status
                // 3. Store chunk metadata
                // Simulate async operation
                await new Promise(resolve => setTimeout(resolve, 100));
            });
        }
        async scheduleEmbeddingGeneration(chunkIds, tenantId, documentId) {
            return this.withRetry(async () => {
                // Import queue service dynamically
                const { QueueService } = await Promise.resolve().then(() => __importStar(require('../queue.service')));
                // This would typically inject the queue service
                // For now, we'll simulate scheduling the job
                this.logger.debug(`Scheduling embedding generation for ${chunkIds.length} chunks`);
                // In a real implementation, you would:
                // await this.queueService.addEmbeddingJob({
                //   chunkIds,
                //   tenantId,
                //   documentId,
                // });
                // Simulate async operation
                await new Promise(resolve => setTimeout(resolve, 50));
            });
        }
    };
    return DocumentProcessingProcessor = _classThis;
})();
exports.DocumentProcessingProcessor = DocumentProcessingProcessor;
//# sourceMappingURL=document-processing.processor.js.map