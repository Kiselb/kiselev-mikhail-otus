import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable } from 'rxjs';

const SERVER_URL: string = "http://localhost:3000"; //"https://b2bx.legion.ru"; //"http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class OrdersHistoryService {

  constructor(private httpClient: HttpClient) { }

  public get(userId: number, criteria: string): Observable<any> {
    if (criteria) {
      return this.httpClient.get(`${SERVER_URL}/orders/history/${userId}?criteria=${criteria}`, {observe: 'response'});
    }
    return this.httpClient.get(`${SERVER_URL}/orders/history/${userId}`, {observe: 'response'});
  }
}
