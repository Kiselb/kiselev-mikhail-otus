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
        switch(action.type) {
            case actionTypes.atExpandDictionary:
                const fragment = action["fragment"];
                console.log("state atExpandVocabulary:");
                console.dir(state);
                nextState = { ...state };
                nextState.dictionary.content.push(fragment);
                console.log("next state atExpandVocabulary:");
                console.dir(nextState);
                serializedState = JSON.stringify(nextState);
                window.localStorage.setItem('progressivedictionary', serializedState);
                break;
            case actionTypes.atClearDictionary:
                console.log("state atClearVocabulary:");
                console.dir(state);
                nextState = { ...state };
                nextState.dictionary.content = [];
                console.log("next state atClearVocabulary:");
                console.dir(nextState);
                serializedState = JSON.stringify(nextState);
                window.localStorage.setItem('progressivedictionary', serializedState);
                break;
            case actionTypes.atChangeSettings:
                break;
        }
        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<any>[] = [metaLocalStorage];

export const reducers: ActionReducerMap<IAppState, any> = {
    dictionary: dictionaryReducer,
    settings: settingsReducer
};
