import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export declare class RequestIdMiddleware implements NestMiddleware {
    use(req: Request & {
        id?: string;
    }, res: Response, next: NextFunction): void;
}
//# sourceMappingURL=request-id.middleware.d.ts.map