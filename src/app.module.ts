import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { TribesModule } from './tribes/tribes.module';
import { RepositoriesModule } from './repositories/repositories.module';

@Module({
  imports: [PrismaModule, OrganizationsModule, TribesModule, RepositoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
