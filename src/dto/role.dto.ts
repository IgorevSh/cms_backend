import {
  IsOptional,
  IsBoolean,
  IsObject,
  IsString,
  Length,
} from 'class-validator';

export class RoleDTO {
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @IsString()
  @Length(5, 20, { message: 'Name must be between 5 and 20 characters long' })
  name?: boolean;

  @IsOptional()
  @IsBoolean()
  roles_access?: boolean;

  @IsOptional()
  @IsBoolean()
  audit_access?: boolean;

  @IsOptional()
  @IsBoolean()
  users_access?: boolean;

  @IsOptional()
  @IsObject()
  structure?: {
    [key: number]: [number]; // Массив, содержащий одно число
  };
}
