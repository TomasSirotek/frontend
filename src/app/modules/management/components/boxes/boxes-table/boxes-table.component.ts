import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Box } from '../../../models/box';
import { BoxesTableItemComponent } from '../boxes-table-item/boxes-table-item.component';


@Component({
  selector: '[boxes-table]',
  standalone: true,
  imports: [NgFor,BoxesTableItemComponent],
  templateUrl: './boxes-table.component.html',
  styleUrls: ['./boxes-table.component.scss']
})
export class BoxesTableComponent {
  public activeInventory: Box[] = [];

  constructor() {
    this.activeInventory = [
      {
        id: 1346771,
        title: 'Box #1',
        image:
          'https://lh3.googleusercontent.com/t_S1sM__cKCFbuhbwQ5JHKNRRggKuPH2O3FM_-1yOxJLRzz9VRMAPaVBibgrumZG3qsB1YxEuwvB7r9rl-F-gI6Km9NlfWhecfPS=h500',
        price: 35330.9,
        type: 'Solid',
        capacity: 1,
        status: 'Sold',
        color: 'red'
      },
      {
        id: 1346772,
        title: 'Box #2',
        image:
          'https://lh3.googleusercontent.com/t_S1sM__cKCFbuhbwQ5JHKNRRggKuPH2O3FM_-1yOxJLRzz9VRMAPaVBibgrumZG3qsB1YxEuwvB7r9rl-F-gI6Km9NlfWhecfPS=h500',
        price: 35330.9,
        type: 'Solid',
        capacity: 1,
        status: 'Sold',
        color: 'red'
      },
      {
        id: 1346773,
        title: 'Box #3',
        image:
          'https://lh3.googleusercontent.com/t_S1sM__cKCFbuhbwQ5JHKNRRggKuPH2O3FM_-1yOxJLRzz9VRMAPaVBibgrumZG3qsB1YxEuwvB7r9rl-F-gI6Km9NlfWhecfPS=h500',
        price: 35330.9,
        type: 'Solid',
        capacity: 1,
        status: 'Sold',
        color: 'red'
      },
      {
        id: 1346774,
        title: 'Box #4',
        image:
          'https://lh3.googleusercontent.com/t_S1sM__cKCFbuhbwQ5JHKNRRggKuPH2O3FM_-1yOxJLRzz9VRMAPaVBibgrumZG3qsB1YxEuwvB7r9rl-F-gI6Km9NlfWhecfPS=h500',
        price: 35330.9,
        type: 'Solid',
        capacity: 1,
        status: 'Sold',
        color: 'red'
      },
      {
        id: 1346775,
        title: 'Box #5',
        image:
          'https://lh3.googleusercontent.com/t_S1sM__cKCFbuhbwQ5JHKNRRggKuPH2O3FM_-1yOxJLRzz9VRMAPaVBibgrumZG3qsB1YxEuwvB7r9rl-F-gI6Km9NlfWhecfPS=h500',
        price: 35330.9,
        type: 'Solid',
        capacity: 1,
        status: 'Sold',
        color: 'red'
      },
    ];
  }
}
