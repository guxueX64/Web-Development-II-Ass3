import { TestBed } from '@angular/core/testing';
import { AdminPageComponent } from './adminPage.component';

describe('HomeComponent Test', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPageComponent],
    }).compileComponents();
  });
  it('should create the component', () => {
    const fixture = TestBed.createComponent(AdminPageComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
