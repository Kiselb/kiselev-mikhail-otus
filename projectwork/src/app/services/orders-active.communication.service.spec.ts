import { TestBed } from '@angular/core/testing';

import { OrdersActiveCommunicationService } from './orders-active.communication.service';

describe('OrdersActive.CommunicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrdersActiveCommunicationService = TestBed.get(OrdersActiveCommunicationService);
    expect(service).toBeTruthy();
  });
});
