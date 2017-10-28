import { CuriConfig, Response } from '@curi/core';
import { Store, Action } from 'redux';
export declare const LOCATION_CHANGE = "@@curi/LOCATION_CHANGE";
export declare const ADD_CURI = "@@curi/ADD_CURI";
export interface ResponseAction extends Action {
    response: Response;
}
export interface CuriAction extends Action {
    curi: CuriConfig;
}
export declare const responseReducer: (state: Response, action: Action) => Response;
export declare const curiReducer: (state: CuriConfig, action: Action) => CuriConfig;
export declare const syncResponses: (store: Store<any>, curi: CuriConfig) => void;
