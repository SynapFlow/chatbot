"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = Log;
const logger_service_1 = require("../logger/logger.service");
function Log(message) {
    return function (target, propertyName, descriptor) {
        const method = descriptor.value;
        descriptor.value = async function (...args) {
            const logger = new logger_service_1.LoggerService(null); // This will be injected properly in production
            const className = target.constructor.name;
            const methodName = propertyName;
            const startTime = Date.now();
            logger.debug(message || `Executing ${className}.${methodName}`, className);
            try {
                const result = await method.apply(this, args);
                const duration = Date.now() - startTime;
                logger.debug(`Completed ${className}.${methodName} in ${duration}ms`, className);
                return result;
            }
            catch (error) {
                const duration = Date.now() - startTime;
                logger.error(`Failed ${className}.${methodName} after ${duration}ms: ${error instanceof Error ? error.message : String(error)}`, error instanceof Error ? error.stack : undefined, className);
                throw error;
            }
        };
    };
}
//# sourceMappingURL=log.decorator.js.map