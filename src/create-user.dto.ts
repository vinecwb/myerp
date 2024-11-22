import { IsString, IsEmail, IsPhoneNumber, IsDateString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsDateString()
  birthdate: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber(null)
  phone: string;

  @IsString()
  cpf: string;

  @IsString()
  password: string;

  @IsString()
  role: string;
}
