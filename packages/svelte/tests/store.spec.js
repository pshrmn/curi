import InMemory from "@hickory/in-memory";
import curi from "@curi/core";
import { Store } from "svelte/store";

import curiStore from "../src/store";

describe("curiStore", () => {
  let history, router;
  const routes = [{ name: "Home", path: "" }, { name: "About", path: "about" }];

  beforeEach(() => {
    history = InMemory();
    router = curi(history, routes);
  });

  describe("existing store", () => {
    it("adds Curi properties to store", () => {
      const store = new Store({ foo: "oof" });
      curiStore(router, store);
      expect(store.get("router")).toBe(router);
      expect(store.get("curi")).toHaveProperty("response");
      expect(store.get("curi")).toHaveProperty("navigation");
    });

    it("initializes with current response/navigation", done => {
      router.respond(({ response, navigation }) => {
        const store = new Store({ foo: "oof" });
        curiStore(router, store);
        const $curi = store.get("curi");
        expect($curi.response).toBe(response);
        expect($curi.navigation).toBe(navigation);
        done();
      });
    });
  });

  describe("new store", () => {
    it("can create a new store", () => {
      const store = curiStore(router);
      expect(store).toBeInstanceOf(Store);
    });

    it("initializes with current response/navigation", done => {
      router.respond(({ response, navigation }) => {
        const store = curiStore(router, store);
        const $curi = store.get("curi");
        expect($curi.response).toBe(response);
        expect($curi.navigation).toBe(navigation);
        done();
      });
    });
  });

  it("updates store when new response/navigation are emitted", done => {
    let firstCall = true;
    let store;
    router.respond(
      ({ response, navigation }) => {
        if (firstCall) {
          firstCall = false;
          // create store and verify values
          store = curiStore(router);
          expect(store.get("curi")).toMatchObject({
            response,
            navigation
          });
          // push a new location
          history.push("/about");
        } else {
          const { response: aboutResponse } = store.get("curi");
          expect(aboutResponse).toBe(response);
          done();
        }
      },
      { observe: true }
    );
  });
});
