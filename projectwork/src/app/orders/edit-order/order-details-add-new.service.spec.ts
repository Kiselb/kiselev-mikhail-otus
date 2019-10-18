import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { OrderDetailsAddNewService } from './order-details-add-new.service';

describe('OrderDetailsAddNewService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientModule], providers: [HttpClientModule]}));

  it('should be created', () => {
    const service: OrderDetailsAddNewService = TestBed.get(OrderDetailsAddNewService);
    expect(service).toBeTruthy();
  });
});
