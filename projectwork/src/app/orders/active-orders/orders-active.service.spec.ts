import { TestBed } from '@angular/core/testing';

import { OrdersActiveService } from './orders-active.service';

describe('OrdersActiveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrdersActiveService = TestBed.get(OrdersActiveService);
    expect(service).toBeTruthy();
  });
});
