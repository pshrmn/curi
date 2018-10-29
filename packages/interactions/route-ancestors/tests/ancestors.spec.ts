import "jest";
import InMemory from "@hickory/in-memory";
import { curi, prepareRoutes } from "@curi/router";

// @ts-ignore (resolved by jest)
import createAncestors from "@curi/route-ancestors";

describe("ancestors route interaction", () => {
  const history = InMemory();

  it("is called using router.route.ancestors()", () => {
    const routes = prepareRoutes([{ name: "Catch All", path: "(.*)" }]);
    const router = curi(history, routes, {
      route: [createAncestors()]
    });
    expect(router.route.ancestors).toBeDefined();
  });

  describe("routes", () => {
    const routes = prepareRoutes([
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
    const router = curi(history, routes, {
      route: [createAncestors()]
    });

    it("returns all ancestors when level is undefined (or null)", () => {
      expect(router.route.ancestors("Player")).toEqual(["Team", "League"]);
      expect(router.route.ancestors("Player", null)).toEqual([
        "Team",
        "League"
      ]);
    });

    it("returns undefined when level is not a postive integer", () => {
      const badArgs = ["no", 0];
      badArgs.forEach(arg => {
        expect(router.route.ancestors("Player", arg)).toBeUndefined();
      });
    });

    it("returns undefined when the level is larger than the ancestor count", () => {
      expect(router.route.ancestors("Player", 3)).toBeUndefined();
    });

    it("returns the ancestor at the requested level", () => {
      expect(router.route.ancestors("Player", 1)).toBe("Team");
      expect(router.route.ancestors("Player", 2)).toBe("League");
    });

    it("returns undefined if route does not exist", () => {
      expect(router.route.ancestors("Houdini")).toBeUndefined();
    });
  });

  it("resets when routes are refreshed", () => {
    const routes = prepareRoutes([
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
    const router = curi(history, routes, {
      route: [createAncestors()]
    });
    const emptyRoutes = prepareRoutes([{ name: "Catch All", path: "(.*)" }]);

    expect(router.route.ancestors("Player")).toEqual(["Team", "League"]);
    expect(router.route.ancestors("Player", null)).toEqual(["Team", "League"]);

    router.refresh(emptyRoutes);

    expect(router.route.ancestors("Player")).toBeUndefined();
  });
});
