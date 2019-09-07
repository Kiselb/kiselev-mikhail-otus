import { Injectable } from '@angular/core';
import { TranslateWordService } from './translate-word.service';
import { Observable, from } from 'rxjs'
import { map, concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslateTextService {

  constructor(private translateWord: TranslateWordService) {
  }

  translateText(wordsSet: String[]): Observable<any> {
    const events$ = from(wordsSet).pipe(
      concatMap(word => {
        return this.translateWord.getWord(word);
      }),
      map(value => { // This block for debugging purpose only
        return value;
      })
    )
    return events$;
  }
}
