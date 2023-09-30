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
  imports: [CommonModule,FormsModule,InputComponent,FormsModule],
  providers: [DialogService],
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
    status: '',
    price: '',
    color: '',
    imageUrl: this.imageUrl,
    description: 'Standard glass, 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, 16GB 2666MHz DDR4 memory, Radeon Pro 5500 XT with 8GB of GDDR6 memory, 256GB SSD storage, Gigabit Ethernet, Magic Mouse 2, Magic Keyboard - US',
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
    
  }
}
