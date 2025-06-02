import { CreateOrganizationDto } from './create-organization.dto';
declare const UpdateOrganizationDto_base: import("@nestjs/common").Type<Partial<CreateOrganizationDto>>;
export declare class UpdateOrganizationDto extends UpdateOrganizationDto_base {
    settings?: Record<string, any>;
    subscriptionTier?: string;
}
export {};
//# sourceMappingURL=update-organization.dto.d.ts.map