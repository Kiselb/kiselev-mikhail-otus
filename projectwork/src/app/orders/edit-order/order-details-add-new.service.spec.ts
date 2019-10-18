import { TestBed } from '@angular/core/testing';

import { OrderDetailsAddNewService } from './order-details-add-new.service';

describe('OrderDetailsAddNewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderDetailsAddNewService = TestBed.get(OrderDetailsAddNewService);
    expect(service).toBeTruthy();
  });
});
