import "jest";

import { prepareRoutes } from "@curi/router";

import { Route } from "@curi/types";

describe("prepareRoutes()", () => {
  describe("paths beginning with forward slash", () => {
    it("throws", () => {
      expect(() => {
        const routes = prepareRoutes({
          routes: [
            { name: "Home", path: "/" },
            { name: "Catch All", path: "(.*)" }
          ]
        });
      }).toThrow(
        `Route paths cannot start with a forward slash (/). (Received "/")`
      );
    });
  });

  describe("unique names", () => {
    it("throws if multiple routes have the same name", () => {
      const routes = [
        { name: "Home", path: "" },
        { name: "Home", path: "home" },
        { name: "Catch All", path: "(.*)" }
      ];
      expect(() => {
        prepareRoutes({ routes });
      }).toThrow(
        `Multiple routes have the name "Home". Route names must be unique.`
      );
    });

    it("throws with nested routes", () => {
      const routes = [
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
      ];
      expect(() => {
        prepareRoutes({ routes });
      }).toThrow(
        `Multiple routes have the name "Child". Route names must be unique.`
      );
    });
  });

  describe("interactions", () => {
    describe("built-in interactions", () => {
      it("includes pathname interaction by default", () => {
        const realWarn = console.warn;
        const fakeWarn = jest.fn();
        console.warn = fakeWarn;

        const routes = prepareRoutes({
          routes: [{ name: "Home", path: "" }]
        });

        routes.interactions("pathname", "Home");

        expect(fakeWarn.mock.calls.length).toBe(0);

        console.warn = realWarn;
      });

      it("includes active interaction by default", () => {
        const realWarn = console.warn;
        const fakeWarn = jest.fn();
        console.warn = fakeWarn;

        const routes = prepareRoutes({
          routes: [{ name: "Home", path: "" }]
        });

        routes.interactions("active", "Home", { name: "Home" });

        expect(fakeWarn.mock.calls.length).toBe(0);

        console.warn = realWarn;
      });

      it("built-in interactions are included when other interactions are provided", () => {
        const realWarn = console.warn;
        const fakeWarn = jest.fn();
        console.warn = fakeWarn;

        function first() {}
        const routes = prepareRoutes({
          routes: [{ name: "Home", path: "" }],
          interactions: { first }
        });

        routes.interactions("pathname", "Home");

        expect(fakeWarn.mock.calls.length).toBe(0);

        console.warn = realWarn;
      });
    });

    it("warns for interactions that do not exist", () => {
      const realWarn = console.warn;
      const fakeWarn = jest.fn();
      console.warn = fakeWarn;

      const routes = prepareRoutes({
        routes: [{ name: "Home", path: "" }]
      });

      routes.interactions("doesNotExist", "Home");

      expect(fakeWarn.mock.calls.length).toBe(1);

      console.warn = realWarn;
    });

    it("warns for routes that do not exist", () => {
      const realWarn = console.warn;
      const fakeWarn = jest.fn();
      console.warn = fakeWarn;

      const routes = prepareRoutes({
        routes: [{ name: "Home", path: "" }]
      });

      routes.interactions("active", "Wat");

      expect(fakeWarn.mock.calls.length).toBe(1);

      console.warn = realWarn;
    });

    it("registers all of the routes with all of the interactions", () => {
      function first(route: Route) {
        return route.meta.name.toLowerCase();
      }
      function second(route: Route) {
        return route.meta.descendants.join(" + ");
      }

      const routes = prepareRoutes({
        routes: [
          {
            name: "Grandparent",
            path: "grandparent",
            children: [
              {
                name: "Parent",
                path: "parent",
                children: [{ name: "Child", path: "child" }]
              }
            ]
          },
          {
            name: "Cousin",
            path: "cousin"
          }
        ],
        interactions: { first, second }
      });
      const expected = {
        Grandparent: {
          first: "grandparent",
          second: "Parent + Child"
        },
        Parent: {
          first: "parent",
          second: "Child"
        },
        Child: {
          first: "child",
          second: ""
        },
        Cousin: {
          first: "cousin",
          second: ""
        }
      };
      const keys = ["Grandparent", "Parent", "Child", "Cousin"];
      keys.forEach(key => {
        expect(routes.interactions("first", key)).toBe(expected[key].first);
        expect(routes.interactions("second", key)).toBe(expected[key].second);
      });
    });
  });
});
