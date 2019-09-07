import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from './store/state'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'progressivedictionary';

  constructor(private appStore: Store<IAppState>) {}

}
