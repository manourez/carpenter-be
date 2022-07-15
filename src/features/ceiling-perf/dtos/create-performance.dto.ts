import { IsString } from 'class-validator';

export class CreatePerformanceDto {
  @IsString()
  name: string;
}
