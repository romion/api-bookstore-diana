import { define } from 'typeorm-seeding';

import { BookEntity } from '../../modules/book/book.entity';

define(BookEntity, () => {
  const book = new BookEntity();
  book.name = 'The Lord of the Rings';
  book.isBestseller = true;
  book.author = 'J. R. R. Tolkien';
  book.pages = 821;
  book.genre = '["fantasy"]';
  book.picture =
    'https://irs.www.warnerbros.com/keyart-jpeg/movies/media/browser/lord_of_the_rings_fellowship_of_the_ring_2000x3000.jpg';
  book.price = 200;

  return book;
});
