import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { LayoutRoutingModule } from './layout-routing.module';
import { ActivatedRoute } from '@angular/router';

@NgModule({
  imports: [LayoutRoutingModule, HttpClientModule],
  providers: [ActivatedRoute],
})
export class LayoutModule {}
 