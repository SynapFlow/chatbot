declare const _default: () => {
    port: number;
    apiPrefix: string;
    nodeEnv: "development" | "production" | "test";
    database: {
        url: string | undefined;
    };
    redis: {
        url: string | undefined;
        host: string;
        port: number;
        password: string | undefined;
    };
    qdrant: {
        url: string;
        apiKey: string | undefined;
    };
    jwt: {
        secret: string | undefined;
        refreshSecret: string | undefined;
        expiresIn: string;
        refreshExpiresIn: string;
    };
    throttle: {
        ttl: number;
        limit: number;
    };
    cors: {
        origins: string[];
    };
    email: {
        host: string | undefined;
        port: number;
        user: string | undefined;
        pass: string | undefined;
        from: string;
    };
    llm: {
        openaiApiKey: string | undefined;
        anthropicApiKey: string | undefined;
        defaultModel: string;
    };
    stripe: {
        secretKey: string | undefined;
        webhookSecret: string | undefined;
    };
    sentry: {
        dsn: string | undefined;
    };
    uploads: {
        maxFileSize: number;
        allowedMimeTypes: string[];
    };
    crawling: {
        maxDepth: number;
        maxPages: number;
        timeout: number;
    };
    embedding: {
        chunkSize: number;
        chunkOverlap: number;
        batchSize: number;
    };
};
export default _default;
//# sourceMappingURL=configuration.d.ts.map