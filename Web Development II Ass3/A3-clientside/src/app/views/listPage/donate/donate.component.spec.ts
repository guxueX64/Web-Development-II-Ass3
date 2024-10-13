import { TestBed } from '@angular/core/testing';
import { DonateComponent } from './donate.component';

describe('HomeComponent Test', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonateComponent],
    }).compileComponents();
  });
  it('should create the component', () => {
    const fixture = TestBed.createComponent(DonateComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
