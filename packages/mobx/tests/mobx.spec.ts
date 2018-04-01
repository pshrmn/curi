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

    it("initializes with current response/navigation", () => {
      // need to make a new router here so it hasn't resolved initial response
      const router = curi(history, [
        { name: "Home", path: "" },
        { name: "One", path: "one" }
      ]);
      const newStore = new CuriStore(router);
      const { response, navigation } = router.current();
      expect(newStore.response.name).toBe("Home");
      expect(newStore.navigation).toMatchObject(navigation);
    });

    it("updates response/navigation when a new response is emitted", () => {
      const { response: previousResponse } = router.current();
      history.replace("/one");

      expect(store.response.name).toBe("One");
      expect(store.navigation.action).toBe("REPLACE");
      expect(store.navigation.previous.name).toBe(previousResponse.name);
    });
  });
});
