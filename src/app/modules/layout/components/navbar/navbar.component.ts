import { Component,OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NavbarMenuComponent } from './navbar-menu/navbar-menu.component';
import { MenuService } from '../../services/menu.service';
import { NavbarMobileComponent } from './navbar-mobile/navbar-mobile.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
        AngularSvgIconModule,
        NavbarMenuComponent,
        NavbarMobileComponent,
  ],
})

export class NavbarComponent implements OnInit {
  constructor(private menuService: MenuService) {}

  ngOnInit(): void {}

  public toggleMobileMenu(): void {
    this.menuService.showMobileMenu = true;
  }
}
