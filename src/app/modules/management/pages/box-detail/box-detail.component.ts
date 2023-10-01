import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Box } from '../../models/box';
import { BoxServiceService } from '../../services/box-service.service';
import { HttpClientModule } from '@angular/common/http';
import { BoxesHeaderComponent } from '../../components/boxes/boxes-header/boxes-header.component';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { FormsModule, NgModel } from '@angular/forms';
import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite'
@Component({
  selector: 'app-box-detail',
  standalone: true,
  imports: [CommonModule,BoxesHeaderComponent,ConfirmModalComponent,FormsModule],
  templateUrl: './box-detail.component.html',
  styleUrls: ['./box-detail.component.scss']
})

export class BoxDetailComponent {

  
  box: Box; 
  id: number;
  isDeleteModalOpen = true;
  modal: ModalInterface

  constructor(
    private route: ActivatedRoute,
    private boxService: BoxServiceService,
    private router: Router // Add this line
  ) {
   
  }

  setupModal() {
    const $modalElement: HTMLElement = document.querySelector('#modalEl');

   const modalOptions: ModalOptions = {
       placement: 'center',
       backdrop: 'dynamic',
       backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
       closable: true,
       onHide: () => {
       },
       onShow: () => {
       },
       onToggle: () => {
       },
   }
   
   this.modal =  new Modal($modalElement, modalOptions);
   
  }

  formData = {
    title: '',
    type: '',
    status: '',
    price: 0,
    color: '',
    image: '',
    description: 'Standard glass, 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, 16GB 2666MHz DDR4 memory, Radeon Pro 5500 XT with 8GB of GDDR6 memory, 256GB SSD storage, Gigabit Ethernet, Magic Mouse 2, Magic Keyboard - US',
  };

  ngOnInit(): void {
    // Retrieve the boxId route parameter
    const boxId = this.route.snapshot.params['id'];
    this.id = boxId

    // // Fetch the box data based on the boxId
    this.boxService.getBoxById(boxId).then((box) => {
      this.box = box;
      this.formData.title = box.title;
      this.formData.type = box.type;
      this.formData.status = box.status;
      this.formData.price = box.price;
      this.formData.color = box.color;
      this.formData.image = box.image;
      this.formData.description = box.description;
    }
    );
  }

  // openModal() {
  //   document.addEventListener("DOMContentLoaded", function(event) {
  //     document.getElementById('deleteButton').click();
  //   });
  // }


  updateBox() {
   // update the box catch error then and if catch error then
   this.boxService.updateBox(this.id, this.formData).then(() => {
    this.router.navigate(['/management/boxes']);
  });
  }

  // TODO: Do validaiton and impletnt delete service to the http client
  deleteItem() {
    this.boxService.deleteBox(this.id).then(() => {
      this.modal.hide();
      this.router.navigate(['/management/boxes']);
    });
  }


  openModal() {
   // set the modal menu element
   this.setupModal();
   this.modal.show();
  }

  onCanceled() {
    this.modal.hide();
  }



}
