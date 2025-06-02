"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheManager = exports.CacheManager = exports.redis = exports.RedisClient = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
class RedisClient {
    static instance = null;
    static getInstance() {
        if (!RedisClient.instance) {
            const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
            const redisPassword = process.env.REDIS_PASSWORD;
            RedisClient.instance = new ioredis_1.default(redisUrl, {
                password: redisPassword,
                retryStrategy: (times) => {
                    const delay = Math.min(times * 50, 2000);
                    return delay;
                },
                maxRetriesPerRequest: 3,
                enableReadyCheck: true,
                lazyConnect: true,
            });
            RedisClient.instance.on('error', (err) => {
                console.error('Redis Client Error:', err);
            });
            RedisClient.instance.on('connect', () => {
                console.log('Redis Client Connected');
            });
        }
        return RedisClient.instance;
    }
    static async disconnect() {
        if (RedisClient.instance) {
            await RedisClient.instance.quit();
            RedisClient.instance = null;
        }
    }
}
exports.RedisClient = RedisClient;
exports.redis = RedisClient.getInstance();
class CacheManager {
    redis;
    defaultTTL;
    constructor(redis, defaultTTL = 3600) {
        this.redis = redis;
        this.defaultTTL = defaultTTL;
    }
    async get(key) {
        const value = await this.redis.get(key);
        if (!value)
            return null;
        try {
            return JSON.parse(value);
        }
        catch {
            return value;
        }
    }
    async set(key, value, ttl) {
        const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
        if (ttl || this.defaultTTL) {
            await this.redis.setex(key, ttl || this.defaultTTL, serializedValue);
        }
        else {
            await this.redis.set(key, serializedValue);
        }
    }
    async delete(key) {
        await this.redis.del(key);
    }
    async deletePattern(pattern) {
        const keys = await this.redis.keys(pattern);
        if (keys.length > 0) {
            await this.redis.del(...keys);
        }
    }
    async exists(key) {
        const result = await this.redis.exists(key);
        return result === 1;
    }
    async ttl(key) {
        return await this.redis.ttl(key);
    }
    async expire(key, seconds) {
        const result = await this.redis.expire(key, seconds);
        return result === 1;
    }
    async mget(keys) {
        const values = await this.redis.mget(...keys);
        return values.map((value) => {
            if (!value)
                return null;
            try {
                return JSON.parse(value);
            }
            catch {
                return value;
            }
        });
    }
    async mset(keyValuePairs, ttl) {
        const pipeline = this.redis.pipeline();
        Object.entries(keyValuePairs).forEach(([key, value]) => {
            const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
            if (ttl || this.defaultTTL) {
                pipeline.setex(key, ttl || this.defaultTTL, serializedValue);
            }
            else {
                pipeline.set(key, serializedValue);
            }
        });
        await pipeline.exec();
    }
}
exports.CacheManager = CacheManager;
exports.cacheManager = new CacheManager(exports.redis);
//# sourceMappingURL=redis.js.map