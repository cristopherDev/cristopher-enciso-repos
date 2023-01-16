import { Test, TestingModule } from '@nestjs/testing';
import { TribesController } from './tribes.controller';
import { TribesService } from './tribes.service';

describe('TribesController', () => {
  let controller: TribesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TribesController],
      providers: [TribesService],
    }).compile();

    controller = module.get<TribesController>(TribesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
