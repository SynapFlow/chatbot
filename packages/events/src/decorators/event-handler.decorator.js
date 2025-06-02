"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EVENT_HANDLER_METADATA = void 0;
exports.OnEvent = OnEvent;
exports.OnDocumentEvent = OnDocumentEvent;
exports.OnConversationEvent = OnConversationEvent;
exports.OnUserEvent = OnUserEvent;
exports.OnSystemEvent = OnSystemEvent;
exports.OnWebhookEvent = OnWebhookEvent;
exports.OnAnalyticsEvent = OnAnalyticsEvent;
exports.OnAnyEvent = OnAnyEvent;
const common_1 = require("@nestjs/common");
exports.EVENT_HANDLER_METADATA = 'EVENT_HANDLER_METADATA';
function OnEvent(eventType, options) {
    return (0, common_1.SetMetadata)(exports.EVENT_HANDLER_METADATA, {
        eventType,
        options,
    });
}
// Specific event decorators
function OnDocumentEvent(eventType, options) {
    return OnEvent(`document.${eventType}`, options);
}
function OnConversationEvent(eventType, options) {
    return OnEvent(`conversation.${eventType}`, options);
}
function OnUserEvent(eventType, options) {
    return OnEvent(`user.${eventType}`, options);
}
function OnSystemEvent(eventType, options) {
    return OnEvent(`system.${eventType}`, options);
}
function OnWebhookEvent(eventType, options) {
    return OnEvent(`webhook.${eventType}`, options);
}
function OnAnalyticsEvent(eventType, options) {
    return OnEvent(`analytics.${eventType}`, options);
}
// Catch-all event decorator
function OnAnyEvent(options) {
    return OnEvent('*', options);
}
//# sourceMappingURL=event-handler.decorator.js.map