import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser'

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
  it('should change button text', () => {
    let button = fixture.debugElement.query(By.css('button'));

    button.nativeElement.click();
    fixture.detectChanges();

    if (component.mode) {
      expect(button.nativeElement.textContent).toContain('Add');
    } else {
      expect(button.nativeElement.textContent).toContain('Save');
    }
    console.log(button.nativeElement.textContent)

    button.nativeElement.click();
    fixture.detectChanges();

    button = fixture.debugElement.query(By.css('button'));
    console.log(button.nativeElement.textContent)

    if (component.mode) {
      expect(button.nativeElement.textContent).toContain('Add');
    } else {
      expect(button.nativeElement.textContent).toContain('Save');
    }
  });
  it('should emit event of fragment acceptance', (done) => {
    component.fragmentAdded.subscribe(result => {
      expect(result).toEqual('education');
      done();
    });
    component.mode = false;
    component.fragment.setValue('education');
    component.toogleMode();
  });
});
