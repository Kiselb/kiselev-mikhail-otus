import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs'
import { map, switchMap, catchError } from 'rxjs/operators'
import { actionTypes, articlesSearch, articlesSearchSuccess, applicationError } from '../actions'
import { ArticleSearchService } from '../../orders/edit-order/article-search.service'

@Injectable()
export class SearchArticlesEffects {
  @Effect()
  getOrderDetails$ = this.actions$.pipe(
    ofType(actionTypes.atArticlesSearch))
    .pipe(
      switchMap((action) => {
        //console.log("search effect");
        return this.articleSearchService.get(action["criteria"]); // Must be refactored get UserID from observable
      }),
      catchError(error => of(applicationError({error: error}))),
      switchMap(response => {
        if (response.status === 200) {
          return of(articlesSearchSuccess({data: response.body}));
        } else {
          return of(applicationError({error: response.error}));
        }
      })
    );

  constructor(private actions$: Actions, private articleSearchService: ArticleSearchService) {}

}
