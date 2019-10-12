import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { GetOrderFilesEffects } from './get-order-files.effects';

describe('GetOrderFilesEffects', () => {
  let actions$: Observable<any>;
  let effects: GetOrderFilesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetOrderFilesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<GetOrderFilesEffects>(GetOrderFilesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
