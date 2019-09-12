import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { IAppState } from './store/state'
import { actionTypes, expandDictionary, clearDictionary, changeSettings } from './store/actions';
import { dictionary, settingsLanguage, settingsWordsNumber } from './store/selectors';
import { TranslateTextService } from './translate-text.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'progressivedictionary';
  language = null;
  wordsNumber = null;
  dictionary: any[];
  testWords: any[];

  settingsLanguage$: Observable<any> = this.appStore.pipe(select(settingsLanguage));
  settingsWordsNumber$: Observable<any> = this.appStore.pipe(select(settingsWordsNumber));
  dictionary$: Observable<any> = this.appStore.pipe(select(dictionary));

  constructor(private appStore: Store<IAppState>, private translateService: TranslateTextService) {}

  onFragmentAdded(fragment: string) {
    this.translateService.translateText(fragment).subscribe(
      result => {
        const fragment = {
          timestamp: (new Date()).toLocaleString(),
          words: result
        }
        this.appStore.dispatch(expandDictionary({ fragment: fragment }));
        this.dictionary$.subscribe(
          result => {
            console.log(result);
            this.dictionary = result;
          }
        );
      }
    );
  }
  onSettingChanged(settings: any) {
    this.appStore.dispatch(changeSettings({ language: settings.language, wordsNumber: parseInt(settings.wordsNumber) }));
  }
  onStartTest(flag: boolean) {
    let testWords = [];
    testWords.push({ origin: "education", translate: "образование" });
    testWords.push({ origin: "school", translate: "школа" });
    testWords.push({ origin: "teacher", translate: "учитель" });
    testWords.push({ origin: "sdudent", translate: "студент" });
    this.testWords = testWords;
  }
  ngOnInit() {
    this.dictionary$.subscribe(
      result => {
        this.dictionary = result;
      }
    );
    this.settingsLanguage$.subscribe(
      result => {
        this.language = result || 'ru';
        return(this.language);
      }
    );
    this.settingsWordsNumber$.subscribe(
      result => {
          this.wordsNumber = result || '20';
          return this.wordsNumber;
      }
    );
  }
}
