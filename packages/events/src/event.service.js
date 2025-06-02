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
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let EventService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var EventService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            EventService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        eventEmitter;
        queueService;
        configService;
        logger = new common_1.Logger(EventService.name);
        eventStore = new Map();
        subscriptions = new Map();
        deliveries = new Map();
        isProcessing = false;
        processingInterval;
        constructor(eventEmitter, queueService, configService) {
            this.eventEmitter = eventEmitter;
            this.queueService = queueService;
            this.configService = configService;
            this.startEventProcessing();
        }
        async onModuleDestroy() {
            if (this.processingInterval) {
                clearInterval(this.processingInterval);
            }
        }
        // Event Publishing
        async publishEvent(event, options = {}) {
            const fullEvent = {
                ...event,
                id: (0, uuid_1.v4)(),
                timestamp: new Date(),
                version: '1.0',
                metadata: {
                    ...event.metadata,
                    ...options.metadata,
                },
            };
            // Store event
            await this.storeEvent(fullEvent);
            // Emit event locally
            this.eventEmitter.emit(fullEvent.type, fullEvent);
            this.eventEmitter.emit('*', fullEvent);
            // Process webhooks if not skipped
            if (!options.skipWebhooks) {
                await this.processWebhooks(fullEvent, options);
            }
            this.logger.debug(`Published event ${fullEvent.type} with ID ${fullEvent.id}`);
            return fullEvent.id;
        }
        async publishBatch(events, options = {}) {
            const publishedIds = [];
            for (const event of events) {
                const eventId = await this.publishEvent(event, options);
                publishedIds.push(eventId);
            }
            return publishedIds;
        }
        // Event Publishing Helpers
        async publishDocumentEvent(type, data, tenantId, userId, options) {
            return this.publishEvent({
                type,
                tenantId,
                userId,
                source: 'document-service',
                data,
            }, options);
        }
        async publishConversationEvent(type, data, tenantId, userId, options) {
            return this.publishEvent({
                type,
                tenantId,
                userId,
                source: 'chat-service',
                data,
            }, options);
        }
        async publishUserEvent(type, data, tenantId, userId, options) {
            return this.publishEvent({
                type,
                tenantId,
                userId,
                source: 'user-service',
                data,
            }, options);
        }
        async publishSystemEvent(type, data, tenantId = 'system', options) {
            return this.publishEvent({
                type,
                tenantId,
                source: 'system',
                data,
            }, options);
        }
        async publishAnalyticsEvent(type, data, tenantId, userId, options) {
            return this.publishEvent({
                type,
                tenantId,
                userId,
                source: 'analytics-service',
                data,
            }, options);
        }
        // Event Retrieval
        async getEvent(eventId) {
            return this.eventStore.get(eventId) || null;
        }
        async getEvents(filter) {
            let events = Array.from(this.eventStore.values());
            // Apply filters
            if (filter.tenantId) {
                events = events.filter(event => event.tenantId === filter.tenantId);
            }
            if (filter.userId) {
                events = events.filter(event => event.userId === filter.userId);
            }
            if (filter.types && filter.types.length > 0) {
                events = events.filter(event => filter.types.includes(event.type));
            }
            if (filter.fromDate) {
                events = events.filter(event => event.timestamp >= filter.fromDate);
            }
            if (filter.toDate) {
                events = events.filter(event => event.timestamp <= filter.toDate);
            }
            if (filter.source) {
                events = events.filter(event => event.source === filter.source);
            }
            // Sort by timestamp (newest first)
            events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
            // Apply pagination
            const offset = filter.offset || 0;
            const limit = filter.limit || 100;
            return events.slice(offset, offset + limit);
        }
        // Webhook Subscriptions
        async createSubscription(subscription) {
            const fullSubscription = {
                ...subscription,
                id: (0, uuid_1.v4)(),
                createdAt: new Date(),
                updatedAt: new Date(),
                successCount: 0,
                failureCount: 0,
            };
            this.subscriptions.set(fullSubscription.id, fullSubscription);
            this.logger.log(`Created webhook subscription ${fullSubscription.id} for ${fullSubscription.name}`);
            return fullSubscription;
        }
        async updateSubscription(subscriptionId, updates) {
            const subscription = this.subscriptions.get(subscriptionId);
            if (!subscription) {
                return null;
            }
            const updatedSubscription = {
                ...subscription,
                ...updates,
                id: subscription.id, // Prevent ID changes
                createdAt: subscription.createdAt, // Prevent creation date changes
                updatedAt: new Date(),
            };
            this.subscriptions.set(subscriptionId, updatedSubscription);
            return updatedSubscription;
        }
        async deleteSubscription(subscriptionId) {
            const deleted = this.subscriptions.delete(subscriptionId);
            if (deleted) {
                this.logger.log(`Deleted webhook subscription ${subscriptionId}`);
            }
            return deleted;
        }
        async getSubscription(subscriptionId) {
            return this.subscriptions.get(subscriptionId) || null;
        }
        async getSubscriptions(tenantId) {
            let subscriptions = Array.from(this.subscriptions.values());
            if (tenantId) {
                subscriptions = subscriptions.filter(sub => sub.tenantId === tenantId);
            }
            return subscriptions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        }
        // Event Deliveries
        async getDeliveries(subscriptionId, eventId, status) {
            let deliveries = Array.from(this.deliveries.values());
            if (subscriptionId) {
                deliveries = deliveries.filter(delivery => delivery.subscriptionId === subscriptionId);
            }
            if (eventId) {
                deliveries = deliveries.filter(delivery => delivery.eventId === eventId);
            }
            if (status) {
                deliveries = deliveries.filter(delivery => delivery.status === status);
            }
            return deliveries.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        }
        async retryDelivery(deliveryId) {
            const delivery = this.deliveries.get(deliveryId);
            if (!delivery || delivery.status === 'delivered') {
                return false;
            }
            delivery.status = 'pending';
            delivery.attempt = 0;
            this.deliveries.set(deliveryId, delivery);
            const event = await this.getEvent(delivery.eventId);
            if (event) {
                await this.scheduleWebhookDelivery(delivery, event);
            }
            return true;
        }
        // Statistics
        async getEventStats(tenantId, fromDate, toDate) {
            let events = Array.from(this.eventStore.values());
            // Apply filters
            if (tenantId) {
                events = events.filter(event => event.tenantId === tenantId);
            }
            if (fromDate) {
                events = events.filter(event => event.timestamp >= fromDate);
            }
            if (toDate) {
                events = events.filter(event => event.timestamp <= toDate);
            }
            // Calculate statistics
            const eventsByType = {};
            const eventsByTenant = {};
            events.forEach(event => {
                eventsByType[event.type] = (eventsByType[event.type] || 0) + 1;
                eventsByTenant[event.tenantId] = (eventsByTenant[event.tenantId] || 0) + 1;
            });
            const topEventTypes = Object.entries(eventsByType)
                .map(([type, count]) => ({
                type,
                count,
                percentage: (count / events.length) * 100,
            }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 10);
            const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
            const recentEvents = events.filter(event => event.timestamp >= oneDayAgo).length;
            return {
                totalEvents: events.length,
                eventsByType,
                eventsByTenant,
                recentEvents,
                averageEventsPerDay: this.calculateAverageEventsPerDay(events),
                topEventTypes,
            };
        }
        async getWebhookStats(tenantId) {
            const subscriptions = await this.getSubscriptions(tenantId);
            const deliveries = Array.from(this.deliveries.values());
            const successfulDeliveries = deliveries.filter(d => d.status === 'delivered').length;
            const failedDeliveries = deliveries.filter(d => d.status === 'failed').length;
            const totalDeliveries = deliveries.length;
            const responseTimeSum = deliveries
                .filter(d => d.responseTime)
                .reduce((sum, d) => sum + (d.responseTime || 0), 0);
            const averageResponseTime = responseTimeSum / Math.max(successfulDeliveries, 1);
            const deliverySuccessRate = totalDeliveries > 0 ? (successfulDeliveries / totalDeliveries) * 100 : 0;
            const failureReasons = {};
            deliveries
                .filter(d => d.status === 'failed' && d.error)
                .forEach(d => {
                const reason = d.error.substring(0, 100); // Truncate long errors
                failureReasons[reason] = (failureReasons[reason] || 0) + 1;
            });
            const topFailureReasons = Object.entries(failureReasons)
                .map(([reason, count]) => ({ reason, count }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 5);
            return {
                totalSubscriptions: subscriptions.length,
                activeSubscriptions: subscriptions.filter(s => s.active).length,
                totalDeliveries,
                successfulDeliveries,
                failedDeliveries,
                averageResponseTime,
                deliverySuccessRate,
                topFailureReasons,
            };
        }
        // Private methods
        async storeEvent(event) {
            this.eventStore.set(event.id, event);
            // In a real implementation, persist to database
            // Also implement cleanup of old events
            if (this.eventStore.size > 10000) {
                const oldestEvents = Array.from(this.eventStore.entries())
                    .sort(([, a], [, b]) => a.timestamp.getTime() - b.timestamp.getTime())
                    .slice(0, 1000);
                oldestEvents.forEach(([id]) => this.eventStore.delete(id));
            }
        }
        async processWebhooks(event, options) {
            const matchingSubscriptions = Array.from(this.subscriptions.values())
                .filter(sub => sub.active &&
                sub.tenantId === event.tenantId &&
                sub.eventTypes.includes(event.type));
            for (const subscription of matchingSubscriptions) {
                if (this.matchesFilters(event, subscription.filters)) {
                    await this.createWebhookDelivery(subscription, event);
                }
            }
        }
        matchesFilters(event, filters) {
            if (!filters || Object.keys(filters).length === 0) {
                return true;
            }
            // Simple filter matching - extend as needed
            for (const [key, value] of Object.entries(filters)) {
                if (key === 'userId' && event.userId !== value) {
                    return false;
                }
                if (key === 'source' && event.source !== value) {
                    return false;
                }
                // Add more filter logic as needed
            }
            return true;
        }
        async createWebhookDelivery(subscription, event) {
            const delivery = {
                id: (0, uuid_1.v4)(),
                subscriptionId: subscription.id,
                eventId: event.id,
                webhookUrl: subscription.webhookUrl,
                method: subscription.method,
                headers: subscription.headers || {},
                payload: this.buildWebhookPayload(event, subscription),
                attempt: 0,
                maxAttempts: subscription.retryPolicy.maxAttempts,
                status: 'pending',
                scheduledAt: new Date(),
                createdAt: new Date(),
            };
            this.deliveries.set(delivery.id, delivery);
            await this.scheduleWebhookDelivery(delivery, event);
        }
        buildWebhookPayload(event, subscription) {
            return {
                subscriptionId: subscription.id,
                event: {
                    id: event.id,
                    type: event.type,
                    tenantId: event.tenantId,
                    userId: event.userId,
                    timestamp: event.timestamp.toISOString(),
                    data: event.data,
                    metadata: event.metadata,
                },
                deliveryAttempt: 1,
            };
        }
        async scheduleWebhookDelivery(delivery, event) {
            try {
                await this.queueService.addWebhookJob({
                    url: delivery.webhookUrl,
                    method: delivery.method,
                    headers: delivery.headers,
                    payload: delivery.payload,
                    tenantId: event.tenantId,
                    eventType: event.type,
                    eventId: event.id,
                    retryAttempts: delivery.maxAttempts,
                });
                this.logger.debug(`Scheduled webhook delivery ${delivery.id} for event ${event.id}`);
            }
            catch (error) {
                this.logger.error(`Failed to schedule webhook delivery ${delivery.id}`, error);
                delivery.status = 'failed';
                delivery.error = error.message;
                this.deliveries.set(delivery.id, delivery);
            }
        }
        startEventProcessing() {
            const interval = this.configService.get('EVENT_PROCESSING_INTERVAL', 5000);
            this.processingInterval = setInterval(async () => {
                if (!this.isProcessing) {
                    this.isProcessing = true;
                    try {
                        await this.processFailedDeliveries();
                    }
                    catch (error) {
                        this.logger.error('Error processing failed deliveries', error);
                    }
                    finally {
                        this.isProcessing = false;
                    }
                }
            }, interval);
        }
        async processFailedDeliveries() {
            const failedDeliveries = Array.from(this.deliveries.values())
                .filter(delivery => delivery.status === 'failed' &&
                delivery.attempt < delivery.maxAttempts);
            for (const delivery of failedDeliveries) {
                const event = await this.getEvent(delivery.eventId);
                if (event) {
                    await this.scheduleWebhookDelivery(delivery, event);
                }
            }
        }
        calculateAverageEventsPerDay(events) {
            if (events.length === 0)
                return 0;
            const oldestEvent = events.reduce((oldest, event) => event.timestamp < oldest.timestamp ? event : oldest);
            const daysSinceOldest = Math.max((Date.now() - oldestEvent.timestamp.getTime()) / (1000 * 60 * 60 * 24), 1);
            return events.length / daysSinceOldest;
        }
    };
    return EventService = _classThis;
})();
exports.EventService = EventService;
//# sourceMappingURL=event.service.js.map