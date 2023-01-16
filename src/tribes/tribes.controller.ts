import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { TribesService } from './tribes.service';
import { CreateTribeDto } from './dto/create-tribe.dto';
import { UpdateTribeDto } from './dto/update-tribe.dto';

@Controller('tribes')
export class TribesController {
  constructor(private readonly tribesService: TribesService) {}

  @Post()
  create(@Body() createTribeDto: CreateTribeDto) {
    return this.tribesService.create(createTribeDto);
  }

  @Get()
  findAll() {
    return this.tribesService.findAll();
  }

  @Get(':id/repositories')
  async findRepositories(@Param('id') id: string) {
    const notFoundText = 'La Tribu no se encuentra registrada';
    const tribe = await this.tribesService.findRepositories(+id);

    if (!tribe) throw new NotFoundException(notFoundText);

    return tribe;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTribeDto: UpdateTribeDto) {
    return this.tribesService.update(+id, updateTribeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tribesService.remove(+id);
  }
}
