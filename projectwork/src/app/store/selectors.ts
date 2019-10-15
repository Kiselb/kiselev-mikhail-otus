import { createSelector, State } from '@ngrx/store'
import { IAppState, ICurrency, IFile } from './state'
import { SelectorContext } from '@angular/compiler';

const selectCurrency = (state: IAppState) => state.currency;

export const loadingFileState = createSelector(
    selectCurrency,
    (state: ICurrency) => state.file.state
);
export const loadingFileError = createSelector(
    selectCurrency,
    (state: ICurrency) => state.file.errortext
);
export const currentOrderId = createSelector(
    selectCurrency,
    (state: ICurrency) => state.order.id
);
export const currentOrderRefNo = createSelector(
    selectCurrency,
    (state: ICurrency) => state.order.refNo
);
export const currentOrderComments = createSelector(
    selectCurrency,
    (state: ICurrency) => state.order.comments
);
export const currentOrderFiles = createSelector(
    selectCurrency,
    (state: ICurrency) => state.order.files
);
export const currentUserId = createSelector(
    selectCurrency,
    (state: ICurrency) => state.user
);
