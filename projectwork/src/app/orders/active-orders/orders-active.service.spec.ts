import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { OrdersActiveService } from './orders-active.service';

describe('OrdersActiveService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientModule], providers: [HttpClientModule]}));

  it('should be created', () => {
    const service: OrdersActiveService = TestBed.get(OrdersActiveService);
    expect(service).toBeTruthy();
  });
});
