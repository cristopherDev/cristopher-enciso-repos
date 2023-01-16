import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { OrganizationsService } from './organizations.service';

describe('OrganizationsService', () => {
  let service: OrganizationsService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationsService, PrismaService],
    }).compile();

    service = module.get<OrganizationsService>(OrganizationsService)
  });

  describe('findAll()', () => {
    it('should return list of organizations', async () => {
      const list = await service.findAll()
      console.log(list)
      expect(typeof list).toBe('object')
    })
  })
});
