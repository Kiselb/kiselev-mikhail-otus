import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../store/state';
import { currentOrderId, currentOrderFiles } from '../../store/selectors';
import { setCurrentOrderId, updateOrderFilesList } from '../../store/actions';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  key: number;
  getCurrentOrderId$: Observable<number> = this.appStore.pipe(select(currentOrderId));
  orderFiles$: Observable<any> = this.appStore.pipe(select(currentOrderFiles));
  orderFilesTest$: Observable<any> = this.appStore.pipe(select(currentOrderFiles));
  
  getCurrentFile() { return this.key; }
  setCurrentFile(key: number) { this.key = key; }

  hideFailed = new FormControl('');

  getViewMode() {
    return this.hideFailed.value;
  }

  constructor(private appStore: Store<IAppState>) { }

  ngOnInit() {
    console.dir(this.appStore);
    this.getCurrentOrderId$.subscribe(orderId => {
      this.appStore.dispatch(updateOrderFilesList({orderId: orderId}));
      this.orderFilesTest$.subscribe(
        (result) => {
          console.log(`Current Order ID: ${orderId}`)
          console.log("files list changed");
          console.dir(result);
      });
    })
  }
}
