import { ResponseModel } from "./response-model";

export interface DetailModel<T> extends ResponseModel{
    data: T
}