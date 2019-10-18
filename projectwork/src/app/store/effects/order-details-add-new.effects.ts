import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { IAppState } from '../../store/state';
import { actionTypes, updateOrderDetails, applicationError } from '../actions';
import { OrderDetailsAddNewService } from '../../orders/edit-order/order-details-add-new.service';
import { currentOrderId } from '../selectors'

@Injectable()
export class OrderDetailsAddNewEffects {
  @Effect()
  getOrderDetails$ = this.actions$.pipe(
    ofType(actionTypes.atAddNewOrderDetails))
    .pipe(
      switchMap((action) => {
        console.log("Order Details AddNew Effect");
        return this.orderDetailsAddNewService.post(action["orderId"], action["materialId"], action["quantity"]);
      }),
      //catchError(error => of(applicationError({error: error}))),
      switchMap(response => {
        console.log("Response");
        console.dir(response);
        if (response.status === 200) {
          return this.appStore.pipe(select(currentOrderId)).pipe(map(orderId => updateOrderDetails({orderId: orderId})));
        } else {
          return of(applicationError({error: response.error}));
        }
      })
    );

  constructor(private actions$: Actions, private appStore: Store<IAppState>, private orderDetailsAddNewService: OrderDetailsAddNewService) {}

}
