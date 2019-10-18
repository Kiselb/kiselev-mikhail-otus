import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { OrderDetailsSetDeletedService } from './order-details-set-deleted.service';

describe('OrderDetailsSetDeletedService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientModule], providers: [HttpClientModule]}));

  it('should be created', () => {
    const service: OrderDetailsSetDeletedService = TestBed.get(OrderDetailsSetDeletedService);
    expect(service).toBeTruthy();
  });
});
