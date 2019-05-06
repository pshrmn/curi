import "jest";
import { prepareRoutes, ancestors } from "@curi/router";

describe("ancestors route interaction", () => {
  describe("routes", () => {
    const routes = prepareRoutes({
      routes: [
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
      ]
    });

    it("returns all ancestors when level is undefined (or null)", () => {
      const route = routes.route("Player");
      expect(ancestors(route)).toEqual(["League", "Team"]);
      expect(ancestors(route, null)).toEqual(["League", "Team"]);
    });

    it("returns undefined when level is not a postive integer", () => {
      const badArgs = ["no", 0];
      const route = routes.route("Player");
      badArgs.forEach(arg => {
        // @ts-ignore
        expect(ancestors(route, arg)).toBeUndefined();
      });
    });

    it("returns undefined when the level is larger than the ancestor count", () => {
      const route = routes.route("Player");
      expect(ancestors(route, 3)).toBeUndefined();
    });

    it("returns the ancestor at the requested level", () => {
      const route = routes.route("Player");
      expect(ancestors(route, 1)).toBe("Team");
      expect(ancestors(route, 2)).toBe("League");
    });
  });
});
