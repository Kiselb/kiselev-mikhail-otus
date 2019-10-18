import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../store/state';
import { setCurrentOrderId, updateOrderFilesList } from '../store/actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  resetState() {
    this.appStore.dispatch(setCurrentOrderId({orderId: 0}));
  }
  constructor(private appStore: Store<IAppState>) { }

  ngOnInit() {
  }

}
