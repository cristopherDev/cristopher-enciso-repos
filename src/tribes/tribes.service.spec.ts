import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { TribesService } from './tribes.service';

describe('TribesService', () => {
  let service: TribesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TribesService, PrismaService],
    }).compile();

    service = module.get<TribesService>(TribesService);
  });

  describe('findRepositories()', () => {
    it('Obtener métricas de repositorios por tribu', async () => {
      const id = 1;
      const repositories = await service.findRepositories(id);
      expect(repositories)
      expect(typeof repositories).toBe('object');
    });
  });
});
