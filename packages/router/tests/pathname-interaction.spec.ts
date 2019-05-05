import "jest";
import { inMemory } from "@hickory/in-memory";

import { prepareRoutes, createRouter } from "@curi/router";

describe("pathname route interaction", () => {
  describe("generating pathnames", () => {
    it("works when paths contain no params", () => {
      // duh?
      const routes = prepareRoutes({
        routes: [
          { name: "Static", path: "this/has/no/params" },
          { name: "Catch All", path: "(.*)" }
        ]
      });
      const router = createRouter(inMemory, routes);
      const output = router.route("pathname", "Static");
      expect(output).toBe("/this/has/no/params");
    });

    it("returns a pathname using params", () => {
      const routes = prepareRoutes({
        routes: [
          { name: "Player", path: "player/:id" },
          { name: "Catch All", path: "(.*)" }
        ]
      });
      const router = createRouter(inMemory, routes);
      const output = router.route("pathname", "Player", { id: 17 });
      expect(output).toBe("/player/17");
    });

    it("returns undefined and logs error when path not found", () => {
      const warn = console.warn;
      const mockError = jest.fn();
      console.warn = mockError;

      const routes = prepareRoutes({
        routes: [
          { name: "Player", path: "player/:id" },
          { name: "Catch All", path: "(.*)" }
        ]
      });
      const router = createRouter(inMemory, routes);
      const output = router.route("pathname", "Anonymous", { id: 123 });

      expect(output).toBe(undefined);
      expect(mockError.mock.calls.length).toBe(1);

      console.warn = warn;
    });
  });
});
