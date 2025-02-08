import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEngineDto {
  @IsNotEmpty()
  name: string;
  @IsArray()
  apiKeys: string[];
  @IsNotEmpty()
  @IsDefined()
  urls: string[];
  @IsArray()
  headers: string[];
  @IsString()
  @IsOptional()
  body: string;
}
