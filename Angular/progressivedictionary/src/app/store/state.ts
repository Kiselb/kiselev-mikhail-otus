export const LOCAL_STORAGE_ITEM_KEY: string = "progressivedictionary";

export interface IAppState {
    dictionary: IDictionaryState;
    settings: ISettingsState;
}
export interface IDictionaryState {
    content: any[];
}
export interface ISettingsState {
    language: string;
    wordsNumber: number;
}
export const fnDictionaryInitialState = function(): IDictionaryState {
    const state = window.localStorage.getItem(LOCAL_STORAGE_ITEM_KEY);
    if (state === null || state === "{}") return { content: [] };
    return { content: JSON.parse(state).dictionary.content };
}
export const fnSettingsInitialState = function(): ISettingsState {
    const state = window.localStorage.getItem(LOCAL_STORAGE_ITEM_KEY);
    if (state === null || state === "{}") return { language: "en", wordsNumber: 10 };
    return JSON.parse(state).settings;
 };
export const dictionaryInitialState = (function(): IDictionaryState {
    return fnDictionaryInitialState();
 })();
export const settingsInitialState = (function(): ISettingsState {
    return fnSettingsInitialState();
 })();
