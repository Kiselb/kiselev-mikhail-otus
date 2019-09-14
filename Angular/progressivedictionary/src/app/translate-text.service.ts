import { Injectable } from '@angular/core';
import { TranslateWordService } from './translate-word.service';
import { Observable, from } from 'rxjs'
import { map, concatMap, toArray, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslateTextService {

  constructor(private translateWord: TranslateWordService) {
  }

  translateText(text: string, mode: boolean): Observable<any> {
    let wordsSet: string[] = text.replace(/\./gi, '').replace(/\,/gi, '').replace(/\-/gi, '').split(" ");
    let events$: Observable<any>;
    if (mode) {
      events$ = from(wordsSet).pipe(
        mergeMap(word => this.translateWord.getWord(word)
          .pipe(
              map(value => { return { origin: word, translate: value.text[0] }; }))
        )).pipe(toArray());
    } else {
      events$ = from(wordsSet).pipe(
        concatMap(word => this.translateWord.getWord(word)
          .pipe(
              map(value => { return { origin: word, translate: value.text[0] }; }))
        )).pipe(toArray());
    }
    return events$;
  }
}
