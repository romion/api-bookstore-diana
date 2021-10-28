import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class BookFilterDto {
  @ApiPropertyOptional()
  @Type(() => String)
  @IsString()
  @IsOptional()
  readonly genre: string;
}
