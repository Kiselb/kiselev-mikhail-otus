import { ActionReducerMap, ActionReducer, MetaReducer, createReducer, on } from '@ngrx/store';
import { uploadFile, actionTypes } from './actions';
import { LOADING_FILE_STATE, IAppState, ICurrency, currencyInitialState, settingsInitialState, ISettings} from './state'

export const currencyReducer = (state = currencyInitialState, action): ICurrency => {
    switch(action.type) {
        case actionTypes.atUploadFileSuccess:
            console.dir(action);
            console.log(state);
            const newstate = {
                ...state,
                file: { ...state.file, id: action.fileId, error: false, report: [], state: LOADING_FILE_STATE.OK},
                order: { ...state.order, id: action.orderId, error: false, errortext: "", details: []}
            };
            console.log(newstate);
            return(newstate);
            //     return {
            //     ...state,
            //     file: {id: action.fileId, name: action.fileName, sheets: [], error: false, report: [], state: LOADING_FILE_STATE.OK},
            //     order: {id: action.orderId, files: state.order.files.filter(() => true).push[action.fileName], error: false, details: []
            //     }
            // };
        case actionTypes.atUploadFileInProgress:
            return {
                ...state,
                file: { ...state.file, state: LOADING_FILE_STATE.INPROCESS}
            };
        case actionTypes.atUploadFileFailed:
            return {
                ...state,
                file: { ...state.file, state: LOADING_FILE_STATE.FAILED, error: true, errortext: action.error}
            };
        case actionTypes.atUploadFileResume:
            return {
                ...state,
                file: { ...state.file, state: LOADING_FILE_STATE.IDLE}
            };
        default:
            return state;
    }
}
export const settingsReducer = (state = settingsInitialState, action): ISettings => {
    switch(action.type) {
        default:
            return state;
    }
}
export const appReducers: ActionReducerMap<IAppState, any> = {
    currency: currencyReducer,
    settings: settingsReducer
}
