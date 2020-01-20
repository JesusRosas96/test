import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book.model';
import { map, delay } from 'rxjs/operators';
/**
 * Book service
 */
@Injectable({
    providedIn: 'root'
})
export class BooksService {
    /**
     * url firebase
     */
    private url = 'https://test-fdae6.firebaseio.com';
    /**
     * Book service constructor
     * @param http Http client instance
     */
    constructor( private http: HttpClient ) { }
    /**
     * createBook function
     * @param book Book
     */
    createBook( book: Book ) {
        return this.http.post(`${ this.url }/books.json`, book)
            .pipe(
                map( (resp: any) => {
                    book.id = resp.name;
                    return book;
                })
            );
    }
    /**
     * updateBook function
     * @param book Book
     */
    updateBook( book: Book ) {
        const bookTemp = {
            ...book
        };
        delete bookTemp.id;
        return this.http.put(`${ this.url }/books/${ book.id}.json`, bookTemp);
    }
    /**
     * getBooks function
     */
    getBooks() {
        return this.http.get(`${ this.url }/books.json`)
            .pipe(
                map( this.createArray ),
                delay(20)
            );
    }
    /**
     * getBook function
     * @param id string
     */
    getBook( id: string ) {
        return this.http.get(`${ this.url }/books/${ id }.json`);
    }
    /**
     * deleteBook function
     * @param id string
     */
    deleteBook( id: string ) {
        return this.http.delete(`${ this.url }/books/${ id }.json`);
    }
    /**
     * createArray function
     * @param booksObj object
     */
    private createArray( booksObj: object) {
        const books: Book[] = [];
        if ( booksObj === null ) { return []; }
        Object.keys( booksObj ).forEach( key => {
            const book: Book = booksObj[key];
            book.id = key;
            books.push( book );
        });
        return books;
    }
}
