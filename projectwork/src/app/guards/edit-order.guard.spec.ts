import { TestBed, async, inject } from '@angular/core/testing';
import { Store, select } from '@ngrx/store';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { IAppState } from '../store/state';
import { appReducers } from '../store/reducers';

import { EditOrderGuard } from './edit-order.guard';

describe('EditOrderGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EditOrderGuard
      ],
      imports: [
        StoreModule.forRoot(appReducers)
      ]
    });
  });

  it('should ...', inject([EditOrderGuard], (guard: EditOrderGuard) => {
    expect(guard).toBeTruthy();
  }));
});
