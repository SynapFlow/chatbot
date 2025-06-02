import { EventHandlerOptions } from '../types';
export declare const EVENT_HANDLER_METADATA = "EVENT_HANDLER_METADATA";
export interface EventHandlerMetadata {
    eventType: string;
    options?: EventHandlerOptions;
}
export declare function OnEvent(eventType: string, options?: EventHandlerOptions): MethodDecorator;
export declare function OnDocumentEvent(eventType: string, options?: EventHandlerOptions): MethodDecorator;
export declare function OnConversationEvent(eventType: string, options?: EventHandlerOptions): MethodDecorator;
export declare function OnUserEvent(eventType: string, options?: EventHandlerOptions): MethodDecorator;
export declare function OnSystemEvent(eventType: string, options?: EventHandlerOptions): MethodDecorator;
export declare function OnWebhookEvent(eventType: string, options?: EventHandlerOptions): MethodDecorator;
export declare function OnAnalyticsEvent(eventType: string, options?: EventHandlerOptions): MethodDecorator;
export declare function OnAnyEvent(options?: EventHandlerOptions): MethodDecorator;
//# sourceMappingURL=event-handler.decorator.d.ts.map