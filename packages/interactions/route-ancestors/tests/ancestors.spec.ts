import "jest";
import { prepareRoutes } from "@curi/router";

import ancestors from "@curi/route-ancestors";

describe("ancestors route interaction", () => {
  it("is called using name", () => {
    const routes = prepareRoutes(
      [{ name: "Catch All", path: "(.*)" }],
      [ancestors()]
    );
    expect(routes.interactions.ancestors).toBeDefined();
  });

  describe("routes", () => {
    const routes = prepareRoutes(
      [
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
      ],
      [ancestors()]
    );

    it("returns all ancestors when level is undefined (or null)", () => {
      expect(routes.interactions.ancestors("Player")).toEqual([
        "Team",
        "League"
      ]);
      expect(routes.interactions.ancestors("Player", null)).toEqual([
        "Team",
        "League"
      ]);
    });

    it("returns undefined when level is not a postive integer", () => {
      const badArgs = ["no", 0];
      badArgs.forEach(arg => {
        expect(routes.interactions.ancestors("Player", arg)).toBeUndefined();
      });
    });

    it("returns undefined when the level is larger than the ancestor count", () => {
      expect(routes.interactions.ancestors("Player", 3)).toBeUndefined();
    });

    it("returns the ancestor at the requested level", () => {
      expect(routes.interactions.ancestors("Player", 1)).toBe("Team");
      expect(routes.interactions.ancestors("Player", 2)).toBe("League");
    });

    it("returns undefined if route does not exist", () => {
      expect(routes.interactions.ancestors("Houdini")).toBeUndefined();
    });
  });
});
