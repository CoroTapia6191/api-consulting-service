import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  username: string;
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  password: string;
}
