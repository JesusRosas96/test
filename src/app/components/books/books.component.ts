import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book.model';
import Swal from 'sweetalert2';
/**
 * Books component
 */
@Component({
  selector: 'app-libros',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass']
})
export class BooksComponent implements OnInit {
  /**
   * Books variable
   * Loading variable
   */
  books: Book[];
  loading: boolean;
  /**
   * Books component constructor
   * @param booksService book service interface
   */
  constructor( private booksService: BooksService ) {
    this.books = [];
    this.loading =  false;
  }
  /**
   * ngOnInit life cycle}
   * @returns void
   */
  ngOnInit(): void {
    this.loading = true;
    this.booksService.getBooks()
      .subscribe( resp => {
         this.books = resp;
         this.loading = false;
      });
  }
  /**
   * deleteBook function
   * @param book Book
   * @param i number
   */
  deleteBook( book: Book, i: number ) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Esta seguro que desea borrar a ${ book.title }`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if ( resp.value ) {
        this.books.splice(i, 1);
        this.booksService.deleteBook( book.id ).subscribe();
      }
    });
  }

}
