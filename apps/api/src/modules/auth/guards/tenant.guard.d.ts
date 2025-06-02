import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TenantService } from '../../tenant/tenant.service';
export declare class TenantGuard implements CanActivate {
    private reflector;
    private tenantService;
    constructor(reflector: Reflector, tenantService: TenantService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
//# sourceMappingURL=tenant.guard.d.ts.map