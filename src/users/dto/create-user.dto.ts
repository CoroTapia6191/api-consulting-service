import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  email: string;
  @IsOptional()
  @IsString()
  username: string;
  @MinLength(5)
  @IsString()
  @IsDefined()
  password: string;
}
