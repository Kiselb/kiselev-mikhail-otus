import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { GetOrderDetailsEffects } from './get-order-details.effects';

describe('GetOrderDetailsEffects', () => {
  let actions$: Observable<any>;
  let effects: GetOrderDetailsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetOrderDetailsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<GetOrderDetailsEffects>(GetOrderDetailsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
