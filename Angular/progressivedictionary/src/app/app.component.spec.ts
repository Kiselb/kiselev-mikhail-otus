import { TestBed, async } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

import { MatTabsModule } from '@angular/material/tabs';
import { RecentlyAddedComponent } from './recently-added/recently-added.component';
import { GoComponent } from './go/go.component';
import { SettingsComponent } from './settings/settings.component';
import { GoTaskWordComponent } from './go/go-task-word/go-task-word.component';
import { SettingsLanguageComponent } from './settings/settings-language/settings-language.component';
import { SettingsWordsNumberComponent } from './settings/settings-words-number/settings-words-number.component';
import { RecentlyAddedListComponent } from './recently-added/recently-added-list/recently-added-list.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatTabsModule,
        BrowserAnimationsModule
      ],
      declarations: [
        AppComponent,
        RecentlyAddedComponent,
        GoComponent,
        SettingsComponent,
        GoTaskWordComponent,
        SettingsLanguageComponent,
        SettingsWordsNumberComponent,
        RecentlyAddedListComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'progressivedictionary'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('progressivedictionary');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to progressivedictionary!');
  });
});
