import "jest";
import { inMemory } from "@hickory/in-memory";
import { prepareRoutes, createRouter } from "@curi/router";

import { pathname } from "@curi/interactions";

describe("pathname route interaction", () => {
  describe("generating pathnames", () => {
    it("works when paths contain no params", () => {
      // duh?
      let routes = prepareRoutes([
        { name: "Static", path: "this/has/no/params" },
        { name: "Catch All", path: "(.*)" }
      ]);
      let router = createRouter(inMemory, routes);
      let route = router.route("Static");
      let output = pathname(route);
      expect(output).toBe("/this/has/no/params");
    });

    it("returns a pathname using params", () => {
      let routes = prepareRoutes([
        { name: "Player", path: "player/:id" },
        { name: "Catch All", path: "(.*)" }
      ]);
      let router = createRouter(inMemory, routes);
      let route = router.route("Player");
      let output = pathname(route, { id: 17 });
      expect(output).toBe("/player/17");
    });
  });
});
