import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, range, from } from 'rxjs';
import { FormControl } from '@angular/forms';

import { IAppState } from '../../store/state';
import { updateOrderDetails } from '../../store/actions';
import { currentOrderId, currentOrderRefNo, currentOrderComments, currentOrderDetails } from '../../store/selectors';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {

  getCurrentOrderId$: Observable<number> = this.appStore.pipe(select(currentOrderId));
  getCurrentOrderRefNo$: Observable<string> = this.appStore.pipe(select(currentOrderRefNo));
  getCurrentOrderComments$: Observable<string> = this.appStore.pipe(select(currentOrderComments));
  getCurrentOrderDetails$: Observable<any> = this.appStore.pipe(select(currentOrderDetails));

  typeDialogActive: number = 0;

  ctrlRefNo = new FormControl();
  ctrlComments = new FormControl();
  ctrlDeletedMode = new FormControl();

  toogleDialog(dialog: number) {
    if (this.typeDialogActive === 0) {
      this.typeDialogActive = dialog;
    } else {
      this.typeDialogActive = (this.typeDialogActive === dialog)?(0):(dialog);
    }
  }

  constructor(private appStore: Store<IAppState>) { }

  ngOnInit() {
    this.getCurrentOrderId$.subscribe(orderId => { console.log("OrderID: " + orderId); this.appStore.dispatch(updateOrderDetails({orderId: orderId}))});
  }

}
