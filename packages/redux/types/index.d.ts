import { CuriConfig, AnyResponse } from '@curi/core';
import { Store, Action } from 'redux';
export declare const LOCATION_CHANGE = "@@curi/LOCATION_CHANGE";
export declare const ADD_CURI = "@@curi/ADD_CURI";
export interface ResponseAction extends Action {
    response: AnyResponse;
}
export interface CuriAction extends Action {
    curi: CuriConfig;
}
export declare const responseReducer: (state: AnyResponse, action: Action) => AnyResponse;
export declare const curiReducer: (state: CuriConfig, action: Action) => CuriConfig;
export declare const syncResponses: (store: Store<any>, curi: CuriConfig) => void;
