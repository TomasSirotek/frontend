import { Component, ChangeDetectionStrategy, inject, ElementRef, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { interval } from 'rxjs';
import { DialogRef } from '@ngneat/dialog';
import { FormBuilder, FormGroup, NgModel, ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(
   
  ) { }

  ngOnInit() {
    
  }

  passBack() {
    this.passEntry.emit(this.user);
    
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