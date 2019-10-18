import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders, HttpResponse } from  '@angular/common/http';
import { Observable } from 'rxjs';

const SERVER_URL: string = "http://localhost:3000"; //"https://b2bx.legion.ru"; //"http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private httpClient: HttpClient) { }

  public upload(data: FormData): Observable<any> {
    return this.httpClient.post<any>(`${SERVER_URL}/upload`, data, { reportProgress: false, observe: 'response'});
  }
}
