import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorsService } from '../../services/authors.service';
import { Author } from '../../models/author.model';
import Swal from 'sweetalert2';
/**
 * Author component
 */
@Component({
  selector: 'app-autor',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.sass']
})
export class AuthorComponent implements OnInit {
  /**
   * Author variable
   */
  author: Author;
  /**
   * Author component constructor
   * @param authorsService author service instance
   * @param route activated route instance
   */
  constructor(private authorsService: AuthorsService, private route: ActivatedRoute) {
    this.author = {
      id: '',
      name: '',
      nationality: '',
      birthday: ''
    };
  }
  /**
   * ngOnInit life cycle
   * @returns void
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.authorsService.getAuthor(id)
        .subscribe((resp: Author) => {
          this.author = resp;
          this.author.id = id;
        });
    }
  }
  /**
   * Save function
   * @param form NgForm
   */
  save(form: NgForm) {
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

    if (this.author.id) {
      petition = this.authorsService.updateAuthor(this.author);
    } else {
      petition = this.authorsService.createAuthor(this.author);
    }

    petition.subscribe(resp => {
      Swal.fire({
        title: this.author.name,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });
    });
  }

}
