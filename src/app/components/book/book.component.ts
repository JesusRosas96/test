import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book.model';
import { AuthorsService } from 'src/app/services/authors.service';
import { Author } from 'src/app/models/author.model';
import Swal from 'sweetalert2';
/**
 * Book component
 */
@Component({
  selector: 'app-libro',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.sass']
})
export class BookComponent implements OnInit {
  /**
   * Book variable
   * Authors variable
   * show variable
   */
  book: Book;
  authors: Author[];
  show: boolean;
  /**
   * Book component constructor
   * @param booksService book service instance
   * @param authorsService author service instance
   * @param route activated route instance
   */
  constructor( public booksService: BooksService, private authorsService: AuthorsService, private route: ActivatedRoute ) {
    this.book =  {
      id: '',
      title: '',
      author: '',
      editorial: '',
      category: ''
    };
    this.authors = [];
    this.show = false;
  }
  /**
   * ngOnInit life cycle
   * @returns void
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get( 'id' );
    this.show = true;
    if ( id !== 'new' ) {
      this.booksService.getBook( id )
        .subscribe( (resp: Book) => {
          this.book = resp;
          this.book.id = id;
          this.show = false;
        });
    }
    this.authorsService.getAuthors()
        .subscribe( resp => {
          this.authors = resp;
        });
  }
  /**
   * Save function
   * @param form NgForm
   */
  save( form: NgForm ) {
    if (form.invalid) {
      console.log('Formulario no válido');
      return;
    }
    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let petition: Observable<any>;

    if ( this.book.id) {
      petition = this.booksService.updateBook( this.book );
    } else {
      petition = this.booksService.createBook( this.book );
    }

    petition.subscribe( resp => {
      Swal.fire({
        title: this.book.title,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });
    });
  }
}
