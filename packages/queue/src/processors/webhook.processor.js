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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const base_processor_1 = require("./base.processor");
const types_1 = require("../types");
const axios_1 = __importDefault(require("axios"));
let WebhookProcessor = (() => {
    let _classDecorators = [(0, common_1.Injectable)(), (0, bull_1.Processor)(types_1.QUEUE_NAMES.WEBHOOKS)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = base_processor_1.BaseProcessor;
    let _instanceExtraInitializers = [];
    let _process_decorators;
    var WebhookProcessor = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _process_decorators = [(0, bull_1.Process)('send-webhook')];
            __esDecorate(this, null, _process_decorators, { kind: "method", name: "process", static: false, private: false, access: { has: obj => "process" in obj, get: obj => obj.process }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            WebhookProcessor = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        constructor() {
            super('WebhookProcessor');
            __runInitializers(this, _instanceExtraInitializers);
        }
        async process(job) {
            return this.executeWithErrorHandling(job, async () => {
                this.validateJobData(job, ['url', 'method', 'tenantId', 'eventType', 'eventId']);
                const { url, method, headers = {}, payload, tenantId, eventType, eventId, retryAttempts = 3, } = job.data;
                await this.updateProgress(job, {
                    current: 0,
                    total: 100,
                    message: 'Preparing webhook request',
                });
                const startTime = Date.now();
                try {
                    await this.updateProgress(job, {
                        current: 25,
                        total: 100,
                        message: 'Sending webhook request',
                    });
                    const response = await this.sendWebhook(url, method, payload, headers, retryAttempts);
                    const responseTime = Date.now() - startTime;
                    await this.updateProgress(job, {
                        current: 75,
                        total: 100,
                        message: 'Processing webhook response',
                    });
                    // Log successful webhook
                    await this.logWebhookAttempt(tenantId, eventType, eventId, url, method, response.status, responseTime, true);
                    await this.updateProgress(job, {
                        current: 100,
                        total: 100,
                        message: 'Webhook sent successfully',
                    });
                    return this.createSuccessResult({
                        statusCode: response.status,
                        responseTime,
                        responseBody: response.data,
                    }, {
                        tenantId,
                        eventType,
                        eventId,
                        url,
                        method,
                        attempt: job.attemptsMade + 1,
                    });
                }
                catch (error) {
                    const responseTime = Date.now() - startTime;
                    const axiosError = error;
                    // Log failed webhook
                    await this.logWebhookAttempt(tenantId, eventType, eventId, url, method, axiosError.response?.status, responseTime, false, axiosError.message);
                    throw error;
                }
            }, 'Webhook delivery');
        }
        async sendWebhook(url, method, payload, headers = {}, maxRetries = 3) {
            const requestConfig = {
                method: method.toLowerCase(),
                url,
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'ChatbotRAG-Webhook/1.0',
                    ...headers,
                },
                data: payload,
                timeout: 30000, // 30 seconds
                validateStatus: (status) => status >= 200 && status < 300,
            };
            return this.withRetry(async () => {
                this.logger.debug(`Sending ${method} webhook to ${url}`);
                const response = await (0, axios_1.default)(requestConfig);
                this.logger.debug(`Webhook response: ${response.status} ${response.statusText}`);
                return response;
            }, maxRetries, 1000);
        }
        async logWebhookAttempt(tenantId, eventType, eventId, url, method, statusCode, responseTime, success = false, error) {
            try {
                this.logger.debug(`Logging webhook attempt: ${eventType}:${eventId} -> ${url} (${statusCode}) [${success ? 'SUCCESS' : 'FAILED'}]`);
                // In a real implementation, save to webhook_logs table
                // const logEntry = {
                //   tenantId,
                //   eventType,
                //   eventId,
                //   url,
                //   method,
                //   statusCode,
                //   responseTime,
                //   success,
                //   error,
                //   timestamp: new Date(),
                // };
                // 
                // await this.webhookLogRepository.save(logEntry);
                // Simulate async operation
                await new Promise(resolve => setTimeout(resolve, 10));
            }
            catch (logError) {
                this.logger.error(`Failed to log webhook attempt: ${logError.message}`, logError);
                // Don't throw here - webhook logging failure shouldn't fail the webhook
            }
        }
        // Webhook retry logic with exponential backoff
        async withRetry(operation, maxAttempts = 3, baseDelay = 1000) {
            let lastError;
            for (let attempt = 1; attempt <= maxAttempts; attempt++) {
                try {
                    return await operation();
                }
                catch (error) {
                    lastError = error;
                    const axiosError = error;
                    // Don't retry on client errors (4xx) except for specific cases
                    if (axiosError.response) {
                        const status = axiosError.response.status;
                        if (status >= 400 && status < 500 && status !== 408 && status !== 429) {
                            this.logger.warn(`Not retrying webhook due to client error: ${status}`);
                            throw error;
                        }
                    }
                    if (attempt === maxAttempts) {
                        break;
                    }
                    // Exponential backoff with jitter
                    const delay = baseDelay * Math.pow(2, attempt - 1) + Math.random() * 1000;
                    this.logger.warn(`Webhook attempt ${attempt}/${maxAttempts} failed: ${error.message}. Retrying in ${Math.round(delay)}ms...`);
                    await new Promise((resolve) => setTimeout(resolve, delay));
                }
            }
            throw lastError;
        }
    };
    return WebhookProcessor = _classThis;
})();
exports.WebhookProcessor = WebhookProcessor;
//# sourceMappingURL=webhook.processor.js.map