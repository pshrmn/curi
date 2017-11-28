import { CuriConfig, Response } from '@curi/core';
import { Store, Action as ReduxAction } from 'redux';
import { Action as HickoryAction } from '@hickory/root';

export const LOCATION_CHANGE = '@@curi/LOCATION_CHANGE';
export const ADD_CURI = '@@curi/ADD_CURI';

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

const INITIAL_STATE: CuriState = {
  config: null,
  response: null,
  action: null
};

export const curiReducer = (state: CuriState = INITIAL_STATE, action: ReduxAction): CuriState => {
  switch (action.type) {
    case ADD_CURI:
      return Object.assign({}, state, {
        config: (<CuriAction>action).curi
      });
    case LOCATION_CHANGE:
      return Object.assign({}, state, {
        response: (<ResponseAction>action).response,
        action: (<ResponseAction>action).action
      });
    default:
      return state;
  }
};

export const syncResponses = (store: Store<any>, curi: CuriConfig): void => {
  store.dispatch({
    type: ADD_CURI,
    curi
  });

  curi.subscribe((response, action) => {
    store.dispatch({
      type: LOCATION_CHANGE,
      response,
      action
    });
  });
};
