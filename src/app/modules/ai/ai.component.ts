import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AiHeaderComponent } from './components/ai-header/ai-header.component';
import { AiContentComponent } from './components/ai-content/ai-content.component';

@Component({
  selector: 'app-ai',
  standalone: true,
  imports: [CommonModule,AiHeaderComponent,AiContentComponent],
  templateUrl: './ai.component.html',
  styleUrls: ['./ai.component.scss']
})
export class AiComponent {

}
