import "jest";
import InMemory from "@hickory/in-memory";
import { Route } from "@curi/router";

// @ts-ignore (resolved by jest)
import { pathname, prepareRoutes, curi } from "@curi/router";

describe("pathname route interaction", () => {
  const history = InMemory();

  describe("using directly", () => {
    it("warns that using pathname directly is deprecated", () => {
      const realWarn = console.warn;
      const fakeWarn = jest.fn();
      console.warn = fakeWarn;

      const pathnameInteraction = pathname();

      const player = { name: "Player", path: "player" };
      pathnameInteraction.register(player as Route);

      expect(fakeWarn.mock.calls.length).toBe(1);

      console.warn = realWarn;
    });
  });

  describe("calling", () => {
    it("it is accessed through route.name()", () => {
      const routes = prepareRoutes([{ name: "Catch All", path: "(.*)" }]);
      const router = curi(history, routes);
      expect(router.route.pathname).toBeDefined();
    });
  });

  describe("generating pathnames", () => {
    it("works when paths contain no params", () => {
      // duh?
      const routes = prepareRoutes([
        { name: "Static", path: "this/has/no/params" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(history, routes);
      const output = router.route.pathname("Static");
      expect(output).toBe("/this/has/no/params");
    });

    it("returns a pathname using params", () => {
      const routes = prepareRoutes([
        { name: "Player", path: "player/:id" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(history, routes);
      const output = router.route.pathname("Player", { id: 17 });
      expect(output).toBe("/player/17");
    });

    it("returns undefined and logs error when path not found", () => {
      const error = console.error;
      const mockError = jest.fn();
      console.error = mockError;

      const routes = prepareRoutes([
        { name: "Player", path: "player/:id" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(history, routes);
      const output = router.route.pathname("Anonymous", { id: 123 });

      expect(output).toBe(undefined);
      expect(mockError.mock.calls.length).toBe(1);

      console.error = error;
    });
  });
});
