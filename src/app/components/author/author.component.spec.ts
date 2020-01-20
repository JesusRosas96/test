import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { AuthorComponent } from './author.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { AuthorsService } from '../../services/authors.service';
import { Observable, of } from 'rxjs';

fdescribe('AuthorComponent', () => {
  let component: AuthorComponent;
  let service: AuthorsService;
  let fixture: ComponentFixture<AuthorComponent>;

  const author = {
    id: 'testid',
    name: 'testname',
    nationality: 'testn',
    birthday: '1996'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      providers: [
        {
          provide: AuthorsService,
          useValue: {
            getAuthor: (): Observable<any> => {
              return of(author);
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
    service = TestBed.get(AuthorsService);
    fixture = TestBed.createComponent(AuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getting existing user', () => {
    component.authorsService.getAuthor('nuevo').subscribe(resp => {
      expect(resp).toEqual(author);
      component.author = resp[0];
    });
    expect(component.author).toEqual(author);
  });
});
