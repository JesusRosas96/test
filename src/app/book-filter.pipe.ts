import { Pipe, PipeTransform } from '@angular/core';
import { Book } from './models/book.model';

@Pipe({
  name: 'bookFilter'
})
export class BookFilterPipe implements PipeTransform {

  transform(books: Book[], refer: string): Book[] {
    if (!books || !refer) {
      return books;
    }
    return books.filter( book => book.title.toLowerCase().indexOf(refer.toLowerCase()) !== -1);
  }
}
