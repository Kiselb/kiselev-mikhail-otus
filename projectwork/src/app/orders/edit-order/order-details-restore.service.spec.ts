import { TestBed } from '@angular/core/testing';

import { OrderDetailsRestoreService } from './order-details-restore.service';

describe('OrderDetailsRestoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderDetailsRestoreService = TestBed.get(OrderDetailsRestoreService);
    expect(service).toBeTruthy();
  });
});
