import {
  IsEmail,
  IsString,
  MinLength,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsBoolean()
  @IsNotEmpty()
  agreeToTerms: boolean;
}
