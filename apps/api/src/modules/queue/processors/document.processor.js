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
exports.DocumentProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
let DocumentProcessor = (() => {
    let _classDecorators = [(0, bull_1.Processor)('document-processing'), (0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _handleDocumentProcessing_decorators;
    var DocumentProcessor = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _handleDocumentProcessing_decorators = [(0, bull_1.Process)('process-document')];
            __esDecorate(this, null, _handleDocumentProcessing_decorators, { kind: "method", name: "handleDocumentProcessing", static: false, private: false, access: { has: obj => "handleDocumentProcessing" in obj, get: obj => obj.handleDocumentProcessing }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            DocumentProcessor = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        logger = __runInitializers(this, _instanceExtraInitializers);
        embeddingQueue;
        constructor(logger, embeddingQueue) {
            this.logger = logger;
            this.embeddingQueue = embeddingQueue;
            this.logger.setContext('DocumentProcessor');
        }
        async handleDocumentProcessing(job) {
            // TODO: Re-enable when @chatbot-rag packages are available
            throw new Error('Document processing functionality temporarily disabled - @chatbot-rag packages not available');
            /*
            const { documentId, sourceId, projectId, fileBuffer, filename, mimeType } = job.data;
        
            this.logger.log(`Starting document processing for ${filename}`);
        
            // Create job record
            const processJob = await prisma.job.create({
              data: {
                projectId,
                type: 'document_process',
                status: JobStatusEnum.PROCESSING,
                config: {
                  documentId,
                  filename,
                  mimeType,
                },
              },
            });
        
            try {
              // Update job start time
              await prisma.job.update({
                where: { id: processJob.id },
                data: {
                  startedAt: new Date(),
                },
              });
        
              // Convert base64 back to buffer
              const buffer = Buffer.from(fileBuffer, 'base64');
        
              // Parse the document
              const parseResult = await ParserFactory.parse(buffer, filename, {
                extractMetadata: true,
                ocrEnabled: true,
                language: 'eng',
              });
        
              if (parseResult.error) {
                throw new Error(parseResult.error);
              }
        
              // Update document with parsed content
              await prisma.document.update({
                where: { id: documentId },
                data: {
                  content: parseResult.content,
                  metadata: {
                    ...parseResult.metadata,
                    originalFilename: filename,
                    parsedAt: new Date(),
                  },
                  tokenCount: this.estimateTokenCount(parseResult.content),
                },
              });
        
              // Queue for embedding generation
              await this.embeddingQueue.add('generate-embeddings', {
                documentId,
                projectId,
                content: parseResult.content,
              });
        
              // Mark job as completed
              await prisma.job.update({
                where: { id: processJob.id },
                data: {
                  status: JobStatusEnum.COMPLETED,
                  completedAt: new Date(),
                  result: {
                    contentLength: parseResult.content.length,
                    wordCount: parseResult.metadata.wordCount,
                    metadata: parseResult.metadata,
                  },
                },
              });
        
              this.logger.log(`Completed document processing for ${filename}`);
            } catch (error) {
              this.logger.error(`Failed to process document ${filename}`, error);
        
              // Mark job as failed
              await prisma.job.update({
                where: { id: processJob.id },
                data: {
                  status: JobStatusEnum.FAILED,
                  completedAt: new Date(),
                  error: error instanceof Error ? error.message : String(error),
                },
              });
        
              // Update document status
              await prisma.document.update({
                where: { id: documentId },
                data: {
                  metadata: {
                    processingError: error instanceof Error ? error.message : String(error),
                    failedAt: new Date(),
                  },
                },
              });
        
              throw error;
            }
            */
        }
        estimateTokenCount(text) {
            // TODO: Re-enable when @chatbot-rag packages are available
            // Rough estimation: ~4 characters per token
            return Math.ceil(text.length / 4);
        }
    };
    return DocumentProcessor = _classThis;
})();
exports.DocumentProcessor = DocumentProcessor;
//# sourceMappingURL=document.processor.js.map