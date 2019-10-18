import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { OrderDetailsAddNewEffects } from './order-details-add-new.effects';

describe('OrderDetailsAddNewEffects', () => {
  let actions$: Observable<any>;
  let effects: OrderDetailsAddNewEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderDetailsAddNewEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<OrderDetailsAddNewEffects>(OrderDetailsAddNewEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
