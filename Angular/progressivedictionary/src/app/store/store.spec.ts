import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { LOCAL_STORAGE_ITEM_KEY, IAppState } from './state'
import { reducers, metaReducers } from './reducers';
import { actionTypes, expandDictionary, clearDictionary, changeSettings } from './actions';
import { dictionary, settingsLanguage, settingsWordsNumber } from './selectors';

describe('Store', () => {
    const localStogarePattern1 = '{"dictionary":{"content":[{"timestamp":"20190906","words":[{"origin":"school","translate":"школа"}]},{"timestamp":"20190907","words":[{"origin":"education","translate":"образование"}]}]},"settings":{"language":"en","wordsNumber":10}}';
    const localStogarePattern2 = '{"dictionary":{"content":[{"timestamp":"20190906","words":[{"origin":"school","translate":"школа"}]},{"timestamp":"20190907","words":[{"origin":"education","translate":"образование"}]}]},"settings":{"language":"ru","wordsNumber":100}}';
    beforeEach(() => TestBed.configureTestingModule({ imports: [StoreModule.forRoot(reducers, { metaReducers })], providers: [] }));

    it('clear store', (done) => {
        
        let store: Store<IAppState>;
        let vocabulary$: Observable<any>;

        store = TestBed.get<Store<IAppState>>(Store);
        vocabulary$ = store.pipe(select(dictionary));

        store.dispatch(clearDictionary());
        
        vocabulary$.subscribe(
        result => {
            expect(result.length).toBe(0);
            done();
        }
        );
    });

    it('add fragment', (done) => {
        
        let store: Store<IAppState>;
        let dictionary$: Observable<any>;

        store = TestBed.get<Store<IAppState>>(Store);
        dictionary$ = store.pipe(select(dictionary));

        store.dispatch(clearDictionary());    
        store.dispatch(expandDictionary({
            fragment: {
                timestamp: "20190906",
                words: [
                    { origin: "school", translate: "школа" }
                ]
            }
        }));
        store.dispatch(expandDictionary({
            fragment: {
                timestamp: "20190907",
                words: [
                    { origin: "education", translate: "образование" }
                ]
            }
        }));
        
        dictionary$.subscribe(
            result => {
                expect(result.length).toBe(2);
                expect(result[0].timestamp).toBe("20190906");
                expect(result[1].timestamp).toBe("20190907");
                expect(result[0].words[0].origin).toBe("school");
                expect(result[0].words[0].translate).toBe("школа");
                expect(result[1].words[0].origin).toBe("education");
                expect(result[1].words[0].translate).toBe("образование");
                expect(window.localStorage.getItem(LOCAL_STORAGE_ITEM_KEY)).toBe(localStogarePattern1);
                done();
            });
        });
    it('change settings language', (done) => {
        let store: Store<IAppState>;
        let settingsLanguage$: Observable<any>;

        store = TestBed.get<Store<IAppState>>(Store);
        settingsLanguage$ = store.pipe(select(settingsLanguage));

        store.dispatch(changeSettings({ language: 'ru', wordsNumber: 100 }));
        settingsLanguage$.subscribe(
            result => {
                expect(result).toBe('ru');
                //expect(window.localStorage.getItem(LOCAL_STORAGE_ITEM_KEY)).toBe(localStogarePattern2);
                done();
            }
        );
    });
    it('change settings words number', (done) => {
        let store: Store<IAppState>;
        let settingsWordsNumber$: Observable<any>;

        store = TestBed.get<Store<IAppState>>(Store);
        settingsWordsNumber$ = store.pipe(select(settingsWordsNumber));

        store.dispatch(changeSettings({ language: 'ru', wordsNumber: 100 }));
        settingsWordsNumber$.subscribe(
            result => {
                expect(result).toBe(100);
                //expect(window.localStorage.getItem(LOCAL_STORAGE_ITEM_KEY)).toBe(localStogarePattern2);
                done();
            }
        );
    });
});
