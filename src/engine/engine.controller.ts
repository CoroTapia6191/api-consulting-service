import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EngineService } from './engine.service';
import { CreateEngineDto } from './dto/create-engine.dto';
import { UpdateEngineDto } from './dto/update-engine.dto';
import { Role } from 'src/users/entities/role.enum';
import { Roles } from 'src/common/decorators/role-service.decorator';

@Roles(Role.ADMIN)
@Controller('engine')
export class EngineController {
  constructor(private readonly engineService: EngineService) {}

  @Post()
  create(@Body() createEngineDto: CreateEngineDto) {
    return this.engineService.create(createEngineDto);
  }

  @Get()
  findAll() {
    return this.engineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.engineService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEngineDto: UpdateEngineDto) {
    return this.engineService.update(+id, updateEngineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.engineService.remove(+id);
  }
}
