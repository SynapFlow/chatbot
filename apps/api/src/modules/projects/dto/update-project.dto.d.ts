import { CreateProjectDto } from './create-project.dto';
declare const UpdateProjectDto_base: import("@nestjs/common").Type<Partial<Omit<CreateProjectDto, "organizationId">>>;
export declare class UpdateProjectDto extends UpdateProjectDto_base {
    isActive?: boolean;
}
export {};
//# sourceMappingURL=update-project.dto.d.ts.map