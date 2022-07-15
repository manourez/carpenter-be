import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCeilingDto {
  @IsString()
  name: string;

  @IsString()
  imageUrl: string;

  @IsString()
  reference: string;

  @IsString()
  @IsOptional()
  perfs?: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  price: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  width: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  height: number;
}
