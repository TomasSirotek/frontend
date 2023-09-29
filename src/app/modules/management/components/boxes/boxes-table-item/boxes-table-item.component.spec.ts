import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxesTableItemComponent } from './boxes-table-item.component';

describe('BoxesTableItemComponent', () => {
  let component: BoxesTableItemComponent;
  let fixture: ComponentFixture<BoxesTableItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BoxesTableItemComponent]
    });
    fixture = TestBed.createComponent(BoxesTableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
