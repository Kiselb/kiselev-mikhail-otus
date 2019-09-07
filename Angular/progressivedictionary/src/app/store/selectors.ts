import { createSelector } from '@ngrx/store'
import { IAppState, IDictionaryState, ISettingsState } from './state'

const selectDictionary = (state: IAppState) => state.dictionary;
const selectSettings = (state: IAppState) => state.settings;

export const dictionary = createSelector(
    selectDictionary,
    (state: IDictionaryState) => state.content
);
export const settingsLanguage = createSelector(
    selectSettings,
    (state: ISettingsState) => state.language
);
export const settingsWordsNumber = createSelector(
    selectSettings,
    (state: ISettingsState) => state.wordsNumber
);
