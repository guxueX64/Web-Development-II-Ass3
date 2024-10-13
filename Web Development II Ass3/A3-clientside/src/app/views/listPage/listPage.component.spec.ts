import { TestBed } from '@angular/core/testing';
import { ListPageComponent } from './listPage.component';

describe('HomeComponent Test', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPageComponent],
    }).compileComponents();
  });
  it('should create the component', () => {
    const fixture = TestBed.createComponent(ListPageComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
