import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Author } from '../models/author.model';
import { map, delay } from 'rxjs/operators';
/**
 * Author service
 */
@Injectable({
    providedIn: 'root'
})
export class AuthorsService {
    private url = 'https://test-fdae6.firebaseio.com';

    constructor( private http: HttpClient ) { }

    createAuthor( author: Author ) {
        return this.http.post(`${ this.url }/authors.json`, author)
            .pipe(
                map( (resp: any) => {
                    author.id = resp.name;
                    return author;
                })
            );
    }

    updateAuthor( author: Author ) {
        const authorTemp = {
            ...author
        };
        delete authorTemp.id;
        return this.http.put(`${ this.url }/authors/${ author.id}.json`, authorTemp);
    }

    getAuthors() {
        return this.http.get(`${ this.url }/authors.json`)
            .pipe(
                map( this.createArray ),
                delay(20)
            );
    }

    getAuthor( id: string ) {
        return this.http.get(`${ this.url }/authors/${ id }.json`);
    }

    deleteAuthor( id: string ) {
        return this.http.delete(`${ this.url }/authors/${ id }.json`);
        // if ()
    }

    private createArray( authorsObj: object) {
        const authors: Author[] = [];
        if ( authorsObj === null ) { return []; }
        Object.keys( authorsObj ).forEach( key => {
            const author: Author = authorsObj[key];
            author.id = key;
            authors.push( author );
        });
        return authors;
    }
}
