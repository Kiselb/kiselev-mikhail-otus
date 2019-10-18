import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders, HttpResponse } from  '@angular/common/http';
import { Observable } from 'rxjs';

const SERVER_URL: string = "https://b2bx.legion.ru"; //"http://localhost:3000"; //"https://b2bx.legion.ru"; //"http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class UpdateOrderFilesListService {

  constructor(private httpClient: HttpClient) { }

  public get(orderId: number): Observable<any> {
    return this.httpClient.get(`${SERVER_URL}/orders/${orderId}/files`, {observe: 'response'});
  }
}
