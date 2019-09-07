import { createSelector } from '@ngrx/store'
import { IAppState, IDictionaryState, ISettingsState } from './state'

const selectDictionary = (state: IAppState) => state.dictionary;

export const dictionary = createSelector(
    selectDictionary,
    (state: IDictionaryState) => state.content
);
