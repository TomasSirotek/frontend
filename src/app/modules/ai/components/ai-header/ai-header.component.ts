import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ai-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ai-header.component.html',
  styleUrls: ['./ai-header.component.scss']
})
export class AiHeaderComponent {
  @Input() title: string;
  @Input() subTitle: string;
  @Input() isDetail: boolean = true;
}
