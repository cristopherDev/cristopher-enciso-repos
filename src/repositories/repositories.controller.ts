import { Controller, Get } from '@nestjs/common';
import { RepositoriesService } from './repositories.service';

@Controller('repositories')
export class RepositoriesController {
  constructor(private readonly repositoriesService: RepositoriesService) {}

  @Get()
  findAll() {
    return this.repositoriesService.findAll();
  }
}
