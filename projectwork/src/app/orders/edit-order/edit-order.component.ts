import { Component, OnInit, ɵConsole } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, range, from } from 'rxjs';
import { map } from 'rxjs/operators'
import { FormControl } from '@angular/forms';

import { IAppState } from '../../store/state';
import { updateOrderDetails, articlesSearch, setCurrentOrderDetailsId, addNewOrderDetails } from '../../store/actions';
import { currentOrderId, currentOrderRefNo, currentOrderComments, currentOrderDetails, articlesSearchResults, currentOrderDetailsId } from '../../store/selectors';

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
  getArticlesSearchResults$: Observable<any> = this.appStore.pipe(select(articlesSearchResults));
  getCurrentOrderDetailsId$: Observable<number> = this.appStore.pipe(select(currentOrderDetailsId));

  typeDialogActive: number = 0;
  searchCurrentMaterialID: number = 0;

  ctrlRefNo = new FormControl();
  ctrlComments = new FormControl();
  ctrlDeletedMode = new FormControl();
  ctrlSearchPattern = new FormControl();
  ctrlArticleQuantity = new FormControl();

  toogleDialog(dialog: number) {
    if (this.typeDialogActive === 0) {
      this.typeDialogActive = dialog;
    } else {
      this.typeDialogActive = (this.typeDialogActive === dialog)?(0):(dialog);
    }
  }
  searchArticles() {
    const serachPattern: string = this.ctrlSearchPattern.value;
    if (serachPattern.length > 0) {
      this.appStore.dispatch(articlesSearch({criteria: serachPattern}));
    }
  }
  resetPattern() {
    this.ctrlSearchPattern.patchValue("");
  }
  setCurrentOrderDetailsId(orderDetailsId: number) {
    this.appStore.dispatch(setCurrentOrderDetailsId({orderDetailsId: orderDetailsId}))
  }
  setCurrentSearchMaterialId(materialId: number) {
    this.searchCurrentMaterialID = materialId;
  }
  getCurrentSearchMaterialId() {
    return this.searchCurrentMaterialID;
  }
  //const canEditOrder$: Observable<boolean> = 
  //this.getCurrentOrderId$.pipe(map(orderId => (orderId > 0)));

  addArticleToOrder() {
    const quantity: number = this.ctrlArticleQuantity.value;
    if (quantity > 0) {
      this.getCurrentOrderId$.subscribe(orderId => {
        this.appStore.dispatch(addNewOrderDetails({orderId: orderId, materialId: this.searchCurrentMaterialID, quantity: quantity}))
      });
    }  
  }
  viewDeletedDetails(event) {
    const mode = (event.target.checked)?(0):(1);
    this.getCurrentOrderId$.subscribe(orderId => {this.appStore.dispatch(updateOrderDetails({orderId: orderId, mode: mode}))});
  }

  constructor(private appStore: Store<IAppState>) { }

  ngOnInit() {
    const mode: number = 1;
    this.getCurrentOrderId$.subscribe(orderId => {this.appStore.dispatch(updateOrderDetails({orderId: orderId, mode: mode}))});
  }

}
