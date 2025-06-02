import { LoggerService as NestLoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class LoggerService implements NestLoggerService {
    private configService;
    private logger;
    private context?;
    constructor(configService: ConfigService);
    setContext(context: string): void;
    log(message: any, context?: string): void;
    error(message: any, trace?: string, context?: string): void;
    warn(message: any, context?: string): void;
    debug(message: any, context?: string): void;
    verbose(message: any, context?: string): void;
    private createLogger;
    private formatMessage;
    logRequest(method: string, url: string, statusCode: number, duration: number): void;
    logDatabaseQuery(query: string, duration: number, params?: any[]): void;
    logExternalApiCall(service: string, endpoint: string, duration: number, statusCode?: number): void;
    logBusinessEvent(event: string, userId?: string, metadata?: any): void;
    logSecurityEvent(event: string, userId?: string, ip?: string, metadata?: any): void;
}
//# sourceMappingURL=logger.service.d.ts.map