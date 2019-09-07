import { TestBed } from '@angular/core/testing';

import { TranslateTextService } from './translate-text.service';
import { HttpClientModule } from '@angular/common/http';

describe('TranslateTextService', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [HttpClientModule], providers: [HttpClientModule] }));

  it('should be created', () => {
    const service: TranslateTextService = TestBed.get(TranslateTextService);
    expect(service).toBeTruthy();
  });

  it('test translation', (done) => {
    const service: TranslateTextService = TestBed.get(TranslateTextService);
    const wordsSet: String[] = ("Hello World").split(" ");
    const resultWordsSet: String[] = ["Привет", "Мир"];
    let eventCounter: number = -1;
    service.translateText(wordsSet).subscribe(
      result => {
        expect(result.code).toBe(200);
        expect(result.text[0]).toBe(resultWordsSet[++eventCounter]);
        done();
      }
    );
  });
});
