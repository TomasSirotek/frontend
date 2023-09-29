import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { LayoutRoutingModule } from './layout-routing.module';

@NgModule({
  imports: [LayoutRoutingModule, HttpClientModule],
  providers: [ActivatedRoute],
})
export class LayoutModule {}
 