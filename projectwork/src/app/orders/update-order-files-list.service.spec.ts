import { TestBed } from '@angular/core/testing';

import { UpdateOrderFilesListService } from './update-order-files-list.service';

describe('UpdateOrderFilesListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateOrderFilesListService = TestBed.get(UpdateOrderFilesListService);
    expect(service).toBeTruthy();
  });
});
