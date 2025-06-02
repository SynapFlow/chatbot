import { TenantService } from './tenant.service';
export declare class TenantResolver {
    private _tenantService;
    constructor(_tenantService: TenantService);
    resolveFromApiKey(_apiKey: string): Promise<void>;
    resolveFromDomain(_domain: string): Promise<void>;
    resolveFromPath(_path: string): Promise<void>;
}
//# sourceMappingURL=tenant.resolver.d.ts.map