import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable } from 'rxjs';

const SERVER_URL: string = "http://localhost:3000"; //"https://b2bx.legion.ru"; //"http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class ArticleSearchService {

  constructor(private httpClient: HttpClient) { }

  public get(criteria: string): Observable<any> {
    return this.httpClient.get(`${SERVER_URL}/articles/search?criteria=${criteria}`, {observe: 'response'});
  }
}
