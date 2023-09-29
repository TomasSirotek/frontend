import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxesTableComponent } from './boxes-table.component';

describe('BoxesTableComponent', () => {
  let component: BoxesTableComponent;
  let fixture: ComponentFixture<BoxesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BoxesTableComponent]
    });
    fixture = TestBed.createComponent(BoxesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
