import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional()
  @IsBoolean()
  isBestseller?: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiPropertyOptional()
  @IsNumber()
  pages?: number;

  @ApiProperty({ type: [String] })
  @IsString({ each: true })
  @IsNotEmpty()
  genre: string[];

  @ApiPropertyOptional()
  @IsString()
  picture?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;
}
