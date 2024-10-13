import { TestBed } from '@angular/core/testing';
import { ContactUsComponent } from './contactUs.component';

describe('HomeComponent Test', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactUsComponent],
    }).compileComponents();
  });
  it('should create the component', () => {
    const fixture = TestBed.createComponent(ContactUsComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
