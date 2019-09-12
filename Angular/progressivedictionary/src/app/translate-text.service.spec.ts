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
    const text: string = "Hello World";
    const resultWordsSet: string[] = ["Привет", "Мир"];
    let eventCounter: number = -1;
    service.translateText(text).subscribe(
      result => {
        expect(result.translate).toBe(resultWordsSet[++eventCounter]);
        done();
      }
    );
  });
});
