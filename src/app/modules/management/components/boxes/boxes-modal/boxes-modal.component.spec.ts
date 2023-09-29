import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxesModalComponent } from './boxes-modal.component';

describe('BoxesModalComponent', () => {
  let component: BoxesModalComponent;
  let fixture: ComponentFixture<BoxesModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BoxesModalComponent]
    });
    fixture = TestBed.createComponent(BoxesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
