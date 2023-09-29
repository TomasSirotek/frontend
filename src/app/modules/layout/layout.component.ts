import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    standalone: true,
    imports: [
        RouterOutlet,
        NavbarComponent,
        SidebarComponent
    ],
})
export class LayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
