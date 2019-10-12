import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs'
import { map, switchMap, catchError } from 'rxjs/operators'
import { actionTypes, uploadFile, uploadFileSuccess, uploadFileFailed, updateOrderFilesList } from '../actions'
import { UploadFileService } from '../../orders/upload-file.service';

@Injectable()
export class UploadOrderFileEffects {
  @Effect()
  getFile$ = this.actions$.pipe(
    ofType(actionTypes.atUploadFile))
    .pipe(
      switchMap(action => this.uploadFileService.upload(action["formData"])),
      catchError(error => of(uploadFileFailed({error: error}))),
      switchMap(response => {
        if (response.status === 200) {
          console.log("OrderID: " + response.body.value.orderId);
          return of(
            uploadFileSuccess(response.body.value),
            updateOrderFilesList({orderId: response.body.value.orderId})
          )
        } else {
          return of(uploadFileFailed({error: response.body.error}))
        }
      })
    );

  constructor(private actions$: Actions, private uploadFileService: UploadFileService) {}
}
