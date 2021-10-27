import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import { RoleType } from '../../common/constants/role-type';
import { PageDto } from '../../common/dto/page.dto';
import { PageOptionsDto } from '../../common/dto/page-options.dto';
import { Auth } from '../../decorators/http.decorators';
import { BookService } from './book.service';
import { BookDto } from './dto/book-dto';
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

  @Post()
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: BookDto, description: 'Book Successfully Created' })
  async createBook(@Body() createBookDto: CreateBookDto): Promise<BookDto> {
    const createdBook = await this.bookService.createBook(createBookDto);

    return createdBook.toDto();
  }
}
