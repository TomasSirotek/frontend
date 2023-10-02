import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Box } from '../../../models/box';
import { FormsModule, NgModel } from '@angular/forms';
import { State } from 'src/app/shared/state';

import { NgxDatatableModule,ColumnMode,DatatableComponent,SelectionType } from '@swimlane/ngx-datatable';
import { BoxServiceService } from '../../../services/box-service.service';
import { Router } from '@angular/router';
import { BoxesTableItemComponent } from '../boxes-table-item/boxes-table-item.component';
import { BoxesModalComponent } from '../boxes-modal/boxes-modal.component';

@Component({
  selector: 'app-boxes-table',
  standalone: true,
  imports: [NgFor,NgIf,FormsModule,BoxesTableComponent,NgxDatatableModule,BoxesTableItemComponent,BoxesModalComponent],
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
  currentPage = 1;     // Current page number
  itemsPerPage = 11;  // Items per page

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
    this.isLoading = true;
    boxService.getBoxes().then(() => {
      this.temp = [...state.boxes];
      this.rows = state.boxes;
      
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    } );
  }

  handleData(data: any) {
    // Handle the emitted data here
    this.boxService.createBox(data).then(() => {
      this.fetchBoxes(this.boxService,this.state);
    } 
    );
  }
  ngOnInit(): void {
   
  }

  editBox(boxId: number) {
    this.router.navigate(['/management/boxes', boxId]);
  }

  searchTerm: string = '';
  // Initialize isLoading flag
  isLoading: boolean = false;

  // Initialize searchTerm

  // Initialize filteredRows array
  filteredRows: any[] = [];

 

  filterInventory() {
    // Set isLoading to true while filtering/loading data

    // Simulate an API call (replace with actual API call)
   
      if (this.searchTerm.trim() === '') {
        // If search term is empty, show all items
        this.filteredRows = this.rows.slice(); // Copy all items
      } else {
        // If search term is provided, filter the items
        const lowerCaseSearchTerm = this.searchTerm.trim().toLowerCase();
        this.filteredRows = this.rows.filter((inventory) =>
          inventory.title.toLowerCase().includes(lowerCaseSearchTerm)
        );
      }
    // Reset the current page to 1 after filtering
    this.currentPage = 1;
  }

  
    
}
