import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { TribesService } from './tribes.service';

@Controller('tribes')
export class TribesController {
  constructor(private readonly tribesService: TribesService) {}

  @Get(':id/repositories')
  async findRepositories(@Param('id') id: string): Promise<{} | string> {
    const notFoundText = `La Tribu ${id} no se encuentra registrada`;
    const notCoverageText = `La Tribu ${id} no tiene repositorios que cumplan con la cobertura necesaria`;
    const tribe = await this.tribesService.findRepositories(+id);

    if (!tribe) throw new NotFoundException(notFoundText);
    if (!Object.keys(tribe).length)
      throw new NotFoundException(notCoverageText);

    return tribe;
  }
}
