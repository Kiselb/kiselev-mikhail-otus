import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { OrderDetailsRestoreEffects } from './order-details-restore.effects';

describe('OrderDetailsRestoreEffects', () => {
  let actions$: Observable<any>;
  let effects: OrderDetailsRestoreEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderDetailsRestoreEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<OrderDetailsRestoreEffects>(OrderDetailsRestoreEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
