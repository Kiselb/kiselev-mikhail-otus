import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RecentlyAddedComponent } from './recently-added.component';
import { SettingsComponent } from '../settings/settings.component';
import { AppRoutingModule } from '../app-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { GoComponent } from '../go/go.component';
import { GoTaskWordComponent } from '../go/go-task-word/go-task-word.component';
import { SettingsLanguageComponent } from '../settings/settings-language/settings-language.component';
import { SettingsWordsNumberComponent } from '../settings/settings-words-number/settings-words-number.component';
import { RecentlyAddedListComponent } from '../recently-added/recently-added-list/recently-added-list.component';
import { AppComponent } from '../app.component';

describe('RecentlyAddedComponent', () => {
  let component: RecentlyAddedComponent;
  let fixture: ComponentFixture<RecentlyAddedComponent>;

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
    fixture = TestBed.createComponent(RecentlyAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
