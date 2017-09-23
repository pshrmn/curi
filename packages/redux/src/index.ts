import { CuriConfig, AnyResponse } from '@curi/core';
import { Store, Action } from 'redux';

export const LOCATION_CHANGE = '@@curi/LOCATION_CHANGE';

export interface ResponseAction extends Action{
  response: AnyResponse;
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

export const syncResponses = (
  store: Store<any>,
  config: CuriConfig
): void => {
  config.subscribe(response => {
    store.dispatch({
      type: LOCATION_CHANGE,
      response
    });
  });
};
