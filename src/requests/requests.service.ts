import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { HttpService } from '@nestjs/axios';
import { QueriesService } from 'src/queries/queries.service';
import { Query } from 'src/queries/entities/query.entity';
import { EngineService } from 'src/engine/engine.service';
import { Engine } from 'src/engine/entities/engine.entity';
import { GeminiResponse } from './interfaces/gemini.interface';
import axios, { AxiosResponse } from 'axios';
import { DecoderService } from './decoder/decoder.service';
import { ChatgptResponse } from './interfaces/chatgpt.interfac';
import { DefaultResponse } from 'src/common/interfaces/default.response';

@Injectable()
export class RequestsService {
  constructor(
    private httpService: HttpService,
    private queriesService: QueriesService,
    private engineService: EngineService,
    private decoderService: DecoderService,
  ) {}
  async create(createRequestDto: CreateRequestDto): Promise<DefaultResponse> {
    try {
      const iaQuery: Query | null = await this.queriesService.findOne(1); // query lists id
      const finalQuery: string | undefined = iaQuery?.baseQuery
        .replace('${numberItems}', createRequestDto.numberItems.toString())
        .replace('${listDetails}', createRequestDto.detailOfItems)
        .replace('${itemAtrt}', createRequestDto.fieldsOfItem.join(', '));

      const iaProviders: Engine[] = await this.engineService.findAll();
      for (let index = 0; index < iaProviders.length; index++) {
        const provider = iaProviders[index];
        const headers = {};
        provider.headers.forEach((header) => {
          headers[header.split(':')[0].trim()] = header.split(':')[1].trim();
        });
        const message = provider.body.replace('${message}', finalQuery || '');
        console.log(message);
        const response: AxiosResponse<GeminiResponse | ChatgptResponse, any> =
          await axios.post<GeminiResponse>(
            provider.urls[0],
            JSON.parse(message),
            { headers },
          );
        if (response.status == 200) {
          console.log('Respuesta ok--- decoding--');
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const dataJson: any = this.decoderService.decodeEngineResponse(
            response.data,
          );
          return {
            statusCode: 200,
            message: 'Request created successfully',
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            data: dataJson,
          };
        }
      }
      console.log('termino');
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
    throw new InternalServerErrorException(
      'No se obtuvo respuesta de proveedores IA',
    );
  }
}
