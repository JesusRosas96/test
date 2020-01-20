import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { AuthorComponent } from './components/author/author.component';
import { BooksComponent } from './components/books/books.component';
import { BookComponent } from './components/book/book.component';

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'authors', component: AuthorsComponent },
    { path: 'author/:id', component: AuthorComponent},
    { path: 'books', component: BooksComponent },
    { path: 'book/:id', component: BookComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);