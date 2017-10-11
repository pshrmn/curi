import { CuriConfig, AnyResponse } from '@curi/core';
import { Store, Action } from 'redux';

export const LOCATION_CHANGE = '@@curi/LOCATION_CHANGE';
export const ADD_CURI = '@@curi/ADD_CURI';

export interface ResponseAction extends Action {
  response: AnyResponse;
}

export interface CuriAction extends Action {
  curi: CuriConfig;
}

export const responseReducer = (
  state: AnyResponse,
  action: Action
): AnyResponse => {
  return action.type === LOCATION_CHANGE
    ? (<ResponseAction>action).response
    : state === undefined
      ? null
      : state;
};

export const curiReducer = (
  state: CuriConfig,
  action: Action
): CuriConfig => {
  return action.type === ADD_CURI
    ? (<CuriAction>action).curi
    : state === undefined
      ? null
      : state;
}

export const syncResponses = (
  store: Store<any>,
  curi: CuriConfig
): void => {
  store.dispatch({
    type: ADD_CURI,
    curi
  });

  curi.subscribe(response => {
    store.dispatch({
      type: LOCATION_CHANGE,
      response
    });
  });
};
