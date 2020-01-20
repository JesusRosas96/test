import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Rutas
import { APP_ROUTING } from './app.routes';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Servicios
import { AuthorsService } from './services/authors.service';
import { BooksService } from './services/books.service';

// Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { BooksComponent } from './components/books/books.component';
import { AuthorComponent } from './components/author/author.component';
import { BookComponent } from './components/book/book.component';
import { AuthorFilterPipe } from './author-filter.pipe';
import { BookFilterPipe } from './book-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AuthorsComponent,
    BooksComponent,
    AuthorComponent,
    BookComponent,
    AuthorFilterPipe,
    BookFilterPipe
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthorsService,
    BooksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
