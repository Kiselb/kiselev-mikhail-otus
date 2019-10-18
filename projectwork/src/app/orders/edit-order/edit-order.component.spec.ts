import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderNumberPipe } from '../../pipes/order-number.pipe';
import { Store, select } from '@ngrx/store';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { IAppState } from '../../store/state';
import { appReducers } from '../../store/reducers';

import { EditOrderComponent } from './edit-order.component';

describe('EditOrderComponent', () => {
  let component: EditOrderComponent;
  let fixture: ComponentFixture<EditOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EditOrderComponent,
        OrderNumberPipe
      ],
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
    fixture = TestBed.createComponent(EditOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
