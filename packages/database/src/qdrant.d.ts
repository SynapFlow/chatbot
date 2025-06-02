import { QdrantClient } from '@qdrant/js-client-rest';
export declare class QdrantService {
    private static instance;
    static getInstance(): QdrantClient;
    static ensureCollection(collectionName: string, vectorSize: number, distance?: 'Cosine' | 'Euclid' | 'Dot'): Promise<void>;
    static upsertVectors(collectionName: string, points: Array<{
        id: string | number;
        vector: number[];
        payload?: Record<string, any>;
    }>): Promise<void>;
    static search(collectionName: string, vector: number[], limit?: number, filter?: Record<string, any>, scoreThreshold?: number): Promise<{
        id: string | number;
        version: number;
        score: number;
        payload?: Record<string, unknown> | {
            [key: string]: unknown;
        } | null | undefined;
        vector?: Record<string, unknown> | number[] | number[][] | {
            [key: string]: number[] | number[][] | {
                indices: number[];
                values: number[];
            } | undefined;
        } | null | undefined;
        shard_key?: string | number | Record<string, unknown> | null | undefined;
        order_value?: number | Record<string, unknown> | null | undefined;
    }[]>;
    static deleteByFilter(collectionName: string, filter: Record<string, any>): Promise<void>;
    static getPoints(collectionName: string, ids: (string | number)[]): Promise<{
        id: string | number;
        payload?: Record<string, unknown> | {
            [key: string]: unknown;
        } | null | undefined;
        vector?: Record<string, unknown> | number[] | number[][] | {
            [key: string]: number[] | number[][] | {
                indices: number[];
                values: number[];
            } | undefined;
        } | null | undefined;
        shard_key?: string | number | Record<string, unknown> | null | undefined;
        order_value?: number | Record<string, unknown> | null | undefined;
    }[]>;
}
export declare const qdrant: QdrantClient;
export interface VectorSearchOptions {
    projectId: string;
    query: number[];
    limit?: number;
    scoreThreshold?: number;
    sourceIds?: string[];
    metadata?: Record<string, any>;
}
export declare class VectorStore {
    private collectionName;
    private vectorSize;
    constructor(collectionName?: string, vectorSize?: number);
    initialize(): Promise<void>;
    addDocumentChunks(chunks: Array<{
        id: string;
        content: string;
        embedding: number[];
        documentId: string;
        sourceId: string;
        projectId: string;
        metadata?: Record<string, any>;
    }>): Promise<void>;
    search(options: VectorSearchOptions): Promise<{
        id: string | number;
        version: number;
        score: number;
        payload?: Record<string, unknown> | {
            [key: string]: unknown;
        } | null | undefined;
        vector?: Record<string, unknown> | number[] | number[][] | {
            [key: string]: number[] | number[][] | {
                indices: number[];
                values: number[];
            } | undefined;
        } | null | undefined;
        shard_key?: string | number | Record<string, unknown> | null | undefined;
        order_value?: number | Record<string, unknown> | null | undefined;
    }[]>;
    deleteByDocument(documentId: string): Promise<void>;
    deleteBySource(sourceId: string): Promise<void>;
    deleteByProject(projectId: string): Promise<void>;
}
export declare const vectorStore: VectorStore;
//# sourceMappingURL=qdrant.d.ts.map