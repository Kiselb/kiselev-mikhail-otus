import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable } from 'rxjs';

const SERVER_URL: string = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class OrdersActiveService {

  constructor(private httpClient: HttpClient) { }

  public get(userId: number): Observable<any> {
    return this.httpClient.get(`${SERVER_URL}/orders/active/${userId}`, {observe: 'response'});
  }
}
