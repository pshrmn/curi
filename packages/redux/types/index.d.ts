import { CuriConfig, Response } from '@curi/core';
import { Store, Action as ReduxAction } from 'redux';
import { Action as HickoryAction } from '@hickory/root';
export declare const LOCATION_CHANGE = "@@curi/LOCATION_CHANGE";
export declare const ADD_CURI = "@@curi/ADD_CURI";
export interface ResponseAction extends ReduxAction {
    response: Response;
    action: HickoryAction;
}
export interface CuriAction extends ReduxAction {
    curi: CuriConfig;
}
export interface CuriState {
    config: CuriConfig;
    response: Response;
    action: HickoryAction;
}
export declare const curiReducer: (state: CuriState, action: ReduxAction) => CuriState;
export declare const syncResponses: (store: Store<any>, curi: CuriConfig) => void;
