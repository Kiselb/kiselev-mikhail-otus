import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { IAppState } from '../../store/state';
import { appReducers } from '../../store/reducers';

import { UploadOrderFileEffects } from './upload-order-file.effects';

describe('UploadOrderFileEffects', () => {
  let actions$: Observable<any>;
  let effects: UploadOrderFileEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UploadOrderFileEffects,
        provideMockActions(() => actions$),
        HttpClientModule,
        HttpClient
      ],
      imports: [
        HttpClientModule,
        StoreModule.forRoot(appReducers)
      ]
    });

    effects = TestBed.get<UploadOrderFileEffects>(UploadOrderFileEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
