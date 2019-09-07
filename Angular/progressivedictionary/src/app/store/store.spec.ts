import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { IAppState } from './state'
import { reducers, metaReducers } from './reducers';
import { actionTypes, expandDictionary, clearDictionary } from './actions';
import { dictionary } from './selectors';

describe('Store', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [StoreModule.forRoot(reducers, { metaReducers })], providers: [] }));

  it('clear store', (done) => {
    
    let store: Store<IAppState>;
    let vocabulary$: Observable<any>;

    store = TestBed.get<Store<IAppState>>(Store);
    vocabulary$ = store.pipe(select(dictionary));

    store.dispatch(clearDictionary());
    
    vocabulary$.subscribe(
      result => {
        console.log("Result:");
        console.log(result);
        expect(result.content.length).toBe(0);
        done();
      }
    );
  });

  //return;

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
    
    dictionary$.subscribe(
      result => {
        console.log("Result:");
        console.log(result);
        expect(result.content.length).toBe(1);
        done();
      }
    );
  });
});
