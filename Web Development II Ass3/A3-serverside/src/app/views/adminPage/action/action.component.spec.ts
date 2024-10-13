import { TestBed } from '@angular/core/testing';
import { ActionComponent } from './action.component';

describe('HomeComponent Test', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActionComponent],
    }).compileComponents();
  });
  it('should create the component', () => {
    const fixture = TestBed.createComponent(ActionComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
