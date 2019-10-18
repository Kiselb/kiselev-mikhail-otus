import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SearchArticlesEffects } from './search-articles.effects';

describe('SearchArticlesEffects', () => {
  let actions$: Observable<any>;
  let effects: SearchArticlesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchArticlesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<SearchArticlesEffects>(SearchArticlesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
