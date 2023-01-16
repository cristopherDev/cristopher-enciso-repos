import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tribesService.findOne(+id);
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
