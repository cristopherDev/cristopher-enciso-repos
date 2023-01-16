import { Module } from '@nestjs/common';
import { TribesService } from './tribes.service';
import { TribesController } from './tribes.controller';

@Module({
  controllers: [TribesController],
  providers: [TribesService]
})
export class TribesModule {}
