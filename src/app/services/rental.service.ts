import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/response-model';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private apiUrl = 'http://localhost:4797/api/rentals/';
  constructor(private httpClient: HttpClient) { }

  add(rental: Rental): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'add', rental)
  }
}
