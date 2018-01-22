import "jest";
import curi from "@curi/core";
import InMemory from "@hickory/in-memory";
import { Response, CuriRouter, Navigation } from "@curi/core";
import CuriStore from "../src";

describe("@curi/mobx", () => {
  let history, router, store;

  beforeEach(() => {
    history = InMemory({ locations: ["/"] });
    router = curi(history, [
      { name: "Home", path: "" },
      { name: "One", path: "one" }
    ]);

    store = new CuriStore(router);
  });

  describe("store values", () => {
    it("makes router available", () => {
      expect(store.router).toMatchObject(router);
    });

    it("initializes with null response/navigation", () => {
      // need to make a new router here so it hasn't resolved initial response
      const router = curi(history, [
        { name: "Home", path: "" },
        { name: "One", path: "one" }
      ]);
      const newStore = new CuriStore(router);
      expect(newStore.response).toBe(null);
      expect(newStore.navigation).toBe(null);
    });

    it("updates response/navigation when a new response is emitted", done => {
      history.replace("/one");
      let firstResponse;
      router.respond((response, navigation) => {
        if (!firstResponse) {
          firstResponse = response;
        } else {
          // cannot compare actual objects since MobX makes responses reactive
          expect(store.response.name).toBe("One");
          expect(store.navigation.action).toBe("REPLACE");
          expect(store.navigation.previous.name).toBe(firstResponse.name);
          done();
        }
      });
    });
  });
});
