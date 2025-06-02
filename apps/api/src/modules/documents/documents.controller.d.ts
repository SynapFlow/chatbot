export declare class DocumentsController {
    constructor();
    getDocuments(_req: any, limit?: number, offset?: number, status?: string, search?: string): Promise<{
        documents: {
            id: string;
            fileName: string;
            fileSize: number;
            mimeType: string;
            status: string;
            chunks: number;
            createdAt: string;
            updatedAt: string;
        }[];
        total: number;
        limit: number;
        offset: number;
    }>;
    getDocument(documentId: string, _req: any): Promise<{
        id: string;
        fileName: string;
        fileSize: number;
        mimeType: string;
        status: string;
        chunks: number;
        metadata: {
            pages: number;
            language: string;
            author: string;
        };
        createdAt: string;
        updatedAt: string;
    }>;
    uploadDocument(file: Express.Multer.File, req: any): Promise<{
        id: string;
        fileName: string;
        fileSize: number;
        mimeType: string;
        status: string;
        createdAt: Date;
        message: string;
    }>;
    updateDocument(documentId: string, updateData: {
        fileName?: string;
        metadata?: any;
    }, _req: any): Promise<{
        updatedAt: string;
        message: string;
        fileName?: string;
        metadata?: any;
        id: string;
    }>;
    deleteDocument(documentId: string, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    getDocumentChunks(_documentId: string, _req: any, limit?: number, offset?: number): Promise<{
        chunks: never[];
        total: number;
        limit: number;
        offset: number;
    }>;
    reprocessDocument(documentId: string, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
}
//# sourceMappingURL=documents.controller.d.ts.map