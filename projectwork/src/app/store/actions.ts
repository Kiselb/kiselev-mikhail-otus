import { createAction, props } from '@ngrx/store'; // npm install @ngrx/store --save
import { IOrderFile } from './state'

import { from } from 'rxjs';

export enum actionTypes {
    atUploadFile = '[File] Upload',
    atUploadFileInProgress = '[File] Upload InProgess',
    atUploadFileSuccess = '[File] Upload Success',
    atUploadFileFailed = '[File] Upload Failed',
    atUploadFileResume = '[File] Upload Resume',

    atUpdateOrderFilesList = '[Order Files] List Update',
    atUpdateOrderFilesListSuccess = '[Order Files] List Update Success',

    atUpdateOrderHeader = '[Order] Header Update',
    atUpdateOrderHeaderSuccess = '[Order] Header Update Success',
    atBlockOrder = '[Order] Block',
    atBlockOrderSuccess = '[Order] Block Success',
    atPlaceOrder = '[Order] Place',
    atPlaceOrderSuccess = '[Order] Place Success',

    atUpdateUserProfile = '[User] Profile Update',
    atUpdateUserProfileSuccess = '[User] Profile Update Success',
    atRegisterUser = '[User] Register',

    atOrdersHistory = '[Orders] History',
    atOrdersHistorySuccess = '[Orders] History Success',

    atApplicationError = '[Application] Error'
}

export const uploadFile = createAction(actionTypes.atUploadFile, props<{formData: FormData}>());
export const uploadFileInProgress = createAction(actionTypes.atUploadFileInProgress);
export const uploadFileSuccess = createAction(actionTypes.atUploadFileSuccess, props<{fileId: number, fileName: string, orderId: number}>());
export const uploadFileFailed = createAction(actionTypes.atUploadFileFailed, props<{ error: string }>());
export const uploadFileResume = createAction(actionTypes.atUploadFileResume);

export const updateOrderFilesList = createAction(actionTypes.atUpdateOrderFilesList, props<{orderId: number}>());
export const updateOrderFilesListSuccess = createAction(actionTypes.atUpdateOrderFilesListSuccess, props<{data: IOrderFile[]}>());

export const updateOrderHeader = createAction(actionTypes.atUpdateOrderHeader, props<{orderId: number, refNo: string, comments: string}>());
export const updateOrderHeaderSuccess = createAction(actionTypes.atUpdateOrderHeader, props<{orderId: number, refNo: string, comments: string}>());
export const blockOrder = createAction(actionTypes.atBlockOrder);
export const blockOrderSuccess = createAction(actionTypes.atBlockOrderSuccess);
export const placeOrder = createAction(actionTypes.atPlaceOrder, props<{orderId: number, duedate: string, address: string, contacts: string}>());
export const placeOrderSuccess = createAction(actionTypes.atPlaceOrderSuccess, props<{orderId: number, duedate: string, address: string, contacts: string}>());

export const ordersHistory = createAction(actionTypes.atOrdersHistory, props<{userid: number, ctiteria: string}>());
export const ordersHistorySuccess = createAction(actionTypes.atOrdersHistorySuccess);
export const applicationError = createAction(actionTypes.atApplicationError, props<{error: string}>());
