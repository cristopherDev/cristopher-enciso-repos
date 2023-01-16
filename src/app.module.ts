import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { TribesModule } from './tribes/tribes.module';

@Module({
  imports: [PrismaModule, OrganizationsModule, TribesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
