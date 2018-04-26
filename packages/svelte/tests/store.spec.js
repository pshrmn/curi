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

  it("updates store when new response/navigation are emitted", () => {
    let firstCall = true;
    const store = curiStore(router);
    const {
      response: initialResponse,
      navigation: initialNavigation
    } = router.current();
    expect(store.get("curi")).toMatchObject({
      response: initialResponse,
      navigation: initialNavigation
    });

    history.navigate("/about");

    const { response: currentResponse } = router.current();
    const { response: aboutResponse } = store.get("curi");
    expect(aboutResponse).toBe(currentResponse);
    expect(aboutResponse.name).toBe("About");
  });
});
