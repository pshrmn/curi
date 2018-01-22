import { CuriRouter, Response, Navigation } from "@curi/core";
import { Store, Action } from "redux";
export declare const LOCATION_CHANGE = "@@curi/LOCATION_CHANGE";
export declare const ADD_CURI = "@@curi/ADD_CURI";
export interface ResponseAction extends Action {
    response: Response;
    navigation: Navigation;
}
export interface CuriAction extends Action {
    router: CuriRouter;
}
export interface CuriState {
    router: CuriRouter;
    response: Response;
    navigation: Navigation;
}
export declare const curiReducer: (state: CuriState, action: Action) => CuriState;
export declare const syncResponses: (store: Store<any>, router: CuriRouter) => void;
