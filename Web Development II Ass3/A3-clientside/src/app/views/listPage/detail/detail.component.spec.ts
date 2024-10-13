import { TestBed } from '@angular/core/testing';
import { DetailComponent } from './detail.component';

describe('HomeComponent Test', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailComponent],
    }).compileComponents();
  });
  it('should create the component', () => {
    const fixture = TestBed.createComponent(DetailComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
