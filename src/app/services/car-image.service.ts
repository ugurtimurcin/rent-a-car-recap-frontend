import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/list-response-model';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
  private apiUrl = 'http://localhost:4797/api/carImages/'
  constructor(private httpClient : HttpClient) { }

  getImage(carId: number): Observable<ListResponseModel<CarImage>>{
    return this.httpClient.get<ListResponseModel<CarImage>>(this.apiUrl + `getbyid?id=${carId}`);
  }

  getImages(): Observable<ListResponseModel<CarImage>>{
    return this.httpClient.get<ListResponseModel<CarImage>>(this.apiUrl + `getall`);
  }
}
