import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
} from 'class-validator';

export class CreateRequestDto {
  @IsNumber()
  @Max(10)
  @IsDefined()
  numberItems: number;
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  detailOfItems: string;
  @IsDefined()
  @IsNotEmpty()
  fieldsOfItem: string[];
}
