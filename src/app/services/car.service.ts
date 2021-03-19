import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { DetailModel } from '../models/detail-model';
import { ListResponseModel } from '../models/list-response-model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl = 'http://localhost:4797/api/cars/';
  constructor(private httpClient: HttpClient) { }

  getCars() : Observable<ListResponseModel<Car>>{
    return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl + 'getcardetails');
  }

  getByBrands(id:number): Observable<ListResponseModel<Car>>{
    return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl + `getbybrand?id=${id}`);
  }

  getCar(id: number):Observable<DetailModel<Car>>{
    return this.httpClient.get<DetailModel<Car>>(this.apiUrl + `getdetailbyid?id=${id}`)
  }
}
