import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { IAppState } from '../../store/state';
import { actionTypes, updateOrderDetails, applicationError } from '../actions';
import { currentOrderId } from '../selectors'
import { OrderDetailsRestoreService } from '../../orders/edit-order/order-details-restore.service';

@Injectable()
export class OrderDetailsRestoreEffects {
  @Effect()
  getOrderDetails$ = this.actions$.pipe(
    ofType(actionTypes.atRestoreOrderDetails))
    .pipe(
      switchMap((action) => {
        console.log("Order Details Set Deleted Effect");
        return this.orderDetailsRestoreService.post(action["detailsId"]);
      }),
      catchError(error => of(applicationError({error: error}))),
      switchMap(response => {
        console.log("Response");
        console.dir(response);
        if (response.status === 200) {
          return this.appStore.pipe(select(currentOrderId)).pipe(map(orderId => updateOrderDetails({orderId: orderId, mode: 0})));
        } else {
          return of(applicationError({error: response.error}));
        }
      })
    );

  constructor(private actions$: Actions, private appStore: Store<IAppState>, private orderDetailsRestoreService: OrderDetailsRestoreService) {}

}
