import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { HttpModule } from '@nestjs/axios';
import { QueriesModule } from 'src/queries/queries.module';
import { EngineModule } from 'src/engine/engine.module';
import { DecoderService } from './decoder/decoder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from './entities/request.entity';
import { RequestUser } from './entities/request-user';

@Module({
  imports: [
    HttpModule,
    QueriesModule,
    EngineModule,
    TypeOrmModule.forFeature([Request, RequestUser]),
  ],
  controllers: [RequestsController],
  providers: [RequestsService, DecoderService],
})
export class RequestsModule {}
