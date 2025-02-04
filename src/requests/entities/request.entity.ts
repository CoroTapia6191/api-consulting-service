import { QueryType } from 'src/common/enum/query-type.enum';
import { Query } from 'src/queries/entities/query.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity } from 'typeorm';

@Entity()
export class Request {
  type: QueryType;
  numberItems: number;
  user: User;
  query: Query;
  details: string;
}
