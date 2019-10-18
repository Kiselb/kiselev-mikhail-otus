import { TestBed } from '@angular/core/testing';

import { OrderDetailsSetDeletedService } from './order-details-set-deleted.service';

describe('OrderDetailsSetDeletedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderDetailsSetDeletedService = TestBed.get(OrderDetailsSetDeletedService);
    expect(service).toBeTruthy();
  });
});
