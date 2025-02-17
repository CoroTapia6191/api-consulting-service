import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './entities/role.enum';
import { Roles } from 'src/common/decorators/role-service.decorator';
import { Public } from 'src/common/decorators/public-service.decorator';
@Roles(Role.ADMIN)
@Controller('users')
export class UsersController {
  private readonly logger = new Logger('RequestsService');
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  //@UseGuards(RolesGuard) its global
  findAll() {
    return this.usersService.findAll();
  }

  //@Roles(Role.GUEST)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.warn(`Intento borrar ${id}`);
    // return this.usersService.remove(+id);
  }
}
