import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BoxesHeaderComponent } from '../../components/boxes/boxes-header/boxes-header.component';
import { BoxesTableComponent } from '../../components/boxes/boxes-table/boxes-table.component';

@Component({
  selector: 'app-boxes',
  standalone: true,
  imports: [ CommonModule,BoxesHeaderComponent,BoxesTableComponent],
  templateUrl: './boxes.component.html',
  styleUrls: ['./boxes.component.scss']
})
export class BoxesComponent implements OnInit {

  constructor() {
  }
  ngOnInit(): void {
  
  }


}
