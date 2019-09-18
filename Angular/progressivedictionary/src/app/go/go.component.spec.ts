import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SettingsComponent } from '../settings/settings.component';
import { AppRoutingModule } from '../app-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { RecentlyAddedComponent } from '../recently-added/recently-added.component';
import { GoComponent, TEST_STATES } from './go.component';
import { GoTaskWordComponent } from '../go/go-task-word/go-task-word.component';
import { SettingsLanguageComponent } from '../settings/settings-language/settings-language.component';
import { SettingsWordsNumberComponent } from '../settings/settings-words-number/settings-words-number.component';
import { RecentlyAddedListComponent } from '../recently-added/recently-added-list/recently-added-list.component';
import { AppComponent } from '../app.component';

describe('GoComponent', () => {
  let component: GoComponent;
  let fixture: ComponentFixture<GoComponent>;

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
    fixture = TestBed.createComponent(GoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.testState).toBe(TEST_STATES.STATE_FINISH);
    expect(component.words.length).toBe(0);
    expect(component.wordsCounter).toBe(0);
    expect(component.buttonCaption).toBe("Start");
    expect(component.testMessage.length).toBe(0);    
  });
  it('should pass correct state sequense 1', (done) => {
    expect(component.testState).toBe(TEST_STATES.STATE_FINISH);
    component.startTest.subscribe(() => {
      expect(component.testState).toBe(TEST_STATES.STATE_START);
      component.testWords = [{ origin: 'education', translate: 'образование' }, { origin: 'school', translate: 'школа' }];
      expect(component.words.length).toBe(2);
      expect(component.testState).toBe(TEST_STATES.STATE_TEST);
      component.answer.setValue('?');
      component.onCommand();
      expect(component.testState).toBe(TEST_STATES.STATE_FAILED);
      component.onCommand();
      expect(component.testState).toBe(TEST_STATES.STATE_TEST);
      component.answer.setValue('школа');
      component.onCommand();
      expect(component.testState).toBe(TEST_STATES.STATE_FINISH);
      done();
    });
    component.onCommand();
  });
  it('should pass correct state sequense 2', (done) => {
    expect(component.testState).toBe(TEST_STATES.STATE_FINISH);
    component.startTest.subscribe(() => {
      expect(component.testState).toBe(TEST_STATES.STATE_START);
      component.testWords = [{ origin: 'education', translate: 'образование' }, { origin: 'school', translate: 'школа' }];
      expect(component.words.length).toBe(2);
      expect(component.testState).toBe(TEST_STATES.STATE_TEST);
      component.answer.setValue('образование');
      component.onCommand();
      expect(component.testState).toBe(TEST_STATES.STATE_TEST);
      component.answer.setValue('школа');
      component.onCommand();
      expect(component.testState).toBe(TEST_STATES.STATE_FINISH);
      done();
    });
    component.onCommand();
  });
  it('should pass correct state sequense 3', (done) => {
    expect(component.testState).toBe(TEST_STATES.STATE_FINISH);
    component.startTest.subscribe(() => {
      expect(component.testState).toBe(TEST_STATES.STATE_START);
      component.testWords = [{ origin: 'education', translate: 'образование' }, { origin: 'school', translate: 'школа' }];
      expect(component.words.length).toBe(2);
      expect(component.testState).toBe(TEST_STATES.STATE_TEST);
      component.answer.setValue('образование');
      component.onCommand();
      expect(component.testState).toBe(TEST_STATES.STATE_TEST);
      component.answer.setValue('?');
      component.onCommand();
      expect(component.testState).toBe(TEST_STATES.STATE_FAILED);
      component.onCommand();
      expect(component.testState).toBe(TEST_STATES.STATE_FINISH);
      done();
    });
    component.onCommand();
  });
  it('should pass correct state sequense 4', () => {
    expect(component.testState).toBe(TEST_STATES.STATE_FINISH);
    component.testWords = [];
    expect(component.words.length).toBe(0);
    expect(component.testState).toBe(TEST_STATES.STATE_START);
    component.onCommand();
    expect(component.testState).toBe(TEST_STATES.STATE_START);
  });
});
