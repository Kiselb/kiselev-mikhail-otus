import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, range, from } from 'rxjs';
import { FormControl } from '@angular/forms';

import { IAppState } from '../../store/state'
import { currentOrderId, currentOrderRefNo, currentOrderComments } from '../../store/selectors';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {

  getCurrentOrderId$: Observable<number> = this.appStore.pipe(select(currentOrderId));
  getCurrentOrderRefNo$: Observable<string> = this.appStore.pipe(select(currentOrderRefNo));
  getCurrentOrderComments$: Observable<string> = this.appStore.pipe(select(currentOrderComments));

  dialogAddNewActive: boolean = false;

  ctrlRefNo = new FormControl();
  ctrlComments = new FormControl();
  ctrlDeletedMode = new FormControl();

  toogleAddNewDialog() {
    console.log("Dialog opened");
    this.dialogAddNewActive = !this.dialogAddNewActive;
  }

  constructor(private appStore: Store<IAppState>) { }

  ngOnInit() {
  }

}
