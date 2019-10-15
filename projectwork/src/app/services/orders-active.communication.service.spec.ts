import { TestBed } from '@angular/core/testing';

import { OrdersActive.CommunicationService } from './orders-active.communication.service';

describe('OrdersActive.CommunicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrdersActive.CommunicationService = TestBed.get(OrdersActive.CommunicationService);
    expect(service).toBeTruthy();
  });
});
