import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsWordsNumberComponent } from './settings-words-number.component';

describe('SettingsWordsNumberComponent', () => {
  let component: SettingsWordsNumberComponent;
  let fixture: ComponentFixture<SettingsWordsNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsWordsNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsWordsNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
