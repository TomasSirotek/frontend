import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Box } from '../../models/box';
import { BoxServiceService } from '../../services/box-service.service';
import { HttpClientModule } from '@angular/common/http';
import { BoxesHeaderComponent } from '../../components/boxes/boxes-header/boxes-header.component';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import {  AbstractControl, FormControl, FormsModule, NgControl, NgModel, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function urlValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const url = control.value;

    if (!url || isValidUrl(url)) {
      return null; // If the control is empty or a valid URL, consider it valid
    } else {
      return { invalidUrl: true }; // If it's not a valid URL, mark it as invalid
    }
  };
}




@Component({
  selector: 'app-box-detail',
  standalone: true,
  imports: [CommonModule,BoxesHeaderComponent,ConfirmModalComponent,FormsModule,ReactiveFormsModule],
  templateUrl: './box-detail.component.html',
  styleUrls: ['./box-detail.component.scss']
})

export class BoxDetailComponent {
  formGroup: FormGroup;
  imageUrl: string | null = null;
  modal: ModalInterface
  formSubmitted = false;

  
  box: Box; 
  id: number;
  isDeleteModalOpen = true;

    

  formData: {
    title: string;
    type: string;
    status: string;
    price: number;
    color: string;
    image: string;
    description: string;
  };


  async ngOnInit() {
    try {
      const boxId = this.route.snapshot.params['id'];
      this.id = boxId;
  
      // Fetch the box data based on the boxId
      this.box = await this.boxService.getBoxById(boxId);
  
      if (this.box) {
        this.formGroup.patchValue({
          title: this.box.title,
          type: this.box.type,
          status: this.box.status,
          color: this.box.color,
          image: this.box.image,
          price: this.box.price,
          description: this.box.description,
        });
      }
    } catch (error) {
      this.router.navigate(['/management/boxes']);
    }
  }



  constructor(
    private route: ActivatedRoute,
    private boxService: BoxServiceService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.formGroup = this.fb.group({
      title: [ '', [Validators.required, Validators.minLength(5)]],
      type: [ '', Validators.required],
      status: [ '', [Validators.required, Validators.pattern(/^(New|Damaged|Old)$/)]],
      color: [ 'Select color', [Validators.required, this.colorValidator]],
      image: [
        '',
        [
          Validators.required,
          urlValidator(),
          Validators.pattern(/^https?:\/\/.*$/), // Additional pattern for any URL
        ],
      ],
      price: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d{1,2})?$/)]],
      description: [ '', [Validators.required, Validators.minLength(1)]],
    });
  }
  
  
  colorValidator(control: FormControl) {
    const validColors = ['Red', 'Orange', 'White', 'Black'];
    if (validColors.includes(control.value)) {
      return null; // Valid color selected
    } else {
      return { invalidColor: true }; // Invalid color selected
    }
  }

    
  updateImageUrl() {
    const imageControl = this.formGroup.get('image');
    const inputValue = imageControl.value;
    
    // Check if the URL is valid
    const isValidUrl = Validators.pattern(/^https?:\/\/.*$/)(imageControl);
    
    if (isValidUrl) {
      this.imageUrl = inputValue || this.box?.image || '';
    } else {
      this.imageUrl = this.box?.image || '';
    }
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

  




  // openModal() {
  //   document.addEventListener("DOMContentLoaded", function(event) {
  //     document.getElementById('deleteButton').click();
  //   });
  // }


  updateBox() {
   // update the box catch error then and if catch error then
   this.boxService.updateBox(this.id, this.formGroup.value).then(() => {
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
