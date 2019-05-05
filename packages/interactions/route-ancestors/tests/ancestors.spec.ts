import "jest";
import { prepareRoutes } from "@curi/router";

import ancestors from "@curi/route-ancestors";

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
      ],
      interactions: { ancestors }
    });

    it("returns all ancestors when level is undefined (or null)", () => {
      expect(routes.interactions("ancestors", "Player")).toEqual([
        "League",
        "Team"
      ]);
      expect(routes.interactions("ancestors", "Player", null)).toEqual([
        "League",
        "Team"
      ]);
    });

    it("returns undefined when level is not a postive integer", () => {
      const badArgs = ["no", 0];
      badArgs.forEach(arg => {
        expect(routes.interactions("ancestors", "Player", arg)).toBeUndefined();
      });
    });

    it("returns undefined when the level is larger than the ancestor count", () => {
      expect(routes.interactions("ancestors", "Player", 3)).toBeUndefined();
    });

    it("returns the ancestor at the requested level", () => {
      expect(routes.interactions("ancestors", "Player", 1)).toBe("Team");
      expect(routes.interactions("ancestors", "Player", 2)).toBe("League");
    });

    it("warns and returns undefined if route does not exist", () => {
      const realWarn = console.warn;
      const fakeWarn = jest.fn();
      console.warn = fakeWarn;

      expect(routes.interactions("ancestors", "Houdini")).toBeUndefined();
      expect(fakeWarn.mock.calls.length).toBe(1);

      console.warn = realWarn;
    });
  });
});
