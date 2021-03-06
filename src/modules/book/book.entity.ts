import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators/use-dto.decorator';
import { BookDto } from './dto/book-dto';

@Entity({ name: 'books' })
@UseDto(BookDto)
export class BookEntity extends AbstractEntity<BookDto> {
  @Column()
  name: string;

  @Column({ nullable: true, default: false })
  isBestseller?: boolean = false;

  @Column()
  author: string;

  @Column({ nullable: true })
  pages?: number;

  @Column('simple-array')
  genre: string[];

  @Column({ nullable: true })
  picture?: string;

  @Column()
  description: string;

  @Column()
  price: number;
}
