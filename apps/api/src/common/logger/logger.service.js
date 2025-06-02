"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const common_1 = require("@nestjs/common");
const winston = __importStar(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const Sentry = __importStar(require("@sentry/node"));
let LoggerService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var LoggerService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            LoggerService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        configService;
        logger;
        context;
        constructor(configService) {
            this.configService = configService;
            this.logger = this.createLogger();
        }
        setContext(context) {
            this.context = context;
        }
        log(message, context) {
            this.logger.info(this.formatMessage(message), {
                context: context || this.context,
            });
        }
        error(message, trace, context) {
            const ctx = context || this.context;
            this.logger.error(this.formatMessage(message), {
                context: ctx,
                trace,
            });
            // Send to Sentry
            if (this.configService.get('sentry.dsn')) {
                Sentry.captureException(new Error(message), {
                    extra: {
                        context: ctx,
                        trace,
                    },
                });
            }
        }
        warn(message, context) {
            this.logger.warn(this.formatMessage(message), {
                context: context || this.context,
            });
        }
        debug(message, context) {
            this.logger.debug(this.formatMessage(message), {
                context: context || this.context,
            });
        }
        verbose(message, context) {
            this.logger.verbose(this.formatMessage(message), {
                context: context || this.context,
            });
        }
        createLogger() {
            const logFormat = winston.format.combine(winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston.format.errors({ stack: true }), winston.format.splat(), winston.format.json(), winston.format.printf(({ timestamp, level, message, context, ...meta }) => {
                return JSON.stringify({
                    timestamp,
                    level,
                    context,
                    message,
                    ...meta,
                });
            }));
            const transports = [];
            // Console transport
            if (this.configService.get('nodeEnv') !== 'production') {
                transports.push(new winston.transports.Console({
                    format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
                }));
            }
            // File transports
            if (this.configService.get('nodeEnv') === 'production') {
                transports.push(new winston_daily_rotate_file_1.default({
                    filename: 'logs/application-%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: true,
                    maxSize: '20m',
                    maxFiles: '14d',
                    format: logFormat,
                }), new winston_daily_rotate_file_1.default({
                    filename: 'logs/error-%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: true,
                    maxSize: '20m',
                    maxFiles: '30d',
                    level: 'error',
                    format: logFormat,
                }));
            }
            return winston.createLogger({
                level: this.configService.get('LOG_LEVEL', 'info'),
                format: logFormat,
                transports,
                exceptionHandlers: [
                    new winston.transports.File({ filename: 'logs/exceptions.log' }),
                ],
                rejectionHandlers: [
                    new winston.transports.File({ filename: 'logs/rejections.log' }),
                ],
            });
        }
        formatMessage(message) {
            return typeof message === 'object' ? JSON.stringify(message) : message;
        }
        // Custom logging methods
        logRequest(method, url, statusCode, duration) {
            this.logger.info('HTTP Request', {
                method,
                url,
                statusCode,
                duration,
                type: 'http_request',
            });
        }
        logDatabaseQuery(query, duration, params) {
            this.logger.debug('Database Query', {
                query,
                duration,
                params,
                type: 'database_query',
            });
        }
        logExternalApiCall(service, endpoint, duration, statusCode) {
            this.logger.info('External API Call', {
                service,
                endpoint,
                duration,
                statusCode,
                type: 'external_api_call',
            });
        }
        logBusinessEvent(event, userId, metadata) {
            this.logger.info('Business Event', {
                event,
                userId,
                metadata,
                type: 'business_event',
            });
        }
        logSecurityEvent(event, userId, ip, metadata) {
            this.logger.warn('Security Event', {
                event,
                userId,
                ip,
                metadata,
                type: 'security_event',
            });
        }
    };
    return LoggerService = _classThis;
})();
exports.LoggerService = LoggerService;
//# sourceMappingURL=logger.service.js.map