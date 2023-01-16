import { Test, TestingModule } from '@nestjs/testing';
import { TribesService } from './tribes.service';

describe('TribesService', () => {
  let service: TribesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TribesService],
    }).compile();

    service = module.get<TribesService>(TribesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
