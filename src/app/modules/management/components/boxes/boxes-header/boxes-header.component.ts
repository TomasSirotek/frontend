import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from '@ngneat/dialog';
import { BoxesModalComponent } from '../boxes-modal/boxes-modal.component';

@Component({
  selector: 'app-boxes-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boxes-header.component.html',
  styleUrls: ['./boxes-header.component.scss'],
  
})
export class BoxesHeaderComponent implements OnInit {
  private dialog = inject(DialogService);

  @Input() title: string;
  @Input() subTitle: string;
  @Input() isDetail: boolean = true;

  
  ngOnInit() {
    //this.open();
  }

  open() {
    const dialogRef = this.dialog.open(BoxesModalComponent, {
      // data is typed based on the passed generic
      data: {
        title: 'Create new box',
        action: 'Create box'
      },
    });
  }
}
