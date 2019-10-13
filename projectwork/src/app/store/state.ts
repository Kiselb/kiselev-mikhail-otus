export const LOCAL_STORAGE_ITEM_KEY: string = "legion-b2b-x";

export enum LOADING_FILE_STATE {
    IDLE      = 0,
    INPROCESS = 1,
    OK        = 2,
    FAILED    = 3,
}
export interface ISettings {
    urlDataHost: string;
}
export interface ISheet {
    name: string;
    first: number;
    last: number;
    article: number;
    quantity: number;
    error: boolean;
}
export interface IReportItem {
    row: number;
    text: string;
}
export interface IFile {
    id: number;
    name: string;
    error: boolean;
    errortext: string;
    sheets: ISheet[];
    report: IReportItem[];
    state: LOADING_FILE_STATE;
}
export interface IOrderFile {
    FileID: number,
    FileName: string,
    CreateDate: string,
    ErrorStatus: boolean,
    UserID: number,
    UserName: string,
    FileSheetsInfo: string
}
export interface IOrder {
    id: number;
    files: IOrderFile[];
    error: boolean;
    details: any[];
}
export interface IOrderInfo {
    id: number;
    userId: number;
    userName: string;
    created: string;
    refno: string;
    comments: string;
    blocked: boolean;
    placed: boolean;
    week: number;
    year: number;
    sumValue: number;
    sumCurrency: string;
}
export interface ICurrency {
    user: number;
    file: IFile;
    order: IOrder;
    history: IOrderInfo[];

}
export interface IAppState {
    settings: ISettings;
    currency: ICurrency;
}
export const settingsInitialState: ISettings = {
    urlDataHost: ""
}
export const currencyInitialState: ICurrency = {
    user: 1,
    file: {
        id: 0,
        name: "",
        error: false,
        errortext: "",
        sheets: [],
        report: [],
        state: LOADING_FILE_STATE.IDLE,
    },
    order: {
        id: 0,
        files: [],
        error: false,
        details: []
    },
    history: []
}
