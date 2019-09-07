import { ActionReducerMap, ActionReducer, MetaReducer, createReducer, on } from '@ngrx/store';
import { actionTypes, expandDictionary, clearDictionary, changeSettings } from './actions';
import { IAppState, IDictionaryState, ISettingsState, dictionaryInitialState, settingsInitialState} from './state'

// export const vocabularyReducer = createReducer(initialState,
//     on (expandVocabulary, (state, { fragment }) => {
//         const nextState = { ...state, vocabulary: state.vocabulary.concat(fragment) };
//         return nextState;
//     }),
//     on (clearVocabulary, () => {
//         const nextState = { vocabulary: [] };
//         return nextState;
//     }),
// )
export function dictionaryReducer(state = dictionaryInitialState, action): IDictionaryState {
    switch (action.type) {
      case actionTypes.atExpandDictionary:
        return { ...state, content: state.content.concat(action.fragment) };
    case actionTypes.atClearDictionary:
        return { ...state, content: [] };
    default:
        return state;
    }
}
export function settingsReducer(state = settingsInitialState, action): ISettingsState {
    switch (action.type) {
        case actionTypes.atChangeSettings:
          return { ...state, language: action.language, wordsNumber: action.wordsNumber };
      default:
          return state;
    }
}
export function metaLocalStorage(reducer: ActionReducer<any>): ActionReducer<any> {
    return function(state, action) {
        let nextState = null;
        let serializedState: string = '';

        nextState = { ...state };

        switch(action.type) {
            case actionTypes.atExpandDictionary:
                const fragment = action["fragment"];
                nextState.dictionary = { ...state.dictionary};
                nextState.dictionary.content = state.dictionary.content.concat(fragment);
                break;
            case actionTypes.atClearDictionary:
                nextState.dictionary = { ...state.dictionary };
                nextState.dictionary.content = [];
                break;
            case actionTypes.atChangeSettings:
                nextState.settings = { ...state.settings };
                break;
        }
        serializedState = JSON.stringify(nextState);
        window.localStorage.setItem('progressivedictionary', serializedState);
        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<any>[] = [metaLocalStorage];

export const reducers: ActionReducerMap<IAppState, any> = {
    dictionary: dictionaryReducer,
    settings: settingsReducer
};
