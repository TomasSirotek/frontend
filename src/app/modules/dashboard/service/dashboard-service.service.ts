import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, firstValueFrom, map } from 'rxjs';
import { State } from 'src/app/shared/state';
import { environment } from 'src/environments/environment.prod';
import { AlertServiceService } from 'src/app/shared/service/alert-service.service';
import { ToastrService } from 'ngx-toastr';
import { DashboardData, ResponseDto } from '../models/DashboardData';

@Injectable({
  providedIn: 'root'
})


export class DashboardServiceService {

  constructor(private http: HttpClient,private state : State,private toastr: ToastrService) {
  }


  async getChartData(): Promise<DashboardData[]> {
    try {
      const res: any = await firstValueFrom(
        this.http.get<ResponseDto<DashboardData[]>>(
          environment.baseUrl + '/dashboard/sales'
        )
      );
  
      // Return the chart data
      return res.responseData;
    } catch (error) {
      // Handle the error and display a Toastr error message
      this.toastr.error('Failed to fetch chart data. Please try again later.');
      throw error; // Rethrow the error to the caller
    }
  }
  
  
}
