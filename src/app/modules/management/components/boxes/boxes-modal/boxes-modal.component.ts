import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService, DialogRef } from '@ngneat/dialog';
import { FormsModule } from '@angular/forms';
import { InputComponent } from 'src/app/shared/components/input/input.component';

interface Data {
 title: string,
 action: string,
}

@Component({
  selector: 'app-boxes-modal',
  standalone: true,
  imports: [CommonModule,FormsModule,InputComponent],
  templateUrl: './boxes-modal.component.html',
  styleUrls: ['./boxes-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxesModalComponent {
  ref: DialogRef<Data, boolean> = inject(DialogRef);
  imageUrl: string | null = null;

  formData = {
    title: '',
    type: '',
  };

  @ViewChild('urlInput') urlInput: ElementRef<HTMLInputElement>;
  
  get title() {
    if (!this.ref.data) return 'Hello world';
    return this.ref.data.title;
  }
  get action() {
    if (!this.ref.data) return 'Action';
    return this.ref.data.action;
  }

  checkImageUrl(url: string): void {
    // Basic URL validation (you can use a more robust approach)
    if (url && /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|svg))$/i.test(url)) {
      this.imageUrl = url;
    } else {
      this.imageUrl = null;
    }
  }
  onActionClick() {
    // Access form data from this.formData
    console.log(this.formData);
  }
}
