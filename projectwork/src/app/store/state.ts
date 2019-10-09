export const LOCAL_STORAGE_ITEM_KEY: string = "legion-b2b-x";

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
    sheets: ISheet[];
    report: IReportItem[];
}
export interface IOrder {
    id: number;
    files: IFile[];
    error: boolean;
}
export interface ICurrency {
    user: number;
    file: IFile;
    order: IOrder;
}
export interface IAppState {
    settings: ISettings;
    currency: ICurrency;
}
