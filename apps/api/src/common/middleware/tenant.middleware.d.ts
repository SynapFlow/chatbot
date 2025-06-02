import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export interface TenantRequest extends Request {
    tenant?: {
        organizationId?: string;
        projectId?: string;
    };
}
export declare class TenantMiddleware implements NestMiddleware {
    use(req: TenantRequest, _res: Response, next: NextFunction): void;
}
//# sourceMappingURL=tenant.middleware.d.ts.map