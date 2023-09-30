import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, firstValueFrom, map } from 'rxjs';
import { Box, ResponseDto } from '../models/box';
import { State } from 'src/app/shared/state';
import { environment } from 'src/environments/environment.prod';
import { AlertServiceService } from 'src/app/shared/service/alert-service.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})


export class BoxServiceService {
  products: Box[] = [];

  constructor(private http: HttpClient,private state : State,private alertService: AlertServiceService,private toastr: ToastrService) {
  }

  async getBoxes(): Promise<void> {
    const res: any = await firstValueFrom(this.http.get<ResponseDto<Box[]>>(environment.baseUrl + '/boxes'));

    this.state.boxes = res.responseData;
  }

  getBoxById(boxId: number): Promise<Box> {
    return firstValueFrom(this.http.get<ResponseDto<Box>>(environment.baseUrl + '/boxes/' + boxId)).then((res) => res.responseData);

  }

  updateBox(id: number, formData: any) {
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

}
