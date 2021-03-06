import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { Observable } from 'rxjs';

const SERVER_URL: string = "https://b2bx.legion.ru"; //"http://localhost:3000"; //"https://b2bx.legion.ru"; //"http://localhost:3000";

interface IData {
  materialId: number,
  quantity: number
}

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsAddNewService {

  constructor(private httpClient: HttpClient) { }

  public post(orderId: number, materialId: number, quantity: number): Observable<any> {
    const headers = new HttpHeaders();
    const data: IData = {"materialId": materialId, "quantity": quantity};

    headers.set('Content-Type', 'application/json');
    return this.httpClient.post<IData>(`${SERVER_URL}/orders/${orderId}/details/addnew`, data, {headers: headers, reportProgress: false, observe: 'response'});
  }
}
