import "jest";
import { inMemory } from "@hickory/in-memory";
import { prepareRoutes, createRouter } from "@curi/router";

import { pathname } from "@curi/interactions";

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
      const route = router.route("Static");
      const output = pathname(route);
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
      const route = router.route("Player");
      const output = pathname(route, { id: 17 });
      expect(output).toBe("/player/17");
    });
  });
});
