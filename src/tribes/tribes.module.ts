import { Module } from '@nestjs/common';
import { TribesService } from './tribes.service';
import { TribesController } from './tribes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TribesController],
  providers: [TribesService],
  imports: [PrismaModule],
})
export class TribesModule {}
