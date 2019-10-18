import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { IAppState } from '../../store/state';
import { appReducers } from '../../store/reducers'

import { ImportOrderComponent } from './import-order.component';

describe('ImportOrderComponent', () => {
  let component: ImportOrderComponent;
  let fixture: ComponentFixture<ImportOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportOrderComponent ],
      imports: [
        RouterModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot(appReducers)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
