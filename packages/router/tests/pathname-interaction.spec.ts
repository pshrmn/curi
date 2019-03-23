import "jest";
import { InMemory } from "@hickory/in-memory";

import { prepare_routes, create_router } from "@curi/router";

describe("pathname route interaction", () => {
  describe("calling", () => {
    it("it is accessed through route.name()", () => {
      const routes = prepare_routes([{ name: "Catch All", path: "(.*)" }]);
      const router = create_router(InMemory, routes);
      expect(router.route.pathname).toBeDefined();
    });
  });

  describe("generating pathnames", () => {
    it("works when paths contain no params", () => {
      // duh?
      const routes = prepare_routes([
        { name: "Static", path: "this/has/no/params" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = create_router(InMemory, routes);
      const output = router.route.pathname("Static");
      expect(output).toBe("/this/has/no/params");
    });

    it("returns a pathname using params", () => {
      const routes = prepare_routes([
        { name: "Player", path: "player/:id" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = create_router(InMemory, routes);
      const output = router.route.pathname("Player", { id: 17 });
      expect(output).toBe("/player/17");
    });

    it("returns undefined and logs error when path not found", () => {
      const error = console.error;
      const mockError = jest.fn();
      console.error = mockError;

      const routes = prepare_routes([
        { name: "Player", path: "player/:id" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = create_router(InMemory, routes);
      const output = router.route.pathname("Anonymous", { id: 123 });

      expect(output).toBe(undefined);
      expect(mockError.mock.calls.length).toBe(1);

      console.error = error;
    });
  });
});
