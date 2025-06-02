import Redis from 'ioredis';
export declare class RedisClient {
    private static instance;
    static getInstance(): Redis;
    static disconnect(): Promise<void>;
}
export declare const redis: Redis;
export declare class CacheManager {
    private redis;
    private defaultTTL;
    constructor(redis: Redis, defaultTTL?: number);
    get<T>(key: string): Promise<T | null>;
    set(key: string, value: any, ttl?: number): Promise<void>;
    delete(key: string): Promise<void>;
    deletePattern(pattern: string): Promise<void>;
    exists(key: string): Promise<boolean>;
    ttl(key: string): Promise<number>;
    expire(key: string, seconds: number): Promise<boolean>;
    mget<T>(keys: string[]): Promise<(T | null)[]>;
    mset(keyValuePairs: Record<string, any>, ttl?: number): Promise<void>;
}
export declare const cacheManager: CacheManager;
//# sourceMappingURL=redis.d.ts.map