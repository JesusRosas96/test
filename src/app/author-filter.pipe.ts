import { Pipe, PipeTransform } from '@angular/core';
import { Author } from './models/author.model';

@Pipe({
  name: 'authorFilter'
})
export class AuthorFilterPipe implements PipeTransform {

  transform(authors: Author[], refer: string): Author[] {
    if (!authors || !refer) {
      return authors;
    }
    return authors.filter( author => author.name.toLowerCase().indexOf(refer.toLowerCase()) !== -1);
  }
}
