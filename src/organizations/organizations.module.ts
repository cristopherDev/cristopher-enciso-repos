import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationsController } from './organizations.controller';
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  controllers: [OrganizationsController],
  providers: [OrganizationsService],
  imports: [PrismaModule]
})
export class OrganizationsModule {}
