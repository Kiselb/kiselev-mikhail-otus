import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { IAppState } from '../../store/state';
import { appReducers } from '../../store/reducers';

import { GetOrderDetailsEffects } from './get-order-details.effects';

describe('GetOrderDetailsEffects', () => {
  let actions$: Observable<any>;
  let effects: GetOrderDetailsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetOrderDetailsEffects,
        provideMockActions(() => actions$),
        HttpClientModule,
        HttpClient
      ],
      imports: [
        HttpClientModule,
        StoreModule.forRoot(appReducers)
      ]
    });

    effects = TestBed.get<GetOrderDetailsEffects>(GetOrderDetailsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
