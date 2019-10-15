import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, range, from } from 'rxjs';
import { OrdersActiveCommunicationService } from '../../services/orders-active.communication.service';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../store/state'
import { setCurrentOrderId } from '../../store/actions';
import { currentOrderId } from '../../store/selectors';

@Component({
  selector: 'app-active-orders',
  templateUrl: './active-orders.component.html',
  styleUrls: ['./active-orders.component.css']
})
export class ActiveOrdersComponent implements OnInit {

// Data Example
// {
//   orderId: 713123407,
//   created: "01-08-2019",
//   blocked: false,
//   accepted: false,
//   shipDate: "01-01-2019",
//   shipAddress: "Санкт-Петербург Московский пр., д.1, Литера А",
//   user: "Ivanov I.I.",
//   sumValue: "1'000 000.00",
//   sumCurrency: "RUB",
//   refNo: "12345-00",
//   comments: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
//   taxonomy: {
//     week: "2", // Важно! Таксономию можно вычислить по [created], но номер недели определяется бизнес-правилами на стороне backend
//     year: "2019"
//   }
// }

  ctrlSeparateMode = new FormControl('');

  getCurrentOrderId$: Observable<number> = this.appStore.pipe(select(currentOrderId));
  setCurrentOrderId(orderId: number) {
    this.appStore.dispatch(setCurrentOrderId({orderId: orderId}))
  }
  openOrder() {

  }

  constructor(private appStore: Store<IAppState>, private ordersActiveCommunicationService: OrdersActiveCommunicationService) { }

  ngOnInit() {
    this.ordersActiveCommunicationService.request();
  }
}
