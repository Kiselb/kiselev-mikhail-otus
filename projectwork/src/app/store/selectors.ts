import { createSelector } from '@ngrx/store'
import { IAppState, ICurrency, IFile } from './state'

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
