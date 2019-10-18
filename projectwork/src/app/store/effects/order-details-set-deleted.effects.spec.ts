import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { IAppState } from '../../store/state';
import { appReducers } from '../../store/reducers';

import { OrderDetailsSetDeletedEffects } from './order-details-set-deleted.effects';

describe('OrderDetailsSetDeletedEffects', () => {
  let actions$: Observable<any>;
  let effects: OrderDetailsSetDeletedEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderDetailsSetDeletedEffects,
        provideMockActions(() => actions$),
        HttpClientModule,
        HttpClient
      ],
      imports: [
        HttpClientModule,
        StoreModule.forRoot(appReducers)
      ]
    });

    effects = TestBed.get<OrderDetailsSetDeletedEffects>(OrderDetailsSetDeletedEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
