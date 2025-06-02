"use strict";
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueService = void 0;
const common_1 = require("@nestjs/common");
const types_1 = require("./types");
let QueueService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var QueueService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            QueueService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        documentProcessingQueue;
        embeddingQueue;
        vectorSyncQueue;
        webhookQueue;
        cleanupQueue;
        exportQueue;
        logger = new common_1.Logger(QueueService.name);
        queues = new Map();
        constructor(documentProcessingQueue, embeddingQueue, vectorSyncQueue, webhookQueue, cleanupQueue, exportQueue) {
            this.documentProcessingQueue = documentProcessingQueue;
            this.embeddingQueue = embeddingQueue;
            this.vectorSyncQueue = vectorSyncQueue;
            this.webhookQueue = webhookQueue;
            this.cleanupQueue = cleanupQueue;
            this.exportQueue = exportQueue;
            this.queues.set(types_1.QUEUE_NAMES.DOCUMENT_PROCESSING, this.documentProcessingQueue);
            this.queues.set(types_1.QUEUE_NAMES.EMBEDDING_GENERATION, this.embeddingQueue);
            this.queues.set(types_1.QUEUE_NAMES.VECTOR_SYNC, this.vectorSyncQueue);
            this.queues.set(types_1.QUEUE_NAMES.WEBHOOKS, this.webhookQueue);
            this.queues.set(types_1.QUEUE_NAMES.CLEANUP, this.cleanupQueue);
            this.queues.set(types_1.QUEUE_NAMES.EXPORT, this.exportQueue);
        }
        async onModuleDestroy() {
            for (const queue of this.queues.values()) {
                await queue.close();
            }
        }
        async addJob(queueName, jobName, data, options = {}) {
            const queue = this.getQueue(queueName);
            const bullOptions = {
                priority: options.priority,
                delay: options.delay,
                attempts: options.attempts || 3,
                backoff: options.backoff,
                removeOnComplete: options.removeOnComplete ?? 10,
                removeOnFail: options.removeOnFail ?? 50,
                jobId: options.jobId,
                timeout: options.timeout,
            };
            try {
                const job = await queue.add(jobName, data, bullOptions);
                this.logger.debug(`Added job ${job.id} to queue ${queueName} with name ${jobName}`);
                return job;
            }
            catch (error) {
                this.logger.error(`Failed to add job to queue ${queueName}: ${error.message}`, error);
                throw error;
            }
        }
        async getJob(queueName, jobId) {
            const queue = this.getQueue(queueName);
            return queue.getJob(jobId);
        }
        async removeJob(queueName, jobId) {
            const job = await this.getJob(queueName, jobId);
            if (job) {
                await job.remove();
                this.logger.debug(`Removed job ${jobId} from queue ${queueName}`);
            }
        }
        async retryJob(queueName, jobId) {
            const job = await this.getJob(queueName, jobId);
            if (job) {
                await job.retry();
                this.logger.debug(`Retried job ${jobId} in queue ${queueName}`);
            }
        }
        async getJobsByState(queueName, state, start = 0, end = -1) {
            const queue = this.getQueue(queueName);
            switch (state) {
                case 'waiting':
                    return queue.getWaiting(start, end);
                case 'active':
                    return queue.getActive(start, end);
                case 'completed':
                    return queue.getCompleted(start, end);
                case 'failed':
                    return queue.getFailed(start, end);
                case 'delayed':
                    return queue.getDelayed(start, end);
                default:
                    throw new Error(`Unknown job state: ${state}`);
            }
        }
        async getQueueStats(queueName) {
            const queue = this.getQueue(queueName);
            const [waiting, active, completed, failed, delayed, paused] = await Promise.all([
                queue.getWaiting().then((jobs) => jobs.length),
                queue.getActive().then((jobs) => jobs.length),
                queue.getCompleted().then((jobs) => jobs.length),
                queue.getFailed().then((jobs) => jobs.length),
                queue.getDelayed().then((jobs) => jobs.length),
                queue.isPaused().then((isPaused) => (isPaused ? 1 : 0)),
            ]);
            return {
                waiting,
                active,
                completed,
                failed,
                delayed,
                paused,
            };
        }
        async getAllStats() {
            const stats = {};
            for (const [queueName] of this.queues) {
                stats[queueName] = await this.getQueueStats(queueName);
            }
            return stats;
        }
        async getQueueHealth(queueName) {
            try {
                const queue = this.getQueue(queueName);
                const stats = await this.getQueueStats(queueName);
                // Check if queue is responsive
                const isHealthy = await this.isQueueHealthy(queue);
                // Get recent failed jobs for error analysis
                const failedJobs = await queue.getFailed(0, 4);
                const errors = failedJobs.map((job) => job.failedReason || 'Unknown error');
                // Get last processed job
                const completedJobs = await queue.getCompleted(0, 0);
                const lastProcessed = completedJobs[0]?.processedOn
                    ? new Date(completedJobs[0].processedOn)
                    : undefined;
                return {
                    isHealthy,
                    stats,
                    lastProcessed,
                    errors,
                };
            }
            catch (error) {
                this.logger.error(`Failed to get health for queue ${queueName}`, error);
                return {
                    isHealthy: false,
                    stats: {
                        waiting: 0,
                        active: 0,
                        completed: 0,
                        failed: 0,
                        delayed: 0,
                        paused: 0,
                    },
                    errors: [error.message],
                };
            }
        }
        async pauseQueue(queueName) {
            const queue = this.getQueue(queueName);
            await queue.pause();
            this.logger.log(`Paused queue ${queueName}`);
        }
        async resumeQueue(queueName) {
            const queue = this.getQueue(queueName);
            await queue.resume();
            this.logger.log(`Resumed queue ${queueName}`);
        }
        async cleanQueue(queueName, grace = 0, status) {
            const queue = this.getQueue(queueName);
            if (status) {
                await queue.clean(grace, status);
            }
            else {
                await Promise.all([
                    queue.clean(grace, 'completed'),
                    queue.clean(grace, 'failed'),
                ]);
            }
            this.logger.log(`Cleaned queue ${queueName} (grace: ${grace}ms, status: ${status || 'all'})`);
        }
        async drainQueue(queueName) {
            const queue = this.getQueue(queueName);
            await queue.drain();
            this.logger.log(`Drained queue ${queueName}`);
        }
        getQueueNames() {
            return Array.from(this.queues.keys());
        }
        // Job creation helper methods
        async addDocumentProcessingJob(data, options) {
            return this.addJob(types_1.QUEUE_NAMES.DOCUMENT_PROCESSING, 'process-document', data, options);
        }
        async addEmbeddingJob(data, options) {
            return this.addJob(types_1.QUEUE_NAMES.EMBEDDING_GENERATION, 'generate-embeddings', data, options);
        }
        async addVectorSyncJob(data, options) {
            return this.addJob(types_1.QUEUE_NAMES.VECTOR_SYNC, 'sync-vectors', data, options);
        }
        async addWebhookJob(data, options) {
            return this.addJob(types_1.QUEUE_NAMES.WEBHOOKS, 'send-webhook', data, options);
        }
        async addCleanupJob(data, options) {
            return this.addJob(types_1.QUEUE_NAMES.CLEANUP, 'cleanup-data', data, options);
        }
        async addExportJob(data, options) {
            return this.addJob(types_1.QUEUE_NAMES.EXPORT, 'export-data', data, options);
        }
        getQueue(queueName) {
            const queue = this.queues.get(queueName);
            if (!queue) {
                throw new Error(`Queue ${queueName} not found`);
            }
            return queue;
        }
        async isQueueHealthy(queue) {
            try {
                // Simple health check - try to get queue stats
                await queue.getWaiting(0, 0);
                return true;
            }
            catch (error) {
                this.logger.error('Queue health check failed', error);
                return false;
            }
        }
    };
    return QueueService = _classThis;
})();
exports.QueueService = QueueService;
//# sourceMappingURL=queue.service.js.map