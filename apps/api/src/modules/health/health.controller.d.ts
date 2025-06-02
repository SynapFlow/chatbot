export declare class HealthController {
    health(): Promise<{
        status: string;
        timestamp: string;
        uptime: number;
    }>;
    ready(): Promise<{
        status: string;
        checks: {
            database: boolean;
            redis: boolean;
            qdrant: boolean;
        };
        timestamp: string;
    }>;
}
//# sourceMappingURL=health.controller.d.ts.map