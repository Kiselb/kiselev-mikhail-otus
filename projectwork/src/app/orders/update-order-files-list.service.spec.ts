import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { UpdateOrderFilesListService } from './update-order-files-list.service';

describe('UpdateOrderFilesListService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientModule], providers: [HttpClientModule]}));

  it('should be created', () => {
    const service: UpdateOrderFilesListService = TestBed.get(UpdateOrderFilesListService);
    expect(service).toBeTruthy();
  });
});
