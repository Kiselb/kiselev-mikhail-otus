import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { IAppState } from '../../store/state';
import { appReducers } from '../../store/reducers';

import { GetOrderFilesEffects } from './get-order-files.effects';

describe('GetOrderFilesEffects', () => {
  let actions$: Observable<any>;
  let effects: GetOrderFilesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetOrderFilesEffects,
        provideMockActions(() => actions$),
        HttpClientModule,
        HttpClient
      ],
      imports: [
        HttpClientModule,
        StoreModule.forRoot(appReducers)
      ]
    });

    effects = TestBed.get<GetOrderFilesEffects>(GetOrderFilesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
