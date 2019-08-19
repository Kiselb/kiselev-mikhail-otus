import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTabsModule } from '@angular/material/tabs';
import { RecentlyAddedComponent } from './recently-added/recently-added.component';
import { GoComponent } from './go/go.component';
import { SettingsComponent } from './settings/settings.component';
import { GoTaskWordComponent } from './go/go-task-word/go-task-word.component';
import { SettingsLanguageComponent } from './settings/settings-language/settings-language.component';
import { SettingsWordsNumberComponent } from './settings/settings-words-number/settings-words-number.component';
import { RecentlyAddedListComponent } from './recently-added/recently-added-list/recently-added-list.component';

@NgModule({
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
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
