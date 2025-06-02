"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseProcessor = void 0;
const common_1 = require("@nestjs/common");
class BaseProcessor {
    logger;
    constructor(loggerContext) {
        this.logger = new common_1.Logger(loggerContext);
    }
    async updateProgress(job, progress) {
        try {
            await job.progress(progress);
            this.logger.debug(`Job ${job.id} progress: ${progress.current}/${progress.total} - ${progress.message}`);
        }
        catch (error) {
            this.logger.warn(`Failed to update job progress for job ${job.id}`, error);
        }
    }
    createSuccessResult(data, metadata) {
        return {
            success: true,
            data,
            metadata,
        };
    }
    createErrorResult(error, data, metadata) {
        return {
            success: false,
            error: error instanceof Error ? error.message : error,
            data,
            metadata,
        };
    }
    async executeWithErrorHandling(job, operation, context) {
        try {
            const startTime = Date.now();
            const result = await operation();
            const duration = Date.now() - startTime;
            this.logger.debug(`${context} completed for job ${job.id} in ${duration}ms`);
            return result;
        }
        catch (error) {
            this.logger.error(`${context} failed for job ${job.id}: ${error.message}`, error);
            throw error;
        }
    }
    validateJobData(job, requiredFields) {
        for (const field of requiredFields) {
            if (!job.data || !(field in job.data) || job.data[field] === undefined) {
                throw new Error(`Missing required field: ${field}`);
            }
        }
    }
    getTenantId(job) {
        const tenantId = job.data?.tenantId;
        if (!tenantId) {
            throw new Error('Tenant ID is required');
        }
        return tenantId;
    }
    async withRetry(operation, maxAttempts = 3, delay = 1000) {
        let lastError;
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                return await operation();
            }
            catch (error) {
                lastError = error;
                if (attempt === maxAttempts) {
                    break;
                }
                this.logger.warn(`Operation failed (attempt ${attempt}/${maxAttempts}): ${error.message}. Retrying in ${delay}ms...`);
                await new Promise((resolve) => setTimeout(resolve, delay * attempt));
            }
        }
        throw lastError;
    }
}
exports.BaseProcessor = BaseProcessor;
//# sourceMappingURL=base.processor.js.map