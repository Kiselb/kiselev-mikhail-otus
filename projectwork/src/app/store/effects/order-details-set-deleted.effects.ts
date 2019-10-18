import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { IAppState } from '../../store/state';
import { actionTypes, updateOrderDetails, applicationError } from '../actions';
import { currentOrderId } from '../selectors'
import { OrderDetailsSetDeletedService } from '../../orders/edit-order/order-details-set-deleted.service';

@Injectable()
export class OrderDetailsSetDeletedEffects {
  @Effect()
  getOrderDetails$ = this.actions$.pipe(
    ofType(actionTypes.atSetDeletedOrderDetails))
    .pipe(
      switchMap((action) => {
        console.log("Order Details Restore Effect");
        return this.orderDetailsSetDeletedService.post(action["detailsId"]);
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

  constructor(private actions$: Actions, private appStore: Store<IAppState>, private orderDetailsSetDeletedService: OrderDetailsSetDeletedService) {}

}
