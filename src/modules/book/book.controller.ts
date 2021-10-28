import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import { RoleType } from '../../common/constants/role-type';
import { PageDto } from '../../common/dto/page.dto';
import { PageOptionsDto } from '../../common/dto/page-options.dto';
import { Auth, UUIDParam } from '../../decorators/http.decorators';
import type { BookEntity } from './book.entity';
import { BookService } from './book.service';
import { BookDto } from './dto/book-dto';
import { BookFilterDto } from './dto/book-filter.dto';
import { CreateBookDto } from './dto/CreateBookDto';

@Controller('books')
@ApiTags('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get books list',
    type: PageDto,
  })
  async getBooks(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<BookDto>> {
    return this.bookService.getBooks(pageOptionsDto);
  }

  @Get('filter')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get filtered books',
    type: BookDto,
  })
  getBooksByGenre(
    @Query() filter: BookFilterDto,
  ): Promise<BookEntity[] | undefined> {
    return this.bookService.filterBooks(filter);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get books list',
    type: BookDto,
  })
  getBook(@UUIDParam('id') bookId: string): Promise<BookDto> {
    return this.bookService.getBook(bookId);
  }

  @Post()
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: BookDto, description: 'Book Successfully Created' })
  async createBook(@Body() createBookDto: CreateBookDto): Promise<BookDto> {
    const createdBook = await this.bookService.createBook(createBookDto);

    return createdBook.toDto();
  }

  @Put(':id')
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Book Successfully Updated',
    type: BookDto,
  })
  updateBook(
    @UUIDParam('id') bookId: string,
    @Body() createBookDto: CreateBookDto,
  ): Promise<BookEntity | undefined> {
    return this.bookService.updateBook(bookId, createBookDto);
  }

  @Delete(':id')
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: BookDto, description: 'Book Successfully Deleted' })
  async deleteBook(@UUIDParam('id') bookId: string): Promise<void> {
    return this.bookService.deleteBook(bookId);
  }
}
