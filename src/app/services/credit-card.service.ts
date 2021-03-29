import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ResponseModel } from '../models/response-model';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  private apiUrl = 'http://localhost:4797/api/creditcards/';
  constructor(private httpClient: HttpClient) { }

  addCreditCard(creditCard: CreditCard): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'add', creditCard);
  }
}
