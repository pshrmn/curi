import { CuriConfig, AnyResponse } from '@curi/core';
import { Store, Action } from 'redux';
export declare const LOCATION_CHANGE = "@@curi/LOCATION_CHANGE";
export interface ResponseAction extends Action {
    response: AnyResponse;
}
export declare const responseReducer: (state: AnyResponse, action: Action) => AnyResponse;
export declare const syncResponses: (store: Store<any>, config: CuriConfig) => void;
