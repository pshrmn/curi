import "jest";
import { InMemory } from "@hickory/in-memory";
import { create_router, prepare_routes } from "@curi/router";

import create_ancestors from "@curi/route-ancestors";

describe("ancestors route interaction", () => {
  it("is called using router.route.ancestors()", () => {
    const routes = prepare_routes([{ name: "Catch All", path: "(.*)" }]);
    const router = create_router(InMemory, routes, {
      route: [create_ancestors()]
    });
    expect(router.route.ancestors).toBeDefined();
  });

  describe("routes", () => {
    const routes = prepare_routes([
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
    const router = create_router(InMemory, routes, {
      route: [create_ancestors()]
    });

    it("returns all ancestors when level is undefined (or null)", () => {
      expect(router.route.ancestors("Player")).toEqual(["Team", "League"]);
      expect(router.route.ancestors("Player", null)).toEqual([
        "Team",
        "League"
      ]);
    });

    it("returns undefined when level is not a postive integer", () => {
      const bad_args = ["no", 0];
      bad_args.forEach(arg => {
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
    const routes = prepare_routes([
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
    const router = create_router(InMemory, routes, {
      route: [create_ancestors()]
    });
    const empty_routes = prepare_routes([{ name: "Catch All", path: "(.*)" }]);

    expect(router.route.ancestors("Player")).toEqual(["Team", "League"]);
    expect(router.route.ancestors("Player", null)).toEqual(["Team", "League"]);

    router.refresh(empty_routes);

    expect(router.route.ancestors("Player")).toBeUndefined();
  });
});
