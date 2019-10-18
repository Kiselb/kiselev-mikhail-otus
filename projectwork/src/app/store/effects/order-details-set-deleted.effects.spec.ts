import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { OrderDetailsSetDeletedEffects } from './order-details-set-deleted.effects';

describe('OrderDetailsSetDeletedEffects', () => {
  let actions$: Observable<any>;
  let effects: OrderDetailsSetDeletedEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderDetailsSetDeletedEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<OrderDetailsSetDeletedEffects>(OrderDetailsSetDeletedEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
