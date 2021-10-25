import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiPropertyOptional()
  @IsBoolean()
  isBestseller?: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  author?: string;

  @ApiPropertyOptional()
  @IsNumber()
  pages?: number;

  @ApiPropertyOptional()
  @IsString()
  genre?: string;

  @ApiPropertyOptional()
  @IsString()
  picture?: string;

  @ApiPropertyOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price?: number;
}
