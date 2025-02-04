import { Module } from '@nestjs/common';
import { EngineService } from './engine.service';
import { EngineController } from './engine.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Engine } from './entities/engine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Engine])],
  controllers: [EngineController],
  providers: [EngineService],
})
export class EngineModule {}
