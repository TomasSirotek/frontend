import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Box } from '../../../models/box';
import { FormsModule, NgModel } from '@angular/forms';
import { State } from 'src/app/shared/state';

import { NgxDatatableModule,ColumnMode,DatatableComponent,SelectionType } from '@swimlane/ngx-datatable';
import { BoxServiceService } from '../../../services/box-service.service';
import { Router } from '@angular/router';
import { BoxesTableItemComponent } from '../boxes-table-item/boxes-table-item.component';

@Component({
  selector: 'app-boxes-table',
  standalone: true,
  imports: [NgFor,NgIf,FormsModule,BoxesTableComponent,NgxDatatableModule,BoxesTableItemComponent],
  templateUrl: './boxes-table.component.html',
  styleUrls: ['./boxes-table.component.scss']
})
export class BoxesTableComponent {
filterInventory() {
throw new Error('Method not implemented.');
}
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('editTmpl', { static: true }) editTmpl: TemplateRef<any>;
  @ViewChild('hdrTpl', { static: true }) hdrTpl: TemplateRef<any>;
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  rows: Box[] = [];
  temp = [];
  loadingIndicator = true;
  selected = [];
  currentPage = 1;     // Current page number
itemsPerPage = 10;  // Items per page

// Your data source (replace with your actual data)


  columns = [{ prop: 'title' }, { name: 'type' }, { name: 'price' },{ name: 'color' }];

  constructor(private boxService: BoxServiceService, private state: State,private router: Router) {
    this.fetchBoxes(boxService,state); 
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }
  
  get endIndex(): number {
    const lastIndex = this.startIndex + this.itemsPerPage - 1;
    return lastIndex < this.rows.length ? lastIndex : this.rows.length - 1;
  }

  get pagedRows(): Box[] {
    return this.rows.slice(this.startIndex, this.endIndex + 1);
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

  ngOnInit(): void {
   
  }

  editBox(boxId: number) {
    this.router.navigate(['/management/boxes', boxId]);
  }

  searchTerm: string = '';

 

  // filterInventory() {
  //   this.filteredInventory = this.activeInventory.filter((inventory) =>
  //     inventory.title.toLowerCase().includes(this.searchTerm.toLowerCase())
  //   );
  // }
  
     
  // add() {
  //   this.selected.push(this.rows[1], this.rows[3]);
  // }

  // update() {
  //   this.selected = [this.rows[1], this.rows[3]];
  // }

  // remove() {
  //   this.selected = [];
  // }

  // displayCheck(row) {
  //   return row.name !== 'Ethel Price';
  // }


  // toggleExpandRow(row) {
  //   console.log('Toggled Expand Row!', row);
  //   this.table.rowDetail.toggleExpandRow(row);
  // }

  // onDetailToggle(event) {
  //   console.log('Detail Toggled', event);
  // }
  
}
