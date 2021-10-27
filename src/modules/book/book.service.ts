import { Injectable } from '@nestjs/common';

import { PageDto } from '../../common/dto/page.dto';
import { PageMetaDto } from '../../common/dto/page-meta.dto';
import type { PageOptionsDto } from '../../common/dto/page-options.dto';
import type { BookEntity } from './book.entity';
import { BookRepository } from './book.repository';
import type { BookDto } from './dto/book-dto';
import type { CreateBookDto } from './dto/CreateBookDto';

@Injectable()
export class BookService {
  constructor(public readonly bookRepository: BookRepository) {}

  async getBooks(pageOptionsDto: PageOptionsDto): Promise<PageDto<BookDto>> {
    const queryBuilder = this.bookRepository.createQueryBuilder('book');

    queryBuilder
      .orderBy('book.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async createBook(bookDto: CreateBookDto): Promise<BookEntity> {
    const user = this.bookRepository.create(bookDto);

    return this.bookRepository.save(user);
  }
}
