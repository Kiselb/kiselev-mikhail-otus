import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable } from 'rxjs';

const SERVER_URL: string = "https://b2bx.legion.ru"; //"http://localhost:3000"; //"https://b2bx.legion.ru"; //"http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

  constructor(private httpClient: HttpClient) { }

  public get(orderId: number, mode: number): Observable<any> {
    return this.httpClient.get(`${SERVER_URL}/orders/${orderId}/details?mode=${mode}`, {observe: 'response'});
  }
}
