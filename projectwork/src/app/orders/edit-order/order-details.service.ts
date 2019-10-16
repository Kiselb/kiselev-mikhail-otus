import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable } from 'rxjs';

const SERVER_URL: string = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

  constructor(private httpClient: HttpClient) { }

  public get(orderId: number): Observable<any> {
    console.log("Service OrderID: " + orderId);
    return this.httpClient.get(`${SERVER_URL}/orders/${orderId}/details`, {observe: 'response'});
  }
}
