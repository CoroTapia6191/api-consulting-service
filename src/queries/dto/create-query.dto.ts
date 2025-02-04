import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { QueryType } from '../../common/enum/query-type.enum';

export class CreateQueryDto {
  @IsDefined()
  description: string;
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  baseQuery: string;
  @IsDefined()
  type: QueryType;
  @IsDefined()
  @IsNumber()
  limit: number;
}
