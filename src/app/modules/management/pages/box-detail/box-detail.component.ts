import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Box } from '../../models/box';
import { BoxServiceService } from '../../services/box-service.service';
import { HttpClientModule } from '@angular/common/http';
import { BoxesHeaderComponent } from '../../components/boxes/boxes-header/boxes-header.component';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-box-detail',
  standalone: true,
  imports: [CommonModule,BoxesHeaderComponent,ConfirmModalComponent],
  templateUrl: './box-detail.component.html',
  styleUrls: ['./box-detail.component.scss']
})
export class BoxDetailComponent {

  box: Box; 
  id: number;

  constructor(
    private route: ActivatedRoute,
    private boxService: BoxServiceService,
    private router: Router // Add this line
  ) {}

  ngOnInit(): void {
    // Retrieve the boxId route parameter
    const boxId = this.route.snapshot.params['id'];
   this.id = boxId
    // // Fetch the box data based on the boxId
    // this.boxService.getBoxById(boxId).subscribe((data) => {
    //   this.box = data; 
    // });
  }

  openModal() {
    document.addEventListener("DOMContentLoaded", function(event) {
      document.getElementById('deleteButton').click();
    });
  }

  // TODO: Do validaiton and impletnt delete service to the http client
  deleteItem() {
    console.log("delete item" + this.id)
    this.router.navigate(['/management/boxes']);
  }
}
