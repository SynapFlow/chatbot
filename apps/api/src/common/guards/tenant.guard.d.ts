import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
export declare const REQUIRE_TENANT_KEY = "requireTenant";
export declare const RequireTenant: (type?: "organization" | "project" | "both") => {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
export declare class TenantGuard implements CanActivate {
    private reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private checkOrganizationAccess;
    private checkProjectAccess;
}
//# sourceMappingURL=tenant.guard.d.ts.map