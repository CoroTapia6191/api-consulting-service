import { Injectable } from '@nestjs/common';
import { CreateQueryDto } from './dto/create-query.dto';
import { UpdateQueryDto } from './dto/update-query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Query } from './entities/query.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QueriesService {
  constructor(
    @InjectRepository(Query)
    private queryRepository: Repository<Query>,
  ) {}
  create(createQueryDto: CreateQueryDto) {
    return this.queryRepository.save([
      { ...createQueryDto, createdAt: new Date() },
    ]);
  }

  findAll(): Promise<Query[]> {
    return this.queryRepository.find();
  }

  findOne(id: number): Promise<Query | null> {
    return this.queryRepository.findOneBy({ id });
  }

  update(id: number, updateQueryDto: UpdateQueryDto) {
    return this.queryRepository.update(id, updateQueryDto);
  }

  remove(id: number) {
    return this.queryRepository.delete(id);
  }
}
