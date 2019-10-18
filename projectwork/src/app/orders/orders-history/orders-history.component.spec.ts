import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderNumberPipe } from '../../pipes/order-number.pipe';

import { OrdersHistoryComponent } from './orders-history.component';

describe('OrdersHistoryComponent', () => {
  let component: OrdersHistoryComponent;
  let fixture: ComponentFixture<OrdersHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OrdersHistoryComponent,
        OrderNumberPipe
      ],
      imports: [
        RouterModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
