import { Controller, Post, Body } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';

@Controller('executes')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  createRequestList(@Body() createRequestDto: CreateRequestDto) {
    return this.requestsService.create(createRequestDto);
  }
}
