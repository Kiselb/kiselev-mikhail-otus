import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { OrdersHistoryService } from './orders/orders-history/orders-history.service';
import { OrdersActiveService } from './orders/active-orders/orders-active.service';
import { OrdersHistoryCommunicationService } from './services/orders-history.communication.service';
import { OrdersActiveCommunicationService } from './services/orders-active.communication.service';
import { Observable, from, pipe } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from './store/state';
import { currentUserId } from './store/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'projectwork';

  private currentUserId$: Observable<number> = this.appStore.pipe(select(currentUserId));
  private historyOrdersData$: Observable<any>;
  private activeOrdersData$: Observable<any>;
  private criteria: string;

  constructor(
    private appStore: Store<IAppState>,
    private ordersHistoryService: OrdersHistoryService,
    private ordersActiveService: OrdersActiveService,
    private ordersHistoryCommunicationService: OrdersHistoryCommunicationService,
    private ordersActiveCommunicationService: OrdersActiveCommunicationService) {

  }

  ngOnInit() {
    this.ordersHistoryCommunicationService.historyRequest.subscribe((criteria) => {
      this.criteria = criteria;
      this.currentUserId$.subscribe(
        userId => {
          this.historyOrdersData$ = this.ordersHistoryService.get(userId, this.criteria);
          this.historyOrdersData$.subscribe(response => this.ordersHistoryCommunicationService.response(response.body));
        });
    });
    this.ordersActiveCommunicationService.ordersRequest.subscribe(() => {
      this.currentUserId$.subscribe(
        userId => {
          this.activeOrdersData$ = this.ordersActiveService.get(userId);
          this.activeOrdersData$.subscribe(response => this.ordersActiveCommunicationService.response(response.body));
        });
    });
  }
}
