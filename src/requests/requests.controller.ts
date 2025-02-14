import { Controller, Post, Body, HttpCode, Request } from '@nestjs/common';
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
  createRequestList(
    @Body() createRequestDto: CreateRequestDto,
    @Request() req: any,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.requestsService.create(createRequestDto, req.user);
  }
}
