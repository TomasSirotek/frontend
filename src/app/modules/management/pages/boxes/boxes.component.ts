import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BoxesHeaderComponent } from '../../components/boxes/boxes-header/boxes-header.component';
import { BoxesTableComponent } from '../../components/boxes/boxes-table/boxes-table.component';

import { NgxDatatableModule,ColumnMode,DatatableComponent } from '@swimlane/ngx-datatable';
@Component({
  selector: 'app-boxes',
  standalone: true,
  imports: [ CommonModule,BoxesHeaderComponent,BoxesTableComponent,NgxDatatableModule],
  templateUrl: './boxes.component.html',
  styleUrls: ['./boxes.component.scss']
})
export class BoxesComponent implements OnInit {
  ngOnInit(): void {
    
  }




}
