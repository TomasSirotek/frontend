import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { NgClass } from '@angular/common';
import { NavbarMobileMenuComponent } from './navbar-mobile-menu/navbar-mobile-menu.component';

@Component({
    selector: 'app-navbar-mobile',
    templateUrl: './navbar-mobile.component.html',
    styleUrls: ['./navbar-mobile.component.scss'],
    standalone: true,
    imports: [
        NgClass,
        NavbarMobileMenuComponent,
    ],
})
export class NavbarMobileComponent implements OnInit {
  constructor(public menuService: MenuService) {}

  ngOnInit(): void {}

  public toggleMobileMenu(): void {
    this.menuService.showMobileMenu = false;
  }
}
