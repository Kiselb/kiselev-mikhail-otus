import { TestBed } from '@angular/core/testing';

import { ArticleSearchService } from './article-search.service';

describe('ArticleSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArticleSearchService = TestBed.get(ArticleSearchService);
    expect(service).toBeTruthy();
  });
});
