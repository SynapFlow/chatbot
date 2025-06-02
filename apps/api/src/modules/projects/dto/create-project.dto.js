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
exports.CreateProjectDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
let CreateProjectDto = (() => {
    let _organizationId_decorators;
    let _organizationId_initializers = [];
    let _organizationId_extraInitializers = [];
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _slug_decorators;
    let _slug_initializers = [];
    let _slug_extraInitializers = [];
    let _description_decorators;
    let _description_initializers = [];
    let _description_extraInitializers = [];
    let _settings_decorators;
    let _settings_initializers = [];
    let _settings_extraInitializers = [];
    let _widgetSettings_decorators;
    let _widgetSettings_initializers = [];
    let _widgetSettings_extraInitializers = [];
    return class CreateProjectDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _organizationId_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Organization ID',
                    example: '123e4567-e89b-12d3-a456-426614174000',
                }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsNotEmpty)()];
            _name_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Project name',
                    example: 'Customer Support Bot',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.Length)(2, 100)];
            _slug_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Project slug (URL-friendly identifier)',
                    example: 'customer-support',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.Length)(2, 50), (0, class_validator_1.Matches)(/^[a-z0-9-]+$/, {
                    message: 'Slug must contain only lowercase letters, numbers, and hyphens',
                })];
            _description_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Project description',
                    example: 'AI-powered customer support chatbot for handling common queries',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.Length)(0, 500)];
            _settings_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Project settings',
                    example: {
                        defaultLanguage: 'en',
                        enableAnalytics: true,
                        maxConversationLength: 50,
                    },
                }), (0, class_validator_1.IsObject)(), (0, class_validator_1.IsOptional)()];
            _widgetSettings_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Widget settings',
                    example: {
                        theme: 'light',
                        position: 'bottom-right',
                        primaryColor: '#3B82F6',
                        greetingMessage: 'Hello! How can I help you today?',
                    },
                }), (0, class_validator_1.IsObject)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _organizationId_decorators, { kind: "field", name: "organizationId", static: false, private: false, access: { has: obj => "organizationId" in obj, get: obj => obj.organizationId, set: (obj, value) => { obj.organizationId = value; } }, metadata: _metadata }, _organizationId_initializers, _organizationId_extraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _slug_decorators, { kind: "field", name: "slug", static: false, private: false, access: { has: obj => "slug" in obj, get: obj => obj.slug, set: (obj, value) => { obj.slug = value; } }, metadata: _metadata }, _slug_initializers, _slug_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _settings_decorators, { kind: "field", name: "settings", static: false, private: false, access: { has: obj => "settings" in obj, get: obj => obj.settings, set: (obj, value) => { obj.settings = value; } }, metadata: _metadata }, _settings_initializers, _settings_extraInitializers);
            __esDecorate(null, null, _widgetSettings_decorators, { kind: "field", name: "widgetSettings", static: false, private: false, access: { has: obj => "widgetSettings" in obj, get: obj => obj.widgetSettings, set: (obj, value) => { obj.widgetSettings = value; } }, metadata: _metadata }, _widgetSettings_initializers, _widgetSettings_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        organizationId = __runInitializers(this, _organizationId_initializers, void 0);
        name = (__runInitializers(this, _organizationId_extraInitializers), __runInitializers(this, _name_initializers, void 0));
        slug = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _slug_initializers, void 0));
        description = (__runInitializers(this, _slug_extraInitializers), __runInitializers(this, _description_initializers, void 0));
        settings = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _settings_initializers, void 0));
        widgetSettings = (__runInitializers(this, _settings_extraInitializers), __runInitializers(this, _widgetSettings_initializers, void 0));
        constructor() {
            __runInitializers(this, _widgetSettings_extraInitializers);
        }
    };
})();
exports.CreateProjectDto = CreateProjectDto;
//# sourceMappingURL=create-project.dto.js.map