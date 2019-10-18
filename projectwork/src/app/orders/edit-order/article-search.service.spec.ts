import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ArticleSearchService } from './article-search.service';

describe('ArticleSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientModule], providers: [HttpClientModule]}));

  it('should be created', () => {
    const service: ArticleSearchService = TestBed.get(ArticleSearchService);
    expect(service).toBeTruthy();
  });
});
