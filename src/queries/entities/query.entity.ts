import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { QueryType } from '../../common/enum/query-type.enum';

@Entity()
export class Query {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  description: string;
  @Column({ nullable: false })
  baseQuery: string;
  @Column({
    type: 'enum',
    enum: QueryType,
    nullable: false,
    default: QueryType.ELEMENT,
  })
  type: QueryType;
  @Column({ nullable: false })
  limit: number;
  @Column({ nullable: false })
  createdAt: Date;
  @Column({
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
