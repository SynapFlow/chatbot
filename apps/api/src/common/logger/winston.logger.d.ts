import { LoggerService } from '@nestjs/common';
export declare class WinstonLogger implements LoggerService {
    private logger;
    constructor();
    log(message: any, context?: string): void;
    error(message: any, trace?: string, context?: string): void;
    warn(message: any, context?: string): void;
    debug(message: any, context?: string): void;
    verbose(message: any, context?: string): void;
}
//# sourceMappingURL=winston.logger.d.ts.map