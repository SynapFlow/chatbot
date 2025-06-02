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
exports.UpdateOrganizationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_organization_dto_1 = require("./create-organization.dto");
const class_validator_1 = require("class-validator");
const swagger_2 = require("@nestjs/swagger");
let UpdateOrganizationDto = (() => {
    let _classSuper = (0, swagger_1.PartialType)(create_organization_dto_1.CreateOrganizationDto);
    let _settings_decorators;
    let _settings_initializers = [];
    let _settings_extraInitializers = [];
    let _subscriptionTier_decorators;
    let _subscriptionTier_initializers = [];
    let _subscriptionTier_extraInitializers = [];
    return class UpdateOrganizationDto extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _settings_decorators = [(0, swagger_2.ApiPropertyOptional)({
                    description: 'Organization settings',
                    example: { theme: 'dark', language: 'en' },
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsObject)()];
            _subscriptionTier_decorators = [(0, swagger_2.ApiPropertyOptional)({
                    description: 'Subscription tier',
                    enum: ['free', 'starter', 'pro', 'enterprise'],
                    example: 'pro',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(['free', 'starter', 'pro', 'enterprise'])];
            __esDecorate(null, null, _settings_decorators, { kind: "field", name: "settings", static: false, private: false, access: { has: obj => "settings" in obj, get: obj => obj.settings, set: (obj, value) => { obj.settings = value; } }, metadata: _metadata }, _settings_initializers, _settings_extraInitializers);
            __esDecorate(null, null, _subscriptionTier_decorators, { kind: "field", name: "subscriptionTier", static: false, private: false, access: { has: obj => "subscriptionTier" in obj, get: obj => obj.subscriptionTier, set: (obj, value) => { obj.subscriptionTier = value; } }, metadata: _metadata }, _subscriptionTier_initializers, _subscriptionTier_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        settings = __runInitializers(this, _settings_initializers, void 0);
        subscriptionTier = (__runInitializers(this, _settings_extraInitializers), __runInitializers(this, _subscriptionTier_initializers, void 0));
        constructor() {
            super(...arguments);
            __runInitializers(this, _subscriptionTier_extraInitializers);
        }
    };
})();
exports.UpdateOrganizationDto = UpdateOrganizationDto;
//# sourceMappingURL=update-organization.dto.js.map