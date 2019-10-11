import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { UploadOrderFileEffects } from './upload-order-file.effects';

describe('UploadOrderFileEffects', () => {
  let actions$: Observable<any>;
  let effects: UploadOrderFileEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UploadOrderFileEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<UploadOrderFileEffects>(UploadOrderFileEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
