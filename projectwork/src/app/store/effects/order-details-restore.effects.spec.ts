import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { IAppState } from '../../store/state';
import { appReducers } from '../../store/reducers';

import { OrderDetailsRestoreEffects } from './order-details-restore.effects';

describe('OrderDetailsRestoreEffects', () => {
  let actions$: Observable<any>;
  let effects: OrderDetailsRestoreEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderDetailsRestoreEffects,
        provideMockActions(() => actions$),
        HttpClientModule,
        HttpClient
      ],
      imports: [
        HttpClientModule,
        StoreModule.forRoot(appReducers)
      ]
    });

    effects = TestBed.get<OrderDetailsRestoreEffects>(OrderDetailsRestoreEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
