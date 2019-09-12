import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TranslateWordService {
  //https://tech.yandex.com/translate/

  private key: string = "trnsl.1.1.20190904T171810Z.2972328b41db49b5.5b5a6008c2c3a1386f550d24d14d8be3627b710f";
  constructor(private http: HttpClient) {

  }

  getWord(word: string): Observable<any> {
    return this.http.get(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${this.key}&text=${word}&lang=en-ru`);
  }
}
