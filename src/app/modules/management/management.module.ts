import { NgModule } from '@angular/core';
import { ManagementRoutingModule } from './management-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BoxServiceService } from './services/box-service.service';

@NgModule({
  imports: [
    ManagementRoutingModule,
    HttpClientModule,

  ],
  providers: [
    HttpClient, // Ensure HttpClient is provided
    BoxServiceService, // Your service
    // ... other services
  ],
})
export class ManagementModule { }
