import { CuriRouter, Emitted, Response, Navigation } from "@curi/core";
import { Store, Action } from "redux";

export const LOCATION_CHANGE = "@@curi/LOCATION_CHANGE";
export const ADD_CURI = "@@curi/ADD_CURI";

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

const INITIAL_STATE: CuriState = {
  router: null,
  response: null,
  navigation: null
};

export const curiReducer = (
  state: CuriState = INITIAL_STATE,
  action: Action
): CuriState => {
  switch (action.type) {
    case ADD_CURI:
      return Object.assign({}, state, {
        router: (<CuriAction>action).router
      });
    case LOCATION_CHANGE:
      return Object.assign({}, state, {
        response: (<ResponseAction>action).response,
        navigation: (<ResponseAction>action).navigation
      });
    default:
      return state;
  }
};

export const syncResponses = (store: Store<any>, router: CuriRouter): void => {
  store.dispatch({
    type: ADD_CURI,
    router
  });

  router.respond(
    ({ response, navigation }: Emitted) => {
      store.dispatch({
        type: LOCATION_CHANGE,
        response,
        navigation
      });
    },
    { observe: true }
  );
};
