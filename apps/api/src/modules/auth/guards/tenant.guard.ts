import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TenantService } from '../../tenant/tenant.service';

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private tenantService: TenantService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    // Get tenant information from request
    const tenantId = request.headers['x-tenant-id'] || request.params.organizationId;

    if (!tenantId) {
      throw new ForbiddenException('Tenant not specified');
    }

    // Verify user has access to this tenant
    const hasAccess = await this.tenantService.userHasAccessToTenant(
      user.id,
      tenantId,
    );

    if (!hasAccess) {
      throw new ForbiddenException('Access denied to this tenant');
    }

    // Add tenant info to request
    request.tenant = { id: tenantId };

    return true;
  }
}