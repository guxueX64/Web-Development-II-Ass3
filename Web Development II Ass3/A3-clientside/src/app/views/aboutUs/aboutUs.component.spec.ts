import { TestBed } from '@angular/core/testing';
import { AboutUsComponent } from './aboutUs.component';

describe('HomeComponent Test', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutUsComponent],
    }).compileComponents();
  });
  it('should create the component', () => {
    const fixture = TestBed.createComponent(AboutUsComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
