import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, Type, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { DashboardHeaderComponent } from '../../components/dashboard-header/dashboard-header.component';
import { ApexChartComponent } from '../../components/apex-chart/apex-chart.component';
import { environment } from 'src/environments/environment.development';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,DashboardHeaderComponent,ApexChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
 
  API_URL = environment.BASE_URL;
  
}
