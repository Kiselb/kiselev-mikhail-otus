import { TestBed, async, inject } from '@angular/core/testing';

import { EditOrderGuard } from './edit-order.guard';

describe('EditOrderGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditOrderGuard]
    });
  });

  it('should ...', inject([EditOrderGuard], (guard: EditOrderGuard) => {
    expect(guard).toBeTruthy();
  }));
});
