import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser'

import { SettingsComponent } from './settings.component';
import { AppRoutingModule } from '../app-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { RecentlyAddedComponent } from '../recently-added/recently-added.component';
import { GoComponent } from '../go/go.component';
import { GoTaskWordComponent } from '../go/go-task-word/go-task-word.component';
import { SettingsLanguageComponent } from '../settings/settings-language/settings-language.component';
import { SettingsWordsNumberComponent } from '../settings/settings-words-number/settings-words-number.component';
import { RecentlyAddedListComponent } from '../recently-added/recently-added-list/recently-added-list.component';
import { AppComponent } from '../app.component';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SettingsComponent,
        RecentlyAddedComponent,
        GoComponent,
        GoTaskWordComponent,
        SettingsLanguageComponent,
        SettingsWordsNumberComponent,
        RecentlyAddedListComponent
      ],
      imports: [MatTabsModule, AppRoutingModule, FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the value of the language and words number select', () => {
    component.settingsForm.controls['ctrlLanguage'].setValue('ru');
    component.settingsForm.controls['ctrlWordsNumber'].setValue('80');
    component.saveSettings();
    fixture.detectChanges();
    expect(component.savedLanguage).toEqual('ru');
    expect(component.savedWordsNumber).toEqual('80');
  });
  it('should call the saveSettings method', (done) => {
    let savingSpy = spyOn(component,'saveSettings')
    component.settingsForm.controls['ctrlLanguage'].setValue('ru');
    component.settingsForm.controls['ctrlWordsNumber'].setValue('80');

    let submitButton = fixture.debugElement.query(By.css('[type="submit"]')).nativeElement;
    submitButton.click();
    expect(savingSpy).toHaveBeenCalledTimes(1);
    done();
  });
  it('should emit when form submit', (done) => {
    spyOn(component.settingChanged, 'emit');
    component.settingsForm.controls['ctrlLanguage'].setValue('ru');
    component.settingsForm.controls['ctrlWordsNumber'].setValue('80');
    let submitButton = fixture.debugElement.query(By.css('[type="submit"]')).nativeElement;
    submitButton.click();
    expect(component.settingChanged.emit).toHaveBeenCalledWith({ language: 'ru', wordsNumber: '80' })
    done();
  });
});
