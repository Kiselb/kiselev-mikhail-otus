import { createAction, props } from '@ngrx/store';

export enum actionTypes  {
    atExpandDictionary = '[Dictionary] Expand',
    atClearDictionary = '[Dictionary] Clear',
    atChangeSettings ='[Settings] Change'
};
export const expandDictionary = createAction(actionTypes.atExpandDictionary, props<{ fragment: any }>());
export const clearDictionary = createAction(actionTypes.atClearDictionary);
export const changeSettings = createAction(actionTypes.atChangeSettings, props<{ language: string, wordsNumber: number }>());
