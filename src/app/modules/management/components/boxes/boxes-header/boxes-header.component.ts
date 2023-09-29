import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boxes-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boxes-header.component.html',
  styleUrls: ['./boxes-header.component.scss']
})
export class BoxesHeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
