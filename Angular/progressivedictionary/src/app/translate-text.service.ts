import { Injectable } from '@angular/core';
import { TranslateWordService } from './translate-word.service';
import { Observable, from, of } from 'rxjs'
import { map, concatMap, reduce, toArray, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslateTextService {

  constructor(private translateWord: TranslateWordService) {
  }

  translateText(text: string): Observable<any> {
    let wordsSet: string[] = text.replace(/\./gi, '').replace(/\,/gi, '').replace(/\-/gi, '').split(" ");
    const events$ = from(wordsSet).pipe(
        concatMap(word => this.translateWord.getWord(word)
          .pipe(
              map(value => { return { origin: word, translate: value.text[0] }; }))
        )).pipe(toArray());
    
    return events$;
  }
}
