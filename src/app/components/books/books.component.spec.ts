import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { BooksComponent } from './books.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { BooksService } from '../../services/books.service';
import { Observable, of } from 'rxjs';

fdescribe('BooksComponent', () => {
  let component: BooksComponent;
  let service: BooksService;
  let fixture: ComponentFixture<BooksComponent>;

  const book = {
    id: 'testid',
    title: 'testtitle',
    author: 'testauthor',
    editorial: 'testedi',
    category: 'testcat'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BooksComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      providers: [
        {
          provide: BooksComponent,
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
    service = TestBed.get(BooksComponent);
    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
