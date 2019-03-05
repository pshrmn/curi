import { InMemory } from "@hickory/in-memory";
import { curi, prepareRoutes } from "@curi/router";
import { Store } from "svelte/store";

// resolved by jest
import { curiStore } from "@curi/svelte";

describe("curiStore", () => {
  let router;
  const routes = prepareRoutes([
    { name: "Home", path: "" },
    { name: "About", path: "about" },
    { name: "Not Found", path: "(.*)" }
  ]);

  beforeEach(() => {
    router = curi(InMemory, routes);
  });

  describe("existing store", () => {
    it("adds Curi properties to store", () => {
      const store = new Store({ foo: "oof" });
      curiStore(router, store);

      expect(store.get().router).toBe(router);
      expect(store.get().curi).toHaveProperty("response");
      expect(store.get().curi).toHaveProperty("navigation");
    });

    it("initializes with current response/navigation", () => {
      const { response, navigation } = router.current();
      const store = new Store({ foo: "oof" });
      curiStore(router, store);
      const $curi = store.get().curi;
      expect($curi.response).toBe(response);
      expect($curi.navigation).toBe(navigation);
    });
  });

  describe("new store", () => {
    it("can create a new store", () => {
      const store = curiStore(router);
      expect(store.get().router).toBe(router);
    });

    it("initializes with current response/navigation", () => {
      const { response, navigation } = router.current();
      const store = curiStore(router, store);
      const $curi = store.get().curi;
      expect($curi.response).toBe(response);
      expect($curi.navigation).toBe(navigation);
    });
  });

  it("updates store when new response/navigation are emitted", () => {
    let firstCall = true;
    const store = curiStore(router);
    const {
      response: initialResponse,
      navigation: initialNavigation
    } = router.current();
    expect(store.get().curi).toMatchObject({
      response: initialResponse,
      navigation: initialNavigation
    });

    router.navigate({ name: "About" });

    const { response: currentResponse } = router.current();
    const { response: aboutResponse } = store.get().curi;
    expect(aboutResponse).toBe(currentResponse);
    expect(aboutResponse.name).toBe("About");
  });
});
