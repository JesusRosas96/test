import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { AuthorComponent } from './author.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { AuthorsService } from '../../services/authors.service';

fdescribe('AuthorComponent', () => {
  let component: AuthorComponent;
  let service: AuthorsService;
  let fixture: ComponentFixture<AuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule, FormsModule ],
      providers: [AuthorsService, {
        provide: ActivatedRoute,
        useValue: {
        snapshot: {
        paramMap: convertToParamMap({
            id: 'nuevo',
        }),
        },
        },
      }, ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
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
    component.ngOnInit();
  });
});
