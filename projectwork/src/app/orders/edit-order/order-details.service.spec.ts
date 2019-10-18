import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { OrderDetailsService } from './order-details.service';

describe('OrderDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientModule], providers: [HttpClientModule]}));

  it('should be created', () => {
    const service: OrderDetailsService = TestBed.get(OrderDetailsService);
    expect(service).toBeTruthy();
  });
});
