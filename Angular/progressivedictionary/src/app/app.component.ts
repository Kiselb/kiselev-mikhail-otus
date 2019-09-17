import { Component, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Observable, range, from } from 'rxjs';
import { toArray, mergeMap, take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { IAppState } from './store/state'
import { expandDictionary, changeSettings } from './store/actions';
import { dictionary, settingsLanguage, settingsWordsNumber, getRandomWord } from './store/selectors';
import { TranslateTextService } from './translate-text.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'progressivedictionary';
  
  settingsLanguage$: Observable<string> = this.appStore.pipe(select(settingsLanguage));
  settingsWordsNumber$: Observable<number> = this.appStore.pipe(select(settingsWordsNumber));
  dictionary$: Observable<any> = this.appStore.pipe(select(dictionary));
  testWords$: Observable<any> = null;

  testFragmentAddition = new EventEmitter<any>();

  constructor(private appStore: Store<IAppState>, private translateService: TranslateTextService) {
  }

  onFragmentAdded(fragment: string) {
    this.translateService.translateText(fragment, true).subscribe(
      result => {
        const fragment = {
          timestamp: (new Date()).toLocaleString(),
          words: result
        }
        this.appStore.dispatch(expandDictionary({ fragment: fragment }));
        this.testFragmentAddition.emit({ fragment: fragment });
      }
    );
  }
  onSettingChanged(settings: any) {
    this.appStore.dispatch(changeSettings({ language: settings.language, wordsNumber: parseInt(settings.wordsNumber) }));
  }
  onStartTest(flag: boolean) {
    (this.settingsWordsNumber$).subscribe(
       value =>  { this.testWords$ = range(0, value).pipe(
         mergeMap(() => { getRandomWord.release(); return this.appStore.pipe(select(getRandomWord)).pipe(take(1)) })
       ).pipe(toArray());
    });
  }
  ngOnInit() {
  }
}
