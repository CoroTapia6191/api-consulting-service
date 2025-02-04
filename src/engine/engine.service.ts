import { Injectable } from '@nestjs/common';
import { CreateEngineDto } from './dto/create-engine.dto';
import { UpdateEngineDto } from './dto/update-engine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Engine } from './entities/engine.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EngineService {
  constructor(
    @InjectRepository(Engine)
    private engineRepository: Repository<Engine>,
  ) {}
  create(createEngineDto: CreateEngineDto) {
    return this.engineRepository.save([
      { ...createEngineDto, createdAt: new Date() },
    ]);
  }

  findAll(): Promise<Engine[]> {
    return this.engineRepository.find();
  }

  findOne(id: number): Promise<Engine | null> {
    return this.engineRepository.findOneBy({ id });
  }

  update(id: number, updateEngineDto: UpdateEngineDto) {
    return this.engineRepository.update(id, updateEngineDto);
  }

  remove(id: number) {
    return this.engineRepository.delete(id);
  }
}
