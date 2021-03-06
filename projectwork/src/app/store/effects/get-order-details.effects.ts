import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { actionTypes, updateOrderDetailsSuccess, applicationError } from '../actions';
import { OrderDetailsService } from '../../orders/edit-order/order-details.service';

@Injectable()
export class GetOrderDetailsEffects {
  @Effect()
  getOrderDetails$ = this.actions$.pipe(
    ofType(actionTypes.atUpdateOrderDetails))
    .pipe(
      switchMap((action) => {
        console.log(`Effect Details ${action["orderId"]} ${action["mode"]}`);
        return this.orderDetailsService.get(action["orderId"], action["mode"]);
      }),
      catchError(error => of(applicationError({error: error}))),
      switchMap(response => {
        if (response.status === 200) {
          return of(updateOrderDetailsSuccess({data: response.body}));
        } else {
          return of(applicationError({error: response.error}));
        }
      })
    );

  constructor(private actions$: Actions, private orderDetailsService: OrderDetailsService) {}

}
