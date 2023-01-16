import { Test, TestingModule } from '@nestjs/testing';
import { RepositoriesController } from './repositories.controller';
import { RepositoriesService } from './repositories.service';

describe('RepositoriesController', () => {
  let controller: RepositoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepositoriesController],
      providers: [RepositoriesService],
    }).compile();

    controller = module.get<RepositoriesController>(RepositoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return list of repositories', async () => {
      const list = await controller.findAll()
      expect(typeof list).toBe('object');
    });
  });
});
