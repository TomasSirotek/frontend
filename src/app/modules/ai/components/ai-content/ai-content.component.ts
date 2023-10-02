import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

@Component({
  selector: 'app-ai-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ai-content.component.html',
  styleUrls: ['./ai-content.component.scss']
})
export class AiContentComponent implements OnInit {

  model: cocoSsd.ObjectDetection;
  classificationResult: cocoSsd.DetectedObject[] = [];
  selectedFile: File | null = null;

  async ngOnInit() {
    await tf.ready();
    this.model = await cocoSsd.load();
    tf.setBackend('cpu'); // Use 'webgl' for WebGL backend if desired
    this.model = await cocoSsd.load();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async classifyImage() {
    if (!this.selectedFile) {
      return;
    }

    const imageElement = document.createElement('img');
    const reader = new FileReader();

    reader.onload = async (e: any) => {
      imageElement.src = e.target.result;
      
      // Use the COCO-SSD model to detect objects in the image
      const predictions = await this.model.detect(imageElement);

      // Filter for objects that are classified as 'box'
      const potentialBoxes = predictions.filter(item => {
        return item.class === 'box' && item.score >= 0.3; // Adjust the threshold as needed
      });

      console.log(predictions);

      if (potentialBoxes.length > 0) {
        // A box was detected
        console.log('A box was detected.');
      } else {
        // No boxes were detected
        console.log('No boxes were detected.');
      }

      // Store all predictions in the classificationResult property
      this.classificationResult = predictions;
    };

    reader.readAsDataURL(this.selectedFile);
  }
}
