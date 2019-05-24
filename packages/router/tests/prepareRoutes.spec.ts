import "jest";

import { prepareRoutes } from "@curi/router";

describe("prepareRoutes()", () => {
  describe("route properties", () => {
    describe("paths beginning with forward slash", () => {
      it("throws", () => {
        expect(() => {
          const routes = prepareRoutes([
            { name: "Home", path: "/" },
            { name: "Catch All", path: "(.*)" }
          ]);
        }).toThrow(
          `Route paths cannot start with a forward slash (/). (Received "/")`
        );
      });
    });

    describe("unique names", () => {
      it("throws if multiple routes have the same name", () => {
        expect(() => {
          prepareRoutes([
            { name: "Home", path: "" },
            { name: "Home", path: "home" },
            { name: "Catch All", path: "(.*)" }
          ]);
        }).toThrow(
          `Multiple routes have the name "Home". Route names must be unique.`
        );
      });

      it("throws with nested routes", () => {
        expect(() => {
          prepareRoutes([
            {
              name: "Home",
              path: "",
              children: [{ name: "Child", path: "child" }]
            },
            {
              name: "About",
              path: "about",
              children: [{ name: "Child", path: "child" }]
            },
            { name: "Catch All", path: "(.*)" }
          ]);
        }).toThrow(
          `Multiple routes have the name "Child". Route names must be unique.`
        );
      });
    });
  });

  describe("route", () => {
    it("returns the public route properties for the named route", () => {
      const routes = prepareRoutes([
        { name: "Home", path: "" },
        { name: "Catch All", path: "(.*)" }
      ]);

      expect(routes.route("Home")).toMatchObject({
        name: "Home"
      });
    });

    it("returns undefined if no route with provided name exists", () => {
      const realWarn = console.warn;
      const fakeWarn = jest.fn();
      console.warn = fakeWarn;

      const routes = prepareRoutes([
        { name: "Home", path: "" },
        { name: "Catch All", path: "(.*)" }
      ]);

      expect(routes.route("About")).toBeUndefined();

      console.warn = realWarn;
    });

    it("warns when no route matches", () => {
      const realWarn = console.warn;
      const fakeWarn = jest.fn();
      console.warn = fakeWarn;

      const routes = prepareRoutes([
        { name: "Home", path: "" },
        { name: "Catch All", path: "(.*)" }
      ]);

      routes.route("About");

      expect(fakeWarn.mock.calls.length).toBe(1);
      expect(fakeWarn.mock.calls[0][0]).toBe(
        `Attempting to use route "About", but no route with that name exists.`
      );

      console.warn = realWarn;
    });
  });

  describe("match", () => {
    it("matches the pathname and returns object with match/route properties", () => {
      const routes = prepareRoutes([
        {
          name: "Test",
          path: "test"
        }
      ]);
      const match = routes.match({
        pathname: "/test",
        hash: "",
        query: "",
        key: [0, 0]
      });
      expect(match).toMatchObject({
        match: {
          name: "Test"
        },
        route: routes.route("Test")
      });
    });

    describe("exact matching", () => {
      it("does exact matching", () => {
        const routes = prepareRoutes([
          {
            name: "Test",
            path: "test"
          },
          {
            name: "Not Found",
            path: "(.*)"
          }
        ]);
        const match = routes.match({
          pathname: "/test/leftovers",
          hash: "",
          query: "",
          key: [0, 0]
        });
        expect(match.match.name).toBe("Not Found");
      });

      it("matches partially if route.pathOptions.match.end=false", () => {
        const routes = prepareRoutes([
          {
            name: "State",
            path: ":state",
            pathOptions: { match: { end: false } }
          },
          {
            name: "Not Found",
            path: "(.*)"
          }
        ]);
        const match = routes.match({
          pathname: "/SD/Sioux%20City",
          hash: "",
          query: "",
          key: [0, 0]
        });
        expect(match.match.name).toBe("State");
      });
    });

    it("returns undefined if no routes match", () => {
      const routes = prepareRoutes([]);
      const match = routes.match({
        pathname: "/test",
        hash: "",
        query: "",
        key: [0, 0]
      });
      expect(match).toBeUndefined();
    });

    describe("nested routes", () => {
      it("matches child routes", () => {
        const routes = prepareRoutes([
          {
            name: "State",
            path: ":state",
            children: [
              {
                name: "City",
                path: ":city"
              }
            ]
          }
        ]);
        const match = routes.match({
          pathname: "/ND/Fargo",
          hash: "",
          query: "",
          key: [0, 0]
        });
        expect(match.match.name).toBe("City");
      });

      it("is not affected by parent route having pathOptions.match.end=true", () => {
        const routes = prepareRoutes([
          {
            name: "State",
            path: ":state",
            pathOptions: { match: { end: true } },
            children: [
              {
                name: "City",
                path: ":city"
              }
            ]
          }
        ]);
        const match = routes.match({
          pathname: "/ND/Fargo",
          hash: "",
          query: "",
          key: [0, 0]
        });
        expect(match.match.name).toBe("City");
      });

      it("works when parent route's path has trailing slash", () => {
        const routes = prepareRoutes([
          {
            name: "State",
            path: ":state/",
            children: [
              {
                name: "City",
                path: ":city/"
              }
            ]
          },
          {
            name: "Not Found",
            path: "(.*)"
          }
        ]);
        const match = routes.match({
          pathname: "/ND/Fargo/",
          hash: "",
          query: "",
          key: [0, 0]
        });

        expect(match.match.name).toBe("City");
      });

      it("skips partial parent match if no children match (effective exact)", () => {
        const routes = prepareRoutes([
          {
            name: "State",
            path: ":state",
            children: [
              {
                name: "Wat",
                path: "wat"
              }
            ]
          },
          {
            name: "Not Found",
            path: "(.*)"
          }
        ]);
        const match = routes.match({
          pathname: "/MT/Bozeman",
          hash: "",
          query: "",
          key: [0, 0]
        });
        expect(match.match.name).toBe("Not Found");
      });

      it("uses partial parent match if pathOptions.match.end=false", () => {
        const routes = prepareRoutes([
          {
            name: "State",
            path: ":state",
            pathOptions: {
              match: { end: false }
            },
            children: [
              {
                name: "Wat",
                path: "wat"
              }
            ]
          },
          {
            name: "Not Found",
            path: "(.*)"
          }
        ]);
        const match = routes.match({
          pathname: "/MT/Bozeman",
          hash: "",
          query: "",
          key: [0, 0]
        });
        expect(match.match.name).toBe("State");
      });
    });

    describe("optional path parameters", () => {
      it("works when optional param is included", () => {
        const routes = prepareRoutes([
          {
            name: "State",
            path: ":state?/about",
            pathOptions: { match: { end: false } }
          },
          {
            name: "Not Found",
            path: "(.*)"
          }
        ]);
        const match = routes.match({
          pathname: "/NY/about",
          hash: "",
          query: "",
          key: [0, 0]
        });
        expect(match.match.name).toBe("State");
      });

      it("works when optional param is NOT included", () => {
        const routes = prepareRoutes([
          {
            name: "State",
            path: ":state?/about",
            pathOptions: { match: { end: false } }
          },
          {
            name: "Not Found",
            path: "(.*)"
          }
        ]);
        const match = routes.match({
          pathname: "/about",
          hash: "",
          query: "",
          key: [0, 0]
        });
        expect(match.match.name).toBe("State");
      });
    });
  });
});
