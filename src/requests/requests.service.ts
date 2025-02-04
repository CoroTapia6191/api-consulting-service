import { Injectable } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { DefaultResponse } from 'src/common/default.response';

@Injectable()
export class RequestsService {
  create(createRequestDto: CreateRequestDto): DefaultResponse {
    console.log(createRequestDto);
    return {
      code: 201,
      message: 'Request created successfully',
      data: createRequestDto,
    };
  }
}
