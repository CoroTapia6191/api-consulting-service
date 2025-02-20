import { QueryType } from 'src/common/enum/query-type.enum';

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'enum',
    enum: QueryType,
    nullable: false,
    default: QueryType.ELEMENT,
  })
  type: QueryType;
  @Column({ nullable: false })
  numberItems: number;
  @Column({ nullable: false })
  user: number;
  @Column({ nullable: false })
  query: number;
  @Column({ nullable: false })
  provider: number;
  @Column()
  details: string;
  @Column({ nullable: false })
  response: string;
  @Column({ nullable: false })
  createdAt: Date;
  @Column({
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
