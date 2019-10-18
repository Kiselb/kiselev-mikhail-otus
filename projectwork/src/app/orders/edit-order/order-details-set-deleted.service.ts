import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { Observable } from 'rxjs';

const SERVER_URL: string = "https://b2bx.legion.ru"; //"http://localhost:3000"; //"https://b2bx.legion.ru"; //"http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsSetDeletedService {

  constructor(private httpClient: HttpClient) { }

  public post(detailsId: number): Observable<any> {
    const headers = new HttpHeaders();

    headers.set('Content-Type', 'application/json');
    return this.httpClient.post<any>(`${SERVER_URL}/orders/details/${detailsId}/setdeleted`, null, {headers: headers, reportProgress: false, observe: 'response'});
  }
}
