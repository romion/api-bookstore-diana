import { Injectable } from '@nestjs/common';

import type { PageDto } from '../../common/dto/page.dto';
import type { BookEntity } from './book.entity';
import { BookRepository } from './book.repository';
import type { BookDto } from './dto/book-dto';
import type { BooksPageOptionsDto } from './dto/books-page-options.dto';
import type { CreateBookDto } from './dto/CreateBookDto';

@Injectable()
export class BookService {
  constructor(public readonly bookRepository: BookRepository) {}

  async getBooks(
    pageOptionsDto: BooksPageOptionsDto,
  ): Promise<PageDto<BookDto>> {
    const queryBuilder = this.bookRepository.createQueryBuilder('book');
    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    return items.toPageDto(pageMetaDto);
  }

  async createBook(bookDto: CreateBookDto): Promise<BookEntity> {
    const user = this.bookRepository.create(bookDto);

    return this.bookRepository.save(user);
  }
}
