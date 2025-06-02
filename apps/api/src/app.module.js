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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const throttler_2 = require("@nestjs/throttler");
const configuration_1 = __importDefault(require("./config/configuration"));
const validation_1 = require("./config/validation");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const organizations_module_1 = require("./modules/organizations/organizations.module");
const projects_module_1 = require("./modules/projects/projects.module");
const sources_module_1 = require("./modules/sources/sources.module");
const documents_module_1 = require("./modules/documents/documents.module");
const chat_module_1 = require("./modules/chat/chat.module");
const websocket_module_1 = require("./modules/websocket/websocket.module");
const queue_module_1 = require("./modules/queue/queue.module");
const webhooks_module_1 = require("./modules/webhooks/webhooks.module");
const analytics_module_1 = require("./modules/analytics/analytics.module");
const health_module_1 = require("./modules/health/health.module");
const logger_module_1 = require("./common/logger/logger.module");
const tenant_module_1 = require("./modules/tenant/tenant.module");
const tenant_middleware_1 = require("./common/middleware/tenant.middleware");
const request_id_middleware_1 = require("./common/middleware/request-id.middleware");
// Import shared packages
// TODO: Uncomment when packages are built and properly configured
// import { QueueModule } from '@chatbot-rag/queue';
// import { EventsModule } from '@chatbot-rag/events';
// import { EmbeddingModule } from '@chatbot-rag/embeddings';
// import { VectorStoreModule } from '@chatbot-rag/vector-store';
// import { ParserModule } from '@chatbot-rag/parser';
// import { ChunkerModule } from '@chatbot-rag/chunker';
let AppModule = (() => {
    let _classDecorators = [(0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot({
                    isGlobal: true,
                    load: [configuration_1.default],
                    validate: validation_1.validate,
                    cache: true,
                }),
                throttler_1.ThrottlerModule.forRootAsync({
                    imports: [config_1.ConfigModule],
                    inject: [config_1.ConfigService],
                    useFactory: (config) => ({
                        throttlers: [
                            {
                                ttl: config.get('throttle.ttl') || 60000,
                                limit: config.get('throttle.limit') || 100,
                            },
                        ],
                    }),
                }),
                // Shared packages
                // TODO: Uncomment when packages are built and properly configured
                // QueueModule,
                // EventsModule,
                // EmbeddingModule,
                // VectorStoreModule,
                // ParserModule,
                // ChunkerModule,
                // Core modules
                logger_module_1.LoggerModule,
                tenant_module_1.TenantModule,
                auth_module_1.AuthModule,
                users_module_1.UsersModule,
                organizations_module_1.OrganizationsModule,
                projects_module_1.ProjectsModule,
                sources_module_1.SourcesModule,
                documents_module_1.DocumentsModule,
                chat_module_1.ChatModule,
                websocket_module_1.WebsocketModule,
                queue_module_1.QueueModule,
                webhooks_module_1.WebhooksModule,
                analytics_module_1.AnalyticsModule,
                health_module_1.HealthModule,
            ],
            providers: [
                {
                    provide: core_1.APP_GUARD,
                    useClass: throttler_2.ThrottlerGuard,
                },
            ],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AppModule = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AppModule = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        configure(consumer) {
            consumer
                .apply(request_id_middleware_1.RequestIdMiddleware, tenant_middleware_1.TenantMiddleware)
                .forRoutes('*');
        }
    };
    return AppModule = _classThis;
})();
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map