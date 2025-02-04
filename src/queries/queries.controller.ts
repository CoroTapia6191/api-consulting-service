import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QueriesService } from './queries.service';
import { CreateQueryDto } from './dto/create-query.dto';
import { UpdateQueryDto } from './dto/update-query.dto';

@Controller('queries')
export class QueriesController {
  constructor(private readonly queriesService: QueriesService) {}

  @Post()
  create(@Body() createQueryDto: CreateQueryDto) {
    return this.queriesService.create(createQueryDto);
  }

  @Get()
  findAll() {
    return this.queriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQueryDto: UpdateQueryDto) {
    return this.queriesService.update(+id, updateQueryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.queriesService.remove(+id);
  }
}
