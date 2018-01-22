import "jest";
import curi from "@curi/core";
import InMemory from "@hickory/in-memory";
import { createStore, combineReducers } from "redux";

import {
  syncResponses,
  curiReducer,
  LOCATION_CHANGE,
  ADD_CURI,
  CuriState
} from "../src";
import { Response, CuriRouter, Navigation } from "@curi/core";
import { Action, Store } from "redux";

describe("syncResponses", () => {
  let history, router, store;

  beforeEach(() => {
    history = InMemory({ locations: ["/"] });
    router = curi(history, [
      { name: "Home", path: "" },
      { name: "One", path: "one" }
    ]);

    const reducer = combineReducers({
      curi: curiReducer
    });

    store = createStore(reducer);
  });

  it("dispatches response and navigation to store whenever the location changes", done => {
    syncResponses(store, router);
    router.respond(() => {
      // this Redux subscriber will be called when the response for
      // the push (below) is emitted.
      store.subscribe(() => {
        const { response, navigation } = store.getState().curi;
        expect(response.name).toBe("One");
        expect(navigation).toMatchObject({
          action: "PUSH"
        });
        done();
      });

      history.push({ pathname: "/one" });
    });
  });

  it("makes the curi router object available from the store", done => {
    router.respond(() => {
      const { curi: before } = store.getState();
      expect(before.router).toBe(null);
      syncResponses(store, router);

      const { curi: after } = store.getState();
      expect(after.router).toBe(router);
      done();
    });
  });
});

describe("curiReducer", () => {
  let history, router;

  beforeEach(() => {
    history = InMemory({ locations: ["/"] });
    router = curi(history, [
      { name: "Home", path: "" },
      { name: "One", path: "one" }
    ]);
  });

  describe("default state", () => {
    it("returns object with null properties", () => {
      const reducer = combineReducers({
        curi: curiReducer
      });

      const store: Store<any> = createStore(reducer);
      const { curi } = store.getState();
      expect(curi).toMatchObject({
        router: null,
        response: null,
        navigation: null
      });
    });
  });

  describe("ADD_CURI", () => {
    it("returns the provided curi router for ADD_CURI actions", () => {
      const output = curiReducer(undefined, {
        type: ADD_CURI,
        router
      } as Action);
      expect(output.router).toBe(router);
    });
  });

  describe("LOCATION_CHANGE", () => {
    it("sets the response and navigation from LOCATION_CHANGE actions", () => {
      const response = { key: "test" } as Response;
      const navigation = { action: "POP" } as Navigation;
      const output = curiReducer(
        {} as CuriState,
        {
          type: LOCATION_CHANGE,
          response,
          navigation
        } as Action
      );
      expect(output.response).toBe(response);
      expect(output.navigation).toBe(navigation);
    });
  });

  describe("other actions", () => {
    it("returns current router/response/navigation for other actions", () => {
      const fakerouter = {} as CuriRouter;
      const fakeResponse = { key: "test" } as Response;
      const output = curiReducer(
        {
          router: fakerouter,
          response: fakeResponse,
          navigation: { action: "POP" }
        } as CuriState,
        { type: "UNKNOWN" }
      );
      expect(output).toMatchObject({
        router: fakerouter,
        response: fakeResponse,
        navigation: { action: "POP" }
      });
    });
  });
});
