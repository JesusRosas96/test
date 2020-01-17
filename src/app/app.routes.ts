import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AutoresComponent } from './components/autores/autores.component';
import { LibrosComponent } from './components/libros/libros.component';

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'autores', component: AutoresComponent },
    { path: 'libros', component: LibrosComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);