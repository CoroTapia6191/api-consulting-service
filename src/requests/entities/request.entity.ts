import { QueryType } from 'src/common/enum/query-type.enum';
import { Query } from 'src/queries/entities/query.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity()
export class Request {
  @Column({
    type: 'enum',
    enum: QueryType,
    nullable: false,
    default: QueryType.ELEMENT,
  })
  type: QueryType;
  @Column({ nullable: false })
  numberItems: number;
  @OneToOne(() => User)
  user: User;
  @OneToOne(() => Query)
  query: Query;
  @Column({ nullable: false })
  details: string;
  @Column({ nullable: false })
  response: string;
}
