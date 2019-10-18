import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { OrderDetailsRestoreService } from './order-details-restore.service';

describe('OrderDetailsRestoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientModule], providers: [HttpClientModule]}));

  it('should be created', () => {
    const service: OrderDetailsRestoreService = TestBed.get(OrderDetailsRestoreService);
    expect(service).toBeTruthy();
  });
});
