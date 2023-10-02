import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApexChartComponent } from './apex-chart.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';


describe('ApexChartComponent', () => {
  let component: ApexChartComponent;
  let fixture: ComponentFixture<ApexChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApexChartComponent,HttpClientModule,ToastrModule.forRoot()]
    });
    fixture = TestBed.createComponent(ApexChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
