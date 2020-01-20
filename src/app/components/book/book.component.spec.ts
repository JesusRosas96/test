import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { BookComponent } from './book.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { BooksService } from '../../services/books.service';
import { Observable, of } from 'rxjs';

fdescribe('BookComponent', () => {
  let component: BookComponent;
  let service: BooksService;
  let fixture: ComponentFixture<BookComponent>;

  const book = {
    id: 'testid',
    title: 'testtitle',
    author: 'testauthor',
    editorial: 'testedi',
    category: 'testcat'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      providers: [
        {
          provide: BooksService,
          useValue: {
            getBook: (): Observable<any> => {
              return of(book);
            }
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: 'nuevo'
              })
            }
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(BooksService);
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getting existing user', () => {
    component.booksService.getBook('nuevo').subscribe(resp => {
      expect(resp).toEqual(book);
      component.book = resp[0];
    });
    expect(component.book).toEqual(book);
  });
});
