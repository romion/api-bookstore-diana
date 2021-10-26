import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ nullable: true, default: false })
  isBestseller?: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiPropertyOptional({ nullable: true })
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
