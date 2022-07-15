import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCeilingDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  perfs?: string;

  @IsString()
  @IsOptional()
  reference?: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  price?: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  width?: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  height?: number;
}
