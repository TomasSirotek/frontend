import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, firstValueFrom, map } from 'rxjs';
import { Box, ResponseDto } from '../models/box';
import { State } from 'src/app/shared/state';
import { AlertServiceService } from 'src/app/shared/service/alert-service.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


export class BoxServiceService {
  
  constructor(private http: HttpClient,private state : State,private alertService: AlertServiceService,private toastr: ToastrService) {
  }

  async getBoxes(): Promise<void> {
    try {
      const res: any = await firstValueFrom(
        this.http.get<ResponseDto<Box[]>>(environment.BASE_URL + '/boxes')
      );

      this.state.boxes = res.responseData;
    } catch (error) {
      // Handle the error and display a Toastr error message
      this.toastr.error('Failed to fetch boxes. Please try again later.');
    }
  }

  async getBoxById(boxId: number): Promise<Box> {
    try {
      const res: any = await firstValueFrom(
        this.http.get<ResponseDto<Box>>(
          environment.BASE_URL + '/boxes/' + boxId
        )
      );

      return res.responseData;
    } catch (error) {
      // Handle the error and display a Toastr error message
      this.toastr.error('Failed to fetch box by ID. Please try again later.');
      throw error; // Re-throw the error so the caller can handle it as needed
    }
  }

  // create box 
  async createBox(formData: any){
    return firstValueFrom(this.http.post<ResponseDto<Box>>(environment.BASE_URL + '/boxes', formData))

      .then((res) => {
        if (res.messageToClient) {
          this.alertService.showSuccess(res.messageToClient);
          this.toastr.success(res.messageToClient, 'Success');
        }
      })
      .catch((err) => {
        console.error(err);
        this.toastr.warning(err.error.messageToClient, 'Warning');
        throw err;
      });
  }


  async updateBox(id: number, formData: any) {
    return await firstValueFrom(this.http.put<ResponseDto<Box>>(environment.BASE_URL+ '/boxes/' + id, formData))

      .then((res) => {
        if (res.messageToClient) {
          this.alertService.showSuccess(res.messageToClient);
          this.toastr.success(res.messageToClient, 'Success');
        }
      })
      .catch((err) => {
        console.error(err);
        this.toastr.warning(err.error.messageToClient, 'Warning');
        throw err;
      });
  }

  async deleteBox(id: number) {
    return firstValueFrom(this.http.delete<ResponseDto<Box>>(environment.BASE_URL + '/boxes/' + id))
      .then((res) => {
        if (res.messageToClient) {
          this.alertService.showSuccess(res.messageToClient);
          this.toastr.success(res.messageToClient, 'Success');
        }
      })
      .catch((err) => {
        console.error(err);
        this.toastr.warning(err.error.messageToClient, 'Warning');
        throw err;
      });
  }

}
