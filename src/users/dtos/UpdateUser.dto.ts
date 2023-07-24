import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDTO {
  id: number;

  name: string;
    @IsEmail()
    @IsOptional()
  email: string;

  password: string;
}
