import { TestBed, async } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, select } from '@ngrx/store';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateTextService } from './translate-text.service';
import { TranslateWordService } from './translate-word.service';
//import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppComponent } from './app.component';

import { MatTabsModule } from '@angular/material/tabs';
import { RecentlyAddedComponent } from './recently-added/recently-added.component';
import { GoComponent } from './go/go.component';
import { SettingsComponent } from './settings/settings.component';
import { GoTaskWordComponent } from './go/go-task-word/go-task-word.component';
import { SettingsLanguageComponent } from './settings/settings-language/settings-language.component';
import { SettingsWordsNumberComponent } from './settings/settings-words-number/settings-words-number.component';
import { RecentlyAddedListComponent } from './recently-added/recently-added-list/recently-added-list.component';
import { LOCAL_STORAGE_ITEM_KEY, IAppState } from './store/state'
import { actionTypes, expandDictionary, clearDictionary, changeSettings } from './store/actions';
import { dictionary, settingsLanguage, settingsWordsNumber } from './store/selectors';
import { ExpectedConditions } from 'protractor';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatTabsModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        //HttpClientTestingModule,
        HttpClientModule,
        StoreModule.forRoot(reducers, { metaReducers })
      ],
      declarations: [
        AppComponent,
        RecentlyAddedComponent,
        GoComponent,
        SettingsComponent,
        GoTaskWordComponent,
        SettingsLanguageComponent,
        SettingsWordsNumberComponent,
        RecentlyAddedListComponent
      ],
      providers: [HttpClientModule, TranslateTextService, TranslateWordService]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'progressivedictionary'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('progressivedictionary');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to progressivedictionary!');
  });

  it('test Settings change event (language)', (done) => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const store: Store<IAppState> = TestBed.get<Store<IAppState>>(Store);
    const settingsLanguage$: Observable<any> = store.pipe(select(settingsLanguage));

    app.onSettingChanged({language: 'ru', wordsNumber: 10 });

    settingsLanguage$.subscribe(
      result => {
          expect(result).toBe('ru');
          done();
      }
    );
  });

  it('test Settings change event (words number)', (done) => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const store: Store<IAppState> = TestBed.get<Store<IAppState>>(Store);
    const settingsWordsNumber$: Observable<any> = store.pipe(select(settingsWordsNumber));

    app.onSettingChanged({language: 'ru', wordsNumber: 10 });

    settingsWordsNumber$.subscribe(
      result => {
          expect(result).toBe(10);
          done();
      }
    );
  });

  it('test words generation for testing', (done) => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const store: Store<IAppState> = TestBed.get<Store<IAppState>>(Store);

    store.dispatch(clearDictionary());    
    store.dispatch(expandDictionary({
        fragment: {
            timestamp: "20190906",
            words: [
                { origin: "school", translate: "школа" }
            ]
        }
    }));
    store.dispatch(changeSettings({ language: 'en', wordsNumber: 10 }));

    app.onStartTest(true);
    app.testWords$.subscribe((result) => {
      expect(result[0].origin).toBe("school");
      expect(result[1].origin).toBe("school");
      expect(result[2].origin).toBe("school");
      expect(result[3].origin).toBe("school");
      expect(result[4].origin).toBe("school");
      expect(result[5].origin).toBe("school");
      expect(result[6].origin).toBe("school");
      expect(result[7].origin).toBe("school");
      expect(result[8].origin).toBe("school");
      expect(result[9].origin).toBe("school");
      expect(result.length).toBe(10);
      done();
    });
  });

  it('test addition fragment to dictionary', (done) => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const store: Store<IAppState> = TestBed.get<Store<IAppState>>(Store);

    store.dispatch(clearDictionary());

    app.testFragmentAddition.subscribe((result) => {
      expect(result.fragment.words[0].origin).toBe("school");
      expect(result.fragment.words[0].translate).toBe("школа");
      done();
    });
    app.onFragmentAdded("school");
  });
});
