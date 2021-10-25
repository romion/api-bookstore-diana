import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { BookEntity } from '../book.entity';

export class BookDto extends AbstractDto {
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

  constructor(book: BookEntity) {
    super(book);
    this.name = book.name;
    this.isBestseller = book.isBestseller;
    this.author = book.author;
    this.pages = book.pages;
    this.genre = book.genre;
    this.picture = book.picture;
    this.price = book.price;
  }
}
