import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { IAppState } from '../../store/state';
import { appReducers } from '../../store/reducers';
import { OrderNumberPipe } from '../../pipes/order-number.pipe';

import { ActiveOrdersComponent } from './active-orders.component';

describe('ActiveOrdersComponent', () => {
  let component: ActiveOrdersComponent;
  let fixture: ComponentFixture<ActiveOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ActiveOrdersComponent,
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
    fixture = TestBed.createComponent(ActiveOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
