import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  email: string;
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  username: string;
  @MinLength(5)
  @IsString()
  @IsDefined()
  password: string;
}
