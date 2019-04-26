import { inMemory } from "@hickory/in-memory";
import { createRouter, prepareRoutes } from "@curi/router";

import { curiStores } from "@curi/svelte";

describe("curi stores", () => {
  let _router;
  const routes = prepareRoutes({
    routes: [
      { name: "Home", path: "" },
      { name: "About", path: "about" },
      { name: "Not Found", path: "(.*)" }
    ]
  });

  beforeEach(() => {
    _router = createRouter(inMemory, routes);
  });

  it("returns an object with router and curi stores", () => {
    const stores = curiStores(_router);

    expect(stores.hasOwnProperty("router")).toBe(true);
    expect(stores.hasOwnProperty("response")).toBe(true);
    expect(stores.hasOwnProperty("navigation")).toBe(true);
  });

  describe("router store", () => {
    it("is the router", () => {
      const { router } = curiStores(_router);
      router.subscribe(value => {
        expect(value).toBe(_router);
      });
    });
  });

  describe("response store", () => {
    it("initializes with the current response", () => {
      const initial = _router.current();

      const { response } = curiStores(_router);
      response.subscribe(value => {
        expect(value).toBe(initial.response);
      });
    });

    it("updates when new response is emitted", () => {
      const emitted = [];
      const { response } = curiStores(_router);

      _router.observe(({ response }) => {
        emitted.push(response);
      });

      let calls = 0;
      response.subscribe(value => {
        switch (calls++) {
          case 0:
            expect(value).toBe(emitted[0]);
            break;
          case 1:
            expect(value).toBe(emitted[1]);
            break;
          default:
            throw new Error("Should not be reached");
        }
      });

      const url = _router.url({ name: "About" });
      _router.navigate({ url });
    });
  });

  describe("navigation store", () => {
    it("initializes with the current navigation", () => {
      const initial = _router.current();

      const { navigation } = curiStores(_router);
      navigation.subscribe(value => {
        expect(value).toBe(initial.navigation);
      });
    });

    it("updates when new navigation is emitted", () => {
      const emitted = [];
      const { navigation } = curiStores(_router);

      _router.observe(({ navigation }) => {
        emitted.push(navigation);
      });

      let calls = 0;
      navigation.subscribe(value => {
        switch (calls++) {
          case 0:
            expect(value).toBe(emitted[0]);
            break;
          case 1:
            expect(value).toBe(emitted[1]);
            break;
          default:
            throw new Error("Should not be reached");
        }
      });

      const url = _router.url({ name: "About" });
      _router.navigate({ url });
    });
  });
});
