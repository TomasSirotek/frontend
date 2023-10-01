import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, firstValueFrom, map } from 'rxjs';
import { Box, ResponseDto } from '../models/box';
import { State } from 'src/app/shared/state';
import { environment } from 'src/environments/environment.prod';
import { AlertServiceService } from 'src/app/shared/service/alert-service.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})


export class BoxServiceService {
  
  constructor(private http: HttpClient,private state : State,private alertService: AlertServiceService,private toastr: ToastrService) {
  }

  async getBoxes(): Promise<void> {
    const res: any = await firstValueFrom(this.http.get<ResponseDto<Box[]>>(environment.baseUrl + '/boxes'));

    this.state.boxes = res.responseData;
  }

  async getBoxById(boxId: number): Promise<Box> {
    return firstValueFrom(this.http.get<ResponseDto<Box>>(environment.baseUrl + '/boxes/' + boxId)).then((res) => res.responseData);

  }

  // create box 
  async createBox(formData: any){
    return firstValueFrom(this.http.post<ResponseDto<Box>>(environment.baseUrl + '/boxes', formData))

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
    return firstValueFrom(this.http.put<ResponseDto<Box>>(environment.baseUrl + '/boxes/' + id, formData))

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
    return firstValueFrom(this.http.delete<ResponseDto<Box>>(environment.baseUrl + '/boxes/' + id))
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
