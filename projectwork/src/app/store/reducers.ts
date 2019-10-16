import { ActionReducerMap, ActionReducer, MetaReducer, createReducer, on } from '@ngrx/store';
import { actionTypes } from './actions';
import { LOADING_FILE_STATE, IAppState, ICurrency, currencyInitialState, settingsInitialState, ISettings} from './state'

export const currencyReducer = (state = currencyInitialState, action): ICurrency => {
    switch(action.type) {
        case actionTypes.atUploadFileSuccess:
            const newstate = {
                ...state,
                file: { ...state.file, id: action.fileId, error: false, report: [], state: LOADING_FILE_STATE.OK},
                order: { ...state.order, id: action.orderId, error: false, errortext: "", details: []}
            };
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
        case actionTypes.atUpdateOrderFilesListSuccess:
            return {
                ...state,
                order: { ...state.order, files: action.data.filter(() => true)}
            };
        case actionTypes.atUpdateOrderDetailsSuccess:
            return {
                ...state,
                order: { ...state.order, details: action.data.filter(() => true)}
            };
        case actionTypes.atOrdersHistorySuccess:
            return {
                ...state,
                history: action.data.filter(() => true)
            };
        case actionTypes.atSetCurrentOrderId:
            return {
                ...state,
                order: { ...state.order, id: action.orderId, files: [], error: false, details: []}
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
