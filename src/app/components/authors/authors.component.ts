import { Component, OnInit } from '@angular/core';
import { AuthorsService } from '../../services/authors.service';
import { Author } from '../../models/author.model';
import Swal from 'sweetalert2';
/**
 * Authors component
 */
@Component({
  selector: 'app-autores',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.sass']
})
export class AuthorsComponent implements OnInit {
  /**
   * Authors variable
   * Loading variable
   * Refer variable
   */
  authors: Author[];
  loading: boolean;
  refer: string;
  /**
   * Authors component constructor
   * @param authorsService author service interface
   */
  constructor( public authorsService: AuthorsService ) {
    this.authors = [];
    this.loading = false;
  }
  /**
   * ngOnInit life cycle
   * @return void
   */
  ngOnInit(): void {
    this.loading = true;
    this.authorsService.getAuthors()
      .subscribe( resp => {
         this.authors = resp;
         this.loading = false;
      });
  }
  /**
   * deleteAuthor function
   * @param author Author
   * @param i number
   */
  deleteAuthor( author: Author, i: number ) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Esta seguro que desea borrar a ${ author.name }`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if ( resp.value ) {
        this.authors.splice(i, 1);
        this.authorsService.deleteAuthor( author.id ).subscribe();
      }
    });
  }
}
