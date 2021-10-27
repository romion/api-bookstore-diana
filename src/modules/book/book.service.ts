import { Injectable } from '@nestjs/common';

import { PageDto } from '../../common/dto/page.dto';
import { PageMetaDto } from '../../common/dto/page-meta.dto';
import type { PageOptionsDto } from '../../common/dto/page-options.dto';
import { BookNotFoundException } from '../../exceptions/book-not-found.exception';
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

  async getBook(bookId: string): Promise<BookDto> {
    const queryBuilder = this.bookRepository.createQueryBuilder('book');

    queryBuilder.where('book.id = :bookId', { bookId });

    const bookEntity = await queryBuilder.getOne();

    if (!bookEntity) {
      throw new BookNotFoundException();
    }

    return bookEntity.toDto();
  }

  async createBook(bookDto: CreateBookDto): Promise<BookEntity> {
    const user = this.bookRepository.create(bookDto);

    return this.bookRepository.save(user);
  }

  async updateBook(
    bookId: string,
    newValue: CreateBookDto,
  ): Promise<BookEntity | undefined> {
    const book = await this.bookRepository.findOneOrFail(bookId);

    if (!book.id) {
      throw new BookNotFoundException();
    }

    await this.bookRepository.update(bookId, newValue);

    return this.bookRepository.findOne(bookId);
  }

  async deleteBook(bookId: string): Promise<void> {
    await this.bookRepository
      .createQueryBuilder('book')
      .delete()
      .where('id = :bookId', { bookId })
      .execute();
  }
}
