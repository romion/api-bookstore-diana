import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { BookEntity } from '../book.entity';

export class BookDto extends AbstractDto {
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

  @ApiProperty()
  @IsArray()
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

  constructor(book: BookEntity) {
    super(book);
    this.name = book.name;
    this.isBestseller = book.isBestseller;
    this.author = book.author;
    this.pages = book.pages;
    this.genre = book.genre;
    this.picture = book.picture;
    this.description = book.description;
    this.price = book.price;
  }
}
