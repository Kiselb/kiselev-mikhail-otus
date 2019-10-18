import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs'
import { map, switchMap, catchError } from 'rxjs/operators'
import { actionTypes, updateOrderFilesListSuccess, applicationError } from '../actions'
import { UpdateOrderFilesListService } from '../../orders/update-order-files-list.service'

@Injectable()
export class GetOrderFilesEffects {
  @Effect()
  getFilesList$ = this.actions$.pipe(
    ofType(actionTypes.atUpdateOrderFilesList))
    .pipe(
      switchMap((action) => {
        //console.log("GetOrderFilesEffects OrderID: " + action["orderId"]);
        return this.updateOrderFilesListService.get(action["orderId"])
      }),
      catchError(error => of(applicationError({error: error}))),
      switchMap(response => {
        if (response.status === 200) {
          //console.log("GetOrderFilesEffects: updateOrderFilesListSuccess");
          //console.dir(response.body);
          return of(updateOrderFilesListSuccess({data: response.body}));
        } else {
          return of(applicationError({error: response.error}));
        }
      })
    );

  constructor(private actions$: Actions, private updateOrderFilesListService: UpdateOrderFilesListService) {}

}
