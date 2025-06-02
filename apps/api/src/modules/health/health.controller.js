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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const database_1 = require("@chatbot-rag/database");
let HealthController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('Health'), (0, common_1.Controller)('health'), (0, public_decorator_1.Public)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _health_decorators;
    let _ready_decorators;
    var HealthController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _health_decorators = [(0, common_1.Get)(), (0, swagger_1.ApiOperation)({ summary: 'Basic health check' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Service is healthy' })];
            _ready_decorators = [(0, common_1.Get)('ready'), (0, swagger_1.ApiOperation)({ summary: 'Readiness check for all services' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'All services are ready' }), (0, swagger_1.ApiResponse)({ status: 503, description: 'One or more services are not ready' })];
            __esDecorate(this, null, _health_decorators, { kind: "method", name: "health", static: false, private: false, access: { has: obj => "health" in obj, get: obj => obj.health }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _ready_decorators, { kind: "method", name: "ready", static: false, private: false, access: { has: obj => "ready" in obj, get: obj => obj.ready }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            HealthController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        async health() {
            return {
                status: 'ok',
                timestamp: new Date().toISOString(),
                uptime: process.uptime(),
            };
        }
        async ready() {
            const checks = {
                database: false,
                redis: false,
                qdrant: false,
            };
            try {
                await database_1.prisma.$queryRaw `SELECT 1`;
                checks.database = true;
            }
            catch (error) {
                console.error('Database health check failed:', error);
            }
            try {
                await database_1.redis.ping();
                checks.redis = true;
            }
            catch (error) {
                console.error('Redis health check failed:', error);
            }
            try {
                await database_1.qdrant.getCollections();
                checks.qdrant = true;
            }
            catch (error) {
                console.error('Qdrant health check failed:', error);
            }
            const allHealthy = Object.values(checks).every((status) => status);
            return {
                status: allHealthy ? 'ready' : 'not ready',
                checks,
                timestamp: new Date().toISOString(),
            };
        }
        constructor() {
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
    return HealthController = _classThis;
})();
exports.HealthController = HealthController;
//# sourceMappingURL=health.controller.js.map