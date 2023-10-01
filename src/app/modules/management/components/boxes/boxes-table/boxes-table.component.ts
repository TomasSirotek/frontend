import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Box } from '../../../models/box';
import { BoxesTableItemComponent } from '../boxes-table-item/boxes-table-item.component';
import { FormsModule, NgModel } from '@angular/forms';
import { BoxServiceService } from '../../../services/box-service.service';
import { State } from 'src/app/shared/state';


@Component({
  selector: '[boxes-table]',
  standalone: true,
  imports: [NgFor,BoxesTableItemComponent,NgIf,FormsModule],
  templateUrl: './boxes-table.component.html',
  styleUrls: ['./boxes-table.component.scss']
})
export class BoxesTableComponent {
  public activeInventory: Box[] = [];
  filteredInventory: Box[] = [];
  searchTerm: string = '';

  constructor(private boxService: BoxServiceService, private state: State) {
    boxService.getBoxes().then(() => {
      this.activeInventory = state.boxes;
    } );
    
  }

  filterInventory() {
    this.filteredInventory = this.activeInventory.filter((inventory) =>
      inventory.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
