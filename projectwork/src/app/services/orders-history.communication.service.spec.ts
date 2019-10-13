import { TestBed } from '@angular/core/testing';

import { OrdersHistoryCommunicationService } from './orders-history.communication.service';

describe('OrdersHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrdersHistoryCommunicationService = TestBed.get(OrdersHistoryCommunicationService);
    expect(service).toBeTruthy();
  });
});
