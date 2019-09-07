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
    content: null
}
export const settingsInitialState: ISettingsState = {
    language: "en",
    wordsNumber: 10
}
// export const initialState = (function(): IAppState {
//     const vocabulary = window.localStorage.getItem("progressivedictionary");
//     if (vocabulary === null) return { vocabulary: [] };
//     return JSON.parse(vocabulary);
// })();
