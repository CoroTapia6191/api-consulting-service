import { IsDefined, IsNotEmpty } from 'class-validator';

export class CreateEngineDto {
  @IsNotEmpty()
  name: string;
  apiKeys: string[];
  @IsNotEmpty()
  @IsDefined()
  urls: string[];
  headers: string[];
}
