import { Component, ChangeDetectionStrategy, inject, ElementRef, ViewChild, EventEmitter, Output, Input, AfterViewInit } from '@angular/core';
import { interval } from 'rxjs';
import { DialogRef } from '@ngneat/dialog';
import { FormBuilder, FormGroup, NgModel, ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Modal } from 'flowbite'
import type { ModalOptions, ModalInterface } from 'flowbite'

interface DialogData {
  title: string;
  withResult: boolean;
}

interface PostBoxDto{
  title: string,
  type: string,
  image: string,
  status: string,
  price: number,
  color: string,
  description: string
}

@Component({
  selector: 'app-boxes-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './boxes-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxesModalComponent {
  @ViewChild('urlInput') urlInput: ElementRef<HTMLInputElement>;
  postDataForm: FormGroup;
  imageUrl: string | null = null;

  @Input() public user;
  @Output() dataEmitter = new EventEmitter<any>();

 
  ngOnInit() {
    
  }


  constructor(private formBuilder: FormBuilder) {
    this.postDataForm = this.formBuilder.group({
      // Define your form controls here
      title: ['', Validators.required],
      image: [''],
      type: [''],
      status: [''],
      price: [0],
      color: ['Select color'],
      description: [''],
    });
  }


   modalOptions: ModalOptions = {
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    closable: true,
    onHide: () => {
    },
    onShow: () => {
    },
    onToggle: () => {
    }
  }
  // Declare a variable to store the modal reference



  $modalElement: HTMLElement = document.querySelector('#modalEl');
  modal: ModalInterface = new Modal(this.$modalElement, this.modalOptions);

 
openModal() {
  this.modal.show();
}

passBack() {
  this.dataEmitter.emit(this.postDataForm.value);
  this.modal.hide() // Close
  // this.closeModal(); // Close the modal here
}

closeModal() {
  if (this.modal) {
    this.modal.hide() // Close the modal using the reference
  }
}


  // constructor(private formBuilder: FormBuilder) {
  //   this.postDataForm = this.formBuilder.group({
  //     title: ['', Validators.required],
  //     type: [''],
  //     image: [''],
  //     status: [''],
  //     price: [0],
  //     color: ['Select color'],
  //     description: [''],
  //   });
  //   // Subscribe to changes in the 'image' form control
  //   this.postDataForm.get('image')?.valueChanges.subscribe((value) => {
  //     this.onImageUrlChange(value);
  //   });
  // }

  // ref: DialogRef<DialogData> = inject(DialogRef);

  // onImageUrlChange(value: string) {
  //   this.imageUrl = value 
  // }


  // submitForm() {
  //   if (this.postDataForm.valid) {
  //     const postDataDto: PostBoxDto = this.postDataForm.value;

  //     // check if all the values are populated
  //     if(!postDataDto.title || !postDataDto.type || !postDataDto.image || !postDataDto.status || !postDataDto.price || !postDataDto.color || !postDataDto.description){
  //       alert("Please fill all the fields");
  //       return;
  //     }
  //     this.ref.close(postDataDto);
  //   }
  // }

  
}