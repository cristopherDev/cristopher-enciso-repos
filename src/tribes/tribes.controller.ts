import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Post,
  Res,
} from '@nestjs/common';
import { TribesService } from './tribes.service';
import { json2csvAsync } from 'json-2-csv';
import type { Response } from 'express';

const notFoundText: string = `La Tribu no se encuentra registrada`;
const notCoverageText: string = `La Tribu no tiene repositorios que cumplan con la cobertura necesaria`;

@Controller('tribes')
export class TribesController {
  constructor(private readonly tribesService: TribesService) {}

  @Get(':id/repositories')
  async findRepositories(@Param('id') id: string): Promise<{} | string> {
    const tribe = await this.tribesService.findRepositories(+id);

    if (!tribe) throw new NotFoundException(notFoundText);
    if (!Object.keys(tribe).length)
      throw new NotFoundException(notCoverageText);

    return { repositories: tribe };
  }

  @Get(':id/repositories/report')
  async exportRepositories(@Param('id') id: string, @Res() res: Response) {
    const tribe = await this.tribesService.findRepositories(+id);

    if (!tribe) throw new NotFoundException(notFoundText);
    if (!Object.keys(tribe).length)
      throw new NotFoundException(notCoverageText);

    const csv = await json2csvAsync(tribe);

    res.header('Content-Type', 'text/csv');
    res.attachment('repositories.csv');

    return res.send(csv);
  }
}
