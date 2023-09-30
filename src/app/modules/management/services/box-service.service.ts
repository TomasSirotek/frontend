import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoxServiceService {
  private dataUrl = 'boxes.json';

  constructor(private http: HttpClient) {}

  getBoxes(): Observable<any[]> {
    return this.http.get<any[]>(this.dataUrl);
  }

  getBoxById(id: number): Observable<any | undefined> {
    return this.getBoxes().pipe(
      map((boxes) => boxes.find((box) => box.id === id))
    );
  }
}
