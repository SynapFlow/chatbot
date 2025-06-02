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
exports.DocumentsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
// TODO: Re-enable when @chatbot-rag packages are available
// import { QueueService } from '@chatbot-rag/queue';
// import { EventService } from '@chatbot-rag/events';
const tenant_guard_1 = require("../../common/guards/tenant.guard");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const uuid_1 = require("uuid");
const path = __importStar(require("path"));
const fs = __importStar(require("fs/promises"));
let DocumentsController = (() => {
    let _classDecorators = [(0, common_1.Controller)('documents'), (0, common_1.UseGuards)(jwt_auth_guard_1.AuthGuard, tenant_guard_1.TenantGuard)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getDocuments_decorators;
    let _getDocument_decorators;
    let _uploadDocument_decorators;
    let _updateDocument_decorators;
    let _deleteDocument_decorators;
    let _getDocumentChunks_decorators;
    let _reprocessDocument_decorators;
    var DocumentsController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getDocuments_decorators = [(0, common_1.Get)()];
            _getDocument_decorators = [(0, common_1.Get)(':id')];
            _uploadDocument_decorators = [(0, common_1.Post)('upload'), (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file'))];
            _updateDocument_decorators = [(0, common_1.Patch)(':id')];
            _deleteDocument_decorators = [(0, common_1.Delete)(':id')];
            _getDocumentChunks_decorators = [(0, common_1.Get)(':id/chunks')];
            _reprocessDocument_decorators = [(0, common_1.Post)(':id/reprocess')];
            __esDecorate(this, null, _getDocuments_decorators, { kind: "method", name: "getDocuments", static: false, private: false, access: { has: obj => "getDocuments" in obj, get: obj => obj.getDocuments }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getDocument_decorators, { kind: "method", name: "getDocument", static: false, private: false, access: { has: obj => "getDocument" in obj, get: obj => obj.getDocument }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _uploadDocument_decorators, { kind: "method", name: "uploadDocument", static: false, private: false, access: { has: obj => "uploadDocument" in obj, get: obj => obj.uploadDocument }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _updateDocument_decorators, { kind: "method", name: "updateDocument", static: false, private: false, access: { has: obj => "updateDocument" in obj, get: obj => obj.updateDocument }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _deleteDocument_decorators, { kind: "method", name: "deleteDocument", static: false, private: false, access: { has: obj => "deleteDocument" in obj, get: obj => obj.deleteDocument }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getDocumentChunks_decorators, { kind: "method", name: "getDocumentChunks", static: false, private: false, access: { has: obj => "getDocumentChunks" in obj, get: obj => obj.getDocumentChunks }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _reprocessDocument_decorators, { kind: "method", name: "reprocessDocument", static: false, private: false, access: { has: obj => "reprocessDocument" in obj, get: obj => obj.reprocessDocument }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            DocumentsController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        constructor(
        // TODO: Re-enable when @chatbot-rag packages are available
        // private readonly queueService: QueueService,
        // private readonly eventService: EventService,
        ) {
            __runInitializers(this, _instanceExtraInitializers);
        }
        async getDocuments(_req, limit, offset, status, search) {
            // Implementation would fetch documents from database
            // For now, return mock data
            const mockDocuments = [
                {
                    id: 'doc_1',
                    fileName: 'sample-document.pdf',
                    fileSize: 1024 * 1024, // 1MB
                    mimeType: 'application/pdf',
                    status: 'completed',
                    chunks: 25,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
                {
                    id: 'doc_2',
                    fileName: 'technical-guide.docx',
                    fileSize: 512 * 1024, // 512KB
                    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    status: 'processing',
                    chunks: 0,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
            ];
            let filteredDocuments = mockDocuments;
            if (status) {
                filteredDocuments = filteredDocuments.filter(doc => doc.status === status);
            }
            if (search) {
                filteredDocuments = filteredDocuments.filter(doc => doc.fileName.toLowerCase().includes(search.toLowerCase()));
            }
            const startIndex = (offset || 0);
            const endIndex = startIndex + (limit || 20);
            const paginatedDocuments = filteredDocuments.slice(startIndex, endIndex);
            return {
                documents: paginatedDocuments,
                total: filteredDocuments.length,
                limit: limit || 20,
                offset: offset || 0,
            };
        }
        async getDocument(documentId, _req) {
            // Implementation would fetch specific document
            return {
                id: documentId,
                fileName: 'sample-document.pdf',
                fileSize: 1024 * 1024,
                mimeType: 'application/pdf',
                status: 'completed',
                chunks: 25,
                metadata: {
                    pages: 10,
                    language: 'en',
                    author: 'Sample Author',
                },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
        }
        async uploadDocument(file, req) {
            if (!file) {
                throw new Error('No file uploaded');
            }
            // Validate file type
            const allowedMimeTypes = [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'text/plain',
                'text/csv',
                'application/vnd.ms-excel',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            ];
            if (!allowedMimeTypes.includes(file.mimetype)) {
                throw new Error(`Unsupported file type: ${file.mimetype}`);
            }
            // Validate file size (50MB limit)
            const maxSize = 50 * 1024 * 1024; // 50MB
            if (file.size > maxSize) {
                throw new Error('File size exceeds 50MB limit');
            }
            const documentId = (0, uuid_1.v4)();
            const uploadDir = path.join(process.cwd(), 'uploads', req.tenantId);
            const fileName = `${documentId}_${file.originalname}`;
            const filePath = path.join(uploadDir, fileName);
            try {
                // Ensure upload directory exists
                await fs.mkdir(uploadDir, { recursive: true });
                // Save file
                await fs.writeFile(filePath, file.buffer);
                // Create document record (in real implementation, save to database)
                const document = {
                    id: documentId,
                    fileName: file.originalname,
                    fileSize: file.size,
                    mimeType: file.mimetype,
                    status: 'processing',
                    chunks: 0,
                    filePath,
                    tenantId: req.tenantId,
                    userId: req.user?.id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
                // TODO: Re-enable when @chatbot-rag packages are available
                // Publish document uploaded event
                // await this.eventService.publishDocumentEvent(
                //   'document.uploaded',
                //   {
                //     documentId,
                //     fileName: file.originalname,
                //     fileSize: file.size,
                //     mimeType: file.mimetype,
                //     status: 'processing',
                //   },
                //   req.tenantId,
                //   req.user?.id,
                // );
                // TODO: Re-enable when @chatbot-rag packages are available
                // Queue document processing job
                // await this.queueService.addDocumentProcessingJob({
                //   documentId,
                //   tenantId: req.tenantId,
                //   filePath,
                //   fileName: file.originalname,
                //   mimeType: file.mimetype,
                //   metadata: {
                //     userId: req.user?.id,
                //     uploadedAt: new Date().toISOString(),
                //   },
                // });
                return {
                    id: documentId,
                    fileName: file.originalname,
                    fileSize: file.size,
                    mimeType: file.mimetype,
                    status: 'processing',
                    createdAt: document.createdAt,
                    message: 'Document uploaded successfully and processing started',
                };
            }
            catch (error) {
                // Cleanup file if database save fails
                try {
                    await fs.unlink(filePath);
                }
                catch (cleanupError) {
                    console.error('Failed to cleanup file:', cleanupError);
                }
                throw error;
            }
        }
        async updateDocument(documentId, updateData, _req) {
            // Implementation would update document in database
            return {
                id: documentId,
                ...updateData,
                updatedAt: new Date().toISOString(),
                message: 'Document updated successfully',
            };
        }
        async deleteDocument(documentId, req) {
            // Implementation would:
            // 1. Delete document record from database
            // 2. Delete physical file
            // 3. Delete associated chunks and embeddings
            // 4. Remove from vector store
            // 5. Publish deletion event
            // TODO: Re-enable when @chatbot-rag packages are available
            // await this.eventService.publishDocumentEvent(
            //   'document.deleted',
            //   {
            //     documentId,
            //     fileName: 'sample-document.pdf', // Would get from database
            //     fileSize: 1024 * 1024,
            //     mimeType: 'application/pdf',
            //   },
            //   req.tenantId,
            //   req.user?.id,
            // );
            return {
                success: true,
                message: 'Document deleted successfully',
            };
        }
        async getDocumentChunks(_documentId, _req, limit, offset) {
            // Implementation would fetch chunks for document
            return {
                chunks: [],
                total: 0,
                limit: limit || 50,
                offset: offset || 0,
            };
        }
        async reprocessDocument(documentId, req) {
            // TODO: Re-enable when @chatbot-rag packages are available
            // Implementation would requeue document for processing
            // await this.queueService.addDocumentProcessingJob({
            //   documentId,
            //   tenantId: req.tenantId,
            //   filePath: '/path/to/file', // Would get from database
            //   fileName: 'sample-document.pdf',
            //   mimeType: 'application/pdf',
            //   metadata: {
            //     reprocessing: true,
            //     userId: req.user?.id,
            //   },
            // });
            return {
                success: true,
                message: 'Document reprocessing started',
            };
        }
    };
    return DocumentsController = _classThis;
})();
exports.DocumentsController = DocumentsController;
//# sourceMappingURL=documents.controller.js.map