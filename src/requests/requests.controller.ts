import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { Roles } from 'src/common/decorators/role-service.decorator';
import { Role } from 'src/users/entities/role.enum';

@Roles(Role.GUEST, Role.USER, Role.ADMIN)
@Controller('executes')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  @HttpCode(200)
  createRequestList(@Body() createRequestDto: CreateRequestDto) {
    return this.requestsService.create(createRequestDto);
  }
}
