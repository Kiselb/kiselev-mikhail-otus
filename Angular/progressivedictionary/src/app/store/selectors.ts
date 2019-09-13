import { createSelector } from '@ngrx/store'
import { IAppState, IDictionaryState, ISettingsState } from './state'

const selectDictionary = (state: IAppState) => state.dictionary;
const selectSettings = (state: IAppState) => state.settings;

function getRandomIntInclusive(min: number, max: number) {
    const minBound = Math.ceil(min);
    const maxBound = Math.floor(max);
    return Math.floor(Math.random() * (maxBound - minBound + 1)) + minBound;
}

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
export const getRandomWord = createSelector(
    selectDictionary,
    (state: IDictionaryState) => {
        const indexFragment = getRandomIntInclusive(0, state.content.length - 1);
        const indexWord = getRandomIntInclusive(0, state.content[indexFragment].words.length - 1);
        return state.content[indexFragment].words[indexWord];
    }
)
