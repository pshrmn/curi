import "jest";
import { prepareRoutes } from "@curi/router";

import { ancestors } from "@curi/interactions";

describe("ancestors route interaction", () => {
  describe("routes", () => {
    let routes = prepareRoutes([
      {
        name: "League",
        path: "league/:lID",
        children: [
          {
            name: "Team",
            path: "team/:tID",
            children: [
              {
                name: "Player",
                path: "player/:pID"
              }
            ]
          }
        ]
      },
      { name: "Catch All", path: "(.*)" }
    ]);

    it("returns all ancestors of the route", () => {
      let route = routes.route("Player");
      let names = ancestors(route).map(r => r.name);
      expect(names).toEqual(["League", "Team"]);
    });

    it("returns empty array if route has no ancestors", () => {
      let route = routes.route("League");
      expect(ancestors(route)).toEqual([]);
    });
  });
});
