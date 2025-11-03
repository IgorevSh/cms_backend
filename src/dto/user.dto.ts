import {
  IsOptional,
  IsBoolean,
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsNumber,
  MinLength,
} from 'class-validator';

export class UserDTO {
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Name must be between 2 and 20 characters long' })
  name?: boolean;

  @IsOptional()
  @IsEmail()
  mail?: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: boolean;

  @IsOptional()
  @IsNumber()
  role_id?: number;

  @IsOptional()
  @IsString()
  extra: string;
}
