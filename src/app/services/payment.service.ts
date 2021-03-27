import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment';
import { ResponseModel } from '../models/response-model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://localhost:4797/api/payments/';
  constructor(private httpClient: HttpClient) { }

  addPayment(payment: Payment): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'add', payment);
  }
}
