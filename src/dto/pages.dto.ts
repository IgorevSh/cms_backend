import {
  IsOptional,
  IsBoolean,
  IsString,
  Length,
  IsNumber,
} from 'class-validator';

export class PagesDTO {
  @IsOptional()
  @IsBoolean()
  visible?: boolean;

  @IsOptional()
  @IsString()
  @Length(5, 20, { message: 'Name must be between 5 and 20 characters long' })
  name?: boolean;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  meta?: string;

  @IsOptional()
  @IsBoolean()
  users_access?: boolean;

  @IsOptional()
  @IsNumber()
  parent_id?: number;
}
