import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Box } from '../../../models/box';
import { FormsModule, NgModel } from '@angular/forms';
import { State } from 'src/app/shared/state';

import { NgxDatatableModule,ColumnMode,DatatableComponent,SelectionType } from '@swimlane/ngx-datatable';
import { BoxServiceService } from '../../../services/box-service.service';
import { Router } from '@angular/router';

@Component({
  selector: '[boxes-table]',
  standalone: true,
  imports: [NgFor,NgIf,FormsModule,BoxesTableComponent,NgxDatatableModule],
  templateUrl: './boxes-table.component.html',
  styleUrls: ['./boxes-table.component.scss']
})
export class BoxesTableComponent {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('editTmpl', { static: true }) editTmpl: TemplateRef<any>;
  @ViewChild('hdrTpl', { static: true }) hdrTpl: TemplateRef<any>;
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  rows: Box[] = [];
  temp = [];
  loadingIndicator = true;
  selected = [];

 
  columns = [{ prop: 'title' }, { name: 'type' }, { name: 'price' },{ name: 'color' }];

  constructor(private boxService: BoxServiceService, private state: State,private router: Router) {
    this.fetchBoxes(boxService,state); 
  }

  ngOnInit(): void {
  }


  fetchBoxes(boxService: BoxServiceService,state : State){
    boxService.getBoxes().then(() => {
      this.temp = [...state.boxes];
      this.rows = state.boxes;
      
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 1500);
    } );
  }

  editBox(boxId: number) {
    this.router.navigate(['/management/boxes', boxId]);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    this.editBox(this.selected[0].id)
  }

  add() {
    this.selected.push(this.rows[1], this.rows[3]);
  }

  update() {
    this.selected = [this.rows[1], this.rows[3]];
  }

  remove() {
    this.selected = [];
  }

  displayCheck(row) {
    return row.name !== 'Ethel Price';
  }


  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }
  
}
