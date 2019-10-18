import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { OrdersHistoryService } from './orders-history.service';

describe('OrdersHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientModule], providers: [HttpClientModule]}));

  it('should be created', () => {
    const service: OrdersHistoryService = TestBed.get(OrdersHistoryService);
    expect(service).toBeTruthy();
  });
});
