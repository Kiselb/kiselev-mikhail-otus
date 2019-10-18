import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { IAppState } from '../../store/state';
import { appReducers } from '../../store/reducers';

import { OrderDetailsAddNewEffects } from './order-details-add-new.effects';

describe('OrderDetailsAddNewEffects', () => {
  let actions$: Observable<any>;
  let effects: OrderDetailsAddNewEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderDetailsAddNewEffects,
        provideMockActions(() => actions$),
        HttpClientModule,
        HttpClient
      ],
      imports: [
        HttpClientModule,
        StoreModule.forRoot(appReducers)
      ]
    });

    effects = TestBed.get<OrderDetailsAddNewEffects>(OrderDetailsAddNewEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
