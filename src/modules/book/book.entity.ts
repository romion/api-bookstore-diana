import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators/use-dto.decorator';
import { BookDto } from './dto/book-dto';

@Entity({ name: 'books' })
@UseDto(BookDto)
export class BookEntity extends AbstractEntity<BookDto> {
  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  isBestseller?: boolean;

  @Column({ nullable: true })
  author?: string;

  @Column({ nullable: true })
  pages?: number;

  @Column({ nullable: true })
  genre?: string;

  @Column({ nullable: true })
  picture?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  price?: number;
}
