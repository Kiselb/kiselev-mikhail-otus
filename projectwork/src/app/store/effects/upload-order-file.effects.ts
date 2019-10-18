import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs'
import { map, switchMap, catchError } from 'rxjs/operators'
import { actionTypes, uploadFileSuccess, uploadFileFailed, setCurrentOrderId, updateOrderFilesList } from '../actions'
import { UploadFileService } from '../../orders/upload-file.service';
import { Store, select } from '@ngrx/store';

import { IAppState } from '../../store/state';
import { currentOrderId } from '../../store/selectors';

@Injectable()
export class UploadOrderFileEffects {

  getCurrentOrderId$: Observable<number> = this.appStore.pipe(select(currentOrderId));

  @Effect()
  getFile$ = this.actions$.pipe(
    ofType(actionTypes.atUploadFile))
    .pipe(
      switchMap(action => this.uploadFileService.upload(action["formData"])),
      catchError(error => of(uploadFileFailed({error: error}))),
      switchMap(response => {
        if (response.status === 200) {
          //console.log("OrderID: " + response.body.value.orderId);
          // Must be refactored
          // setCurrentOrderId и uploadFileSuccess устанавливают текущий заказ. Это должен делать кто-то один
          return of(setCurrentOrderId({orderId: response.body.value.orderId}), uploadFileSuccess(response.body.value), updateOrderFilesList({orderId: response.body.value.orderId}))
        } else {
          return of(uploadFileFailed({error: response.body.error}))
        }
      })
    );

  constructor(private actions$: Actions, private appStore: Store<IAppState>, private uploadFileService: UploadFileService) {}
}
