import "jest";
import curi from "@curi/core";
import InMemory from "@hickory/in-memory";
import { Response, CuriRouter } from "@curi/core";
import { Action as HickoryAction } from "@hickory/root";
import CuriStore from "../src";

function ignoreFirstCall(fn) {
  let called = false;
  return function() {
    if (!called) {
      called = true;
      return;
    }
    fn(arguments);
  };
}

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

    it("initializes with null response/action", () => {
      // need to make a new router here so it hasn't resolved initial response
      const router = curi(history, [
        { name: "Home", path: "" },
        { name: "One", path: "one" }
      ]);
      const newStore = new CuriStore(router);
      expect(newStore.response).toBe(null);
      expect(newStore.action).toBe(null);
    });

    it("updates response/action when a new response is emitted", done => {
      history.replace("/one");
      router.respond(
        ignoreFirstCall((response, action) => {
          expect(store.response.name).toBe("One");
          expect(store.action).toBe("REPLACE");
          done();
        })
      );
    });
  });
});
