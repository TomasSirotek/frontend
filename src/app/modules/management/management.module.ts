import { NgModule } from '@angular/core';
import { ManagementRoutingModule } from './management-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    ManagementRoutingModule,
    HttpClientModule
  ]
})
export class ManagementModule { }
