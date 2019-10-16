import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, from, of } from 'rxjs';
import { map } from 'rxjs/operators'

import { Store, select } from '@ngrx/store';
import { IAppState } from '../store/state';
import { currentOrderId } from '../store/selectors';


@Injectable({
  providedIn: 'root'
})
export class EditOrderGuard implements CanActivate {

  getCurrentOrderId$: Observable<number> = this.appStore.pipe(select(currentOrderId));

  constructor(private appStore: Store<IAppState>) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const canEditOrder$: Observable<boolean> = 
      this.getCurrentOrderId$.pipe(map(orderId => (orderId > 0)));
      
    return canEditOrder$;
  }
  
}
