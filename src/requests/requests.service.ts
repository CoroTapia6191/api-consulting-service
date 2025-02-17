import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { QueriesService } from 'src/queries/queries.service';
import { Query } from 'src/queries/entities/query.entity';
import { EngineService } from 'src/engine/engine.service';
import { Engine } from 'src/engine/entities/engine.entity';
import { GeminiResponse } from './interfaces/gemini.interface';
import axios, { AxiosResponse } from 'axios';
import { DecoderService } from './decoder/decoder.service';
import { ChatgptResponse } from './interfaces/chatgpt.interfac';
import { DefaultResponse } from 'src/common/interfaces/default.response';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from './entities/request.entity';
import { User } from 'src/users/entities/user.entity';
import { QueryType } from 'src/common/enum/query-type.enum';
import { RequestUser } from './entities/request-user';

@Injectable()
export class RequestsService {
  private readonly logger = new Logger('RequestsService');
  constructor(
    private queriesService: QueriesService,
    private engineService: EngineService,
    private decoderService: DecoderService,
    @InjectRepository(Request)
    private requestRepository: Repository<Request>,
    @InjectRepository(RequestUser)
    private requestUserRepository: Repository<RequestUser>,
  ) {}
  async create(
    createRequestDto: CreateRequestDto,
    user: User,
  ): Promise<DefaultResponse> {
    try {
      const iaQueryId: number = 1;
      const iaQuery: Query | null =
        await this.queriesService.findOne(iaQueryId); // query lists id
      if (!iaQuery) {
        throw new InternalServerErrorException('Query not found');
      }
      const finalQuery: string | undefined = iaQuery?.baseQuery
        .replace('${namedata}', createRequestDto.nameOfCollection)
        .replace('${numberItems}', createRequestDto.numberItems.toString())
        .replace('${listDetails}', createRequestDto.detailOfItems)
        .replace('${itemAtrt}', createRequestDto.fieldsOfItem.join(', '));

      const iaProviders: Engine[] = await this.engineService.findAll();
      for (let index = 0; index < iaProviders.length; index++) {
        try {
          const provider = iaProviders[index];
          const headers = {};
          provider.headers.forEach((header) => {
            headers[header.split(':')[0].trim()] = header.split(':')[1].trim();
          });
          const message = provider.body.replace('${message}', finalQuery || '');
          this.logger.log(message);
          const response: AxiosResponse<GeminiResponse | ChatgptResponse, any> =
            await axios.post<GeminiResponse>(
              provider.urls[0],
              JSON.parse(message),
              { headers },
            );
          if (response.status == 200) {
            this.logger.log('Respuesta ok--- decoding--');
            const requestUser: RequestUser | null =
              await this.requestUserRepository.findOneBy({
                user: user.id,
              });
            if (requestUser) {
              const numberRequests = requestUser.numberRequests + 1;
              await this.requestUserRepository.update(requestUser.user, {
                numberRequests: numberRequests,
              });
            } else {
              await this.requestUserRepository.save({
                user: user.id,
                numberRequests: 1,
              });
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const dataJson: any = this.decoderService.decodeEngineResponse(
              response.data,
            );

            const requestDb = await this.requestRepository.save({
              type: QueryType.LIST,
              numberItems: createRequestDto.numberItems,
              user: user.id,
              query: iaQuery.id,
              details: finalQuery,
              response: JSON.stringify(response.data),
              createdAt: new Date(),
              provider: provider.id,
            });

            this.logger.log('Request created', requestDb.id);
            return {
              statusCode: 200,
              message: 'Request created successfully',
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              data: dataJson,
            };
          }
        } catch (error) {
          this.logger.error('error-providers', error);
        }
      }
      this.logger.log('termino proceso');
    } catch (error) {
      this.logger.error('error-providers', error);
      throw new InternalServerErrorException(error);
    }
    throw new InternalServerErrorException(
      'No se obtuvo respuesta de proveedores IA',
    );
  }
}
