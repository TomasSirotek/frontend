import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { LayoutRoutingModule } from './layout-routing.module';
import { SvgIconComponent, provideAngularSvgIcon } from 'angular-svg-icon';

@NgModule({
  imports: [LayoutRoutingModule, HttpClientModule],
})
export class LayoutModule {}
 