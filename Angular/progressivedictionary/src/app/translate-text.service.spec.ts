import { TestBed } from '@angular/core/testing';

import { TranslateTextService } from './translate-text.service';
import { HttpClientModule } from '@angular/common/http';

describe('TranslateTextService', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [HttpClientModule], providers: [HttpClientModule] }));

  it('should be created', () => {
    const service: TranslateTextService = TestBed.get(TranslateTextService);
    expect(service).toBeTruthy();
  });

  it('test translation concat mode', (done) => {
    const service: TranslateTextService = TestBed.get(TranslateTextService);
    const text: string = "Hello World";
    const resultWordsSet: string[] = ["Привет", "Мир"];
    let eventCounter: number = 0;
    service.translateText(text, false).subscribe(
      result => {
        expect(result[eventCounter].translate).toBe(resultWordsSet[eventCounter]);
        eventCounter++;
        done();
      }
    );
  });

  it('test translation merge mode', (done) => {
    const service: TranslateTextService = TestBed.get(TranslateTextService);
    const text: string = "Hello World";
    const resultWordsSet: string[] = ["Привет", "Мир"];
    service.translateText(text, true).subscribe(
      result => {
        expect(resultWordsSet.indexOf(result[0].translate)).toBeGreaterThanOrEqual(0);
        expect(resultWordsSet.indexOf(result[1].translate)).toBeGreaterThanOrEqual(0);
        done();
      }
    );
  });
});
