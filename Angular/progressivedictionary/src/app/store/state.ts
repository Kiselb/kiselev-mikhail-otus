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
export const dictionaryInitialState: IDictionaryState = {
   content: []
}
export const settingsInitialState: ISettingsState = {
    language: "en",
    wordsNumber: 10
}
// export const dictionaryInitialState = (function(): IDictionaryState {
//     const state = window.localStorage.getItem(LOCAL_STORAGE_ITEM_KEY);
//     if (state === null) return { content: null };
//     return { content: JSON.parse(state).dictionary.content };
// })();
// export const settingsInitialState = (function(): ISettingsState {
//    const state = window.localStorage.getItem(LOCAL_STORAGE_ITEM_KEY);
//    if (state === null) return { language: "en", wordsNumber: 10 };
//    return JSON.parse(state).settings;
// })();
