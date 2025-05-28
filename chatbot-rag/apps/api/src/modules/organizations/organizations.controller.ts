import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrganizationsService } from './organizations.service';

@ApiTags('Organizations')
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}
  // Controller implementation will be added in the next steps
}