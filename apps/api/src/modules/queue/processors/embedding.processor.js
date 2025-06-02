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
exports.EmbeddingProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
let EmbeddingProcessor = (() => {
    let _classDecorators = [(0, bull_1.Processor)('embedding-generation'), (0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _handleEmbeddingGeneration_decorators;
    var EmbeddingProcessor = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _handleEmbeddingGeneration_decorators = [(0, bull_1.Process)('generate-embeddings')];
            __esDecorate(this, null, _handleEmbeddingGeneration_decorators, { kind: "method", name: "handleEmbeddingGeneration", static: false, private: false, access: { has: obj => "handleEmbeddingGeneration" in obj, get: obj => obj.handleEmbeddingGeneration }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            EmbeddingProcessor = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        logger = __runInitializers(this, _instanceExtraInitializers);
        configService;
        // TODO: Re-enable when @chatbot-rag packages are available
        // private chunker: IntelligentChunker;
        constructor(logger, configService) {
            this.logger = logger;
            this.configService = configService;
            this.logger.setContext('EmbeddingProcessor');
            // TODO: Re-enable when @chatbot-rag packages are available
            // this.chunker = new IntelligentChunker();
        }
        async handleEmbeddingGeneration(job) {
            // TODO: Re-enable when @chatbot-rag packages are available
            throw new Error('Embedding generation functionality temporarily disabled - @chatbot-rag packages not available');
            /*
            const { documentId, projectId, content } = job.data;
        
            this.logger.log(`Starting embedding generation for document ${documentId}`);
        
            // Create job record
            const embeddingJob = await prisma.job.create({
              data: {
                projectId,
                type: 'embedding_generate',
                status: JobStatusEnum.PROCESSING,
                config: {
                  documentId,
                },
              },
            });
        
            try {
              // Update job start time
              await prisma.job.update({
                where: { id: embeddingJob.id },
                data: {
                  startedAt: new Date(),
                },
              });
        
              // Get document and source info
              const document = await prisma.document.findUnique({
                where: { id: documentId },
                include: {
                  source: true,
                },
              });
        
              if (!document) {
                throw new Error('Document not found');
              }
        
              // Chunk the content
              const chunkingResult = await this.chunker.chunk(content, {
                chunkSize: this.configService.get<number>('embedding.chunkSize', 1000),
                chunkOverlap: this.configService.get<number>('embedding.chunkOverlap', 200),
                strategy: this.detectChunkingStrategy(document),
                tokenizer: 'tiktoken',
                model: 'text-embedding-ada-002',
              });
        
              // Delete existing chunks
              await prisma.documentChunk.deleteMany({
                where: { documentId },
              });
        
              // Delete from vector store
              await vectorStore.deleteByDocument(documentId);
        
              // Process chunks in batches
              const batchSize = this.configService.get<number>('embedding.batchSize', 100);
              const chunksToProcess = chunkingResult.chunks;
              
              for (let i = 0; i < chunksToProcess.length; i += batchSize) {
                const batch = chunksToProcess.slice(i, i + batchSize);
                
                // Generate embeddings (placeholder - would use actual embedding service)
                const embeddings = await this.generateEmbeddings(
                  batch.map(chunk => chunk.content),
                );
        
                // Save chunks to database
                const dbChunks = await Promise.all(
                  batch.map((chunk, idx) =>
                    prisma.documentChunk.create({
                      data: {
                        documentId,
                        chunkIndex: chunk.metadata.index,
                        content: chunk.content,
                        tokens: chunk.metadata.tokens,
                        metadata: chunk.metadata as any,
                      },
                    }),
                  ),
                );
        
                // Add to vector store
                await vectorStore.addDocumentChunks(
                  dbChunks.map((dbChunk, idx) => ({
                    id: dbChunk.id,
                    content: dbChunk.content,
                    embedding: embeddings[idx],
                    documentId: dbChunk.documentId,
                    sourceId: document.sourceId,
                    projectId,
                    metadata: {
                      chunkIndex: dbChunk.chunkIndex,
                      title: document.title,
                      url: document.url,
                    },
                  })),
                );
        
                // Update progress
                job.progress(Math.round(((i + batch.length) / chunksToProcess.length) * 100));
              }
        
              // Update document chunk count
              await prisma.document.update({
                where: { id: documentId },
                data: {
                  chunkCount: chunksToProcess.length,
                  embeddingModel: 'text-embedding-ada-002',
                },
              });
        
              // Mark job as completed
              await prisma.job.update({
                where: { id: embeddingJob.id },
                data: {
                  status: JobStatusEnum.COMPLETED,
                  completedAt: new Date(),
                  result: {
                    chunksCreated: chunksToProcess.length,
                    embeddingModel: 'text-embedding-ada-002',
                    chunkingStrategy: chunkingResult.metadata.strategy,
                  },
                },
              });
        
              this.logger.log(`Completed embedding generation for document ${documentId}`);
            } catch (error) {
              this.logger.error(`Failed to generate embeddings for document ${documentId}`, error);
        
              // Mark job as failed
              await prisma.job.update({
                where: { id: embeddingJob.id },
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
        detectChunkingStrategy(document) {
            // TODO: Re-enable when @chatbot-rag packages are available
            return 'RECURSIVE';
            /*
            const mimeType = document.metadata?.mimeType || '';
            const title = document.title.toLowerCase();
        
            if (mimeType.includes('markdown') || title.endsWith('.md')) {
              return ChunkingStrategy.MARKDOWN;
            }
        
            if (
              mimeType.includes('javascript') ||
              mimeType.includes('typescript') ||
              mimeType.includes('python') ||
              title.match(/\.(js|ts|py|java|cpp|cs|go|rb|php)$/)
            ) {
              return ChunkingStrategy.CODE;
            }
        
            return ChunkingStrategy.RECURSIVE;
            */
        }
        async generateEmbeddings(texts) {
            // TODO: Re-enable when @chatbot-rag packages are available
            // Placeholder implementation
            // In production, this would call OpenAI, Anthropic, or another embedding service
            // For now, return random embeddings
            return texts.map(() => {
                const embedding = new Array(1536);
                for (let i = 0; i < 1536; i++) {
                    embedding[i] = Math.random() * 2 - 1;
                }
                return embedding;
            });
        }
    };
    return EmbeddingProcessor = _classThis;
})();
exports.EmbeddingProcessor = EmbeddingProcessor;
//# sourceMappingURL=embedding.processor.js.map