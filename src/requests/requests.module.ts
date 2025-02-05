import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { HttpModule } from '@nestjs/axios';
import { QueriesModule } from 'src/queries/queries.module';
import { EngineModule } from 'src/engine/engine.module';
import { DecoderService } from './decoder/decoder.service';

@Module({
  imports: [HttpModule, QueriesModule, EngineModule],
  controllers: [RequestsController],
  providers: [RequestsService, DecoderService],
})
export class RequestsModule {}
