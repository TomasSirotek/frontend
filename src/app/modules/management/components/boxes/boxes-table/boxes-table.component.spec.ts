import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxesTableComponent } from './boxes-table.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';


describe('BoxesTableComponent', () => {
  let component: BoxesTableComponent;
  let fixture: ComponentFixture<BoxesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BoxesTableComponent,HttpClientModule, ToastrModule.forRoot()]
    });
    fixture = TestBed.createComponent(BoxesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
