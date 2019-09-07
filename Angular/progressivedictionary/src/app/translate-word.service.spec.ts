import { TestBed } from '@angular/core/testing';

import { TranslateWordService } from './translate-word.service';
import { HttpClientModule } from '@angular/common/http';

describe('TranslateWordService', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [HttpClientModule], providers: [HttpClientModule] }));

  it('should be created', () => {
    const service: TranslateWordService = TestBed.get(TranslateWordService);
    expect(service).toBeTruthy();
  });
  it('test translation', (done) => {
    const service: TranslateWordService = TestBed.get(TranslateWordService);
    service.getWord("TEST").subscribe(
      result => {
        expect(result.text[0]).toBe("Тест");
        done();
      }
    );
  });
});
