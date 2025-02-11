import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateRequestDto {
  @IsNumber()
  @Max(10)
  @Min(1)
  @IsDefined()
  numberItems: number;
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  nameOfCollection: string;
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  detailOfItems: string;
  @IsDefined()
  @IsNotEmpty()
  fieldsOfItem: string[];
}
