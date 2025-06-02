"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vectorStore = exports.VectorStore = exports.qdrant = exports.QdrantService = void 0;
const js_client_rest_1 = require("@qdrant/js-client-rest");
class QdrantService {
    static instance = null;
    static getInstance() {
        if (!QdrantService.instance) {
            const qdrantUrl = process.env.QDRANT_URL || 'http://localhost:6333';
            const qdrantApiKey = process.env.QDRANT_API_KEY;
            QdrantService.instance = new js_client_rest_1.QdrantClient({
                url: qdrantUrl,
                apiKey: qdrantApiKey,
            });
        }
        return QdrantService.instance;
    }
    static async ensureCollection(collectionName, vectorSize, distance = 'Cosine') {
        const client = QdrantService.getInstance();
        try {
            await client.getCollection(collectionName);
        }
        catch (error) {
            await client.createCollection(collectionName, {
                vectors: {
                    size: vectorSize,
                    distance,
                },
                optimizers_config: {
                    default_segment_number: 2,
                },
            });
            await client.createPayloadIndex(collectionName, {
                field_name: 'project_id',
                field_schema: 'keyword',
            });
            await client.createPayloadIndex(collectionName, {
                field_name: 'source_id',
                field_schema: 'keyword',
            });
            await client.createPayloadIndex(collectionName, {
                field_name: 'document_id',
                field_schema: 'keyword',
            });
        }
    }
    static async upsertVectors(collectionName, points) {
        const client = QdrantService.getInstance();
        await client.upsert(collectionName, {
            wait: true,
            points,
        });
    }
    static async search(collectionName, vector, limit = 10, filter, scoreThreshold) {
        const client = QdrantService.getInstance();
        return await client.search(collectionName, {
            vector,
            limit,
            filter,
            score_threshold: scoreThreshold,
            with_payload: true,
            with_vector: false,
        });
    }
    static async deleteByFilter(collectionName, filter) {
        const client = QdrantService.getInstance();
        await client.delete(collectionName, {
            wait: true,
            filter,
        });
    }
    static async getPoints(collectionName, ids) {
        const client = QdrantService.getInstance();
        return await client.retrieve(collectionName, {
            ids,
            with_payload: true,
            with_vector: false,
        });
    }
}
exports.QdrantService = QdrantService;
exports.qdrant = QdrantService.getInstance();
class VectorStore {
    collectionName;
    vectorSize;
    constructor(collectionName = 'chatbot_embeddings', vectorSize = 1536) {
        this.collectionName = collectionName;
        this.vectorSize = vectorSize;
    }
    async initialize() {
        await QdrantService.ensureCollection(this.collectionName, this.vectorSize);
    }
    async addDocumentChunks(chunks) {
        const points = chunks.map((chunk) => ({
            id: chunk.id,
            vector: chunk.embedding,
            payload: {
                content: chunk.content,
                document_id: chunk.documentId,
                source_id: chunk.sourceId,
                project_id: chunk.projectId,
                ...chunk.metadata,
            },
        }));
        await QdrantService.upsertVectors(this.collectionName, points);
    }
    async search(options) {
        const filter = {
            must: [
                {
                    key: 'project_id',
                    match: { value: options.projectId },
                },
            ],
        };
        if (options.sourceIds && options.sourceIds.length > 0) {
            filter.must.push({
                key: 'source_id',
                match: { any: options.sourceIds },
            });
        }
        if (options.metadata) {
            Object.entries(options.metadata).forEach(([key, value]) => {
                filter.must.push({
                    key,
                    match: { value },
                });
            });
        }
        return await QdrantService.search(this.collectionName, options.query, options.limit || 10, filter, options.scoreThreshold);
    }
    async deleteByDocument(documentId) {
        await QdrantService.deleteByFilter(this.collectionName, {
            must: [
                {
                    key: 'document_id',
                    match: { value: documentId },
                },
            ],
        });
    }
    async deleteBySource(sourceId) {
        await QdrantService.deleteByFilter(this.collectionName, {
            must: [
                {
                    key: 'source_id',
                    match: { value: sourceId },
                },
            ],
        });
    }
    async deleteByProject(projectId) {
        await QdrantService.deleteByFilter(this.collectionName, {
            must: [
                {
                    key: 'project_id',
                    match: { value: projectId },
                },
            ],
        });
    }
}
exports.VectorStore = VectorStore;
exports.vectorStore = new VectorStore();
//# sourceMappingURL=qdrant.js.map