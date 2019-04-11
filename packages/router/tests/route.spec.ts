import "jest";
import { inMemory } from "@hickory/in-memory";

import { createRouter, prepareRoutes } from "@curi/router";

import { Route, Interaction } from "@curi/types";

function PropertyReporter(): Interaction {
  let knownRoutes = {};
  return {
    name: "properties",
    register: (route: Route): void => {
      const { name, path } = route;
      knownRoutes[name] = route;
    },
    get: (name: string): Route => {
      if (knownRoutes[name] == null) {
        console.error(
          `Could not get properties for ${name} because it is not registered.`
        );
        return;
      }
      return knownRoutes[name];
    },
    reset: () => {
      knownRoutes = {};
    }
  };
}

describe("public route properties", () => {
  describe("name", () => {
    it("is the provided value", () => {
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
      const router = createRouter(inMemory, routes, {
        route: [PropertyReporter()],
        history: {
          locations: ["/test"]
        }
      });
      const routeProperties = router.route.properties("Test");
      expect(routeProperties.name).toBe("Test");
    });
  });

  describe("path", () => {
    it("is the provided value", () => {
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
      const router = createRouter(inMemory, routes, {
        route: [PropertyReporter()],
        history: {}
      });
      const routeProperties = router.route.properties("Test");
      expect(routeProperties.path).toBe("test");
    });
  });

  describe("keys", () => {
    it("is the array of param names parsed from the path", () => {
      const routes = prepareRoutes([
        {
          name: "Test",
          path: ":one/:two/:three"
        },
        {
          name: "Not Found",
          path: "(.*)"
        }
      ]);
      const router = createRouter(inMemory, routes, {
        route: [PropertyReporter()],
        history: {
          locations: ["/four/five/six"]
        }
      });
      const routeProperties = router.route.properties("Test");
      expect(routeProperties.keys).toEqual(["one", "two", "three"]);
    });

    it("is an empty array when the path has no params", () => {
      const routes = prepareRoutes([
        {
          name: "Test",
          path: "one/two/three"
        },
        {
          name: "Not Found",
          path: "(.*)"
        }
      ]);
      const router = createRouter(inMemory, routes, {
        route: [PropertyReporter()],
        history: {
          locations: ["/one/two/three"]
        }
      });
      const routeProperties = router.route.properties("Test");
      expect(routeProperties.keys).toEqual([]);
    });
  });

  describe("resolve", () => {
    it("is the resolve function", done => {
      const routes = prepareRoutes([
        {
          name: "Test",
          path: "test",
          resolve() {
            return Promise.all([
              Promise.resolve("iTest"),
              Promise.resolve("eTest")
            ]);
          }
        }
      ]);
      const router = createRouter(inMemory, routes, {
        route: [PropertyReporter()],
        history: {
          locations: ["/test"]
        }
      });
      const routeProperties = router.route.properties("Test");

      routeProperties.resolve().then(([iResult, eResult]) => {
        expect(iResult).toBe("iTest");
        expect(eResult).toBe("eTest");
        done();
      });
    });

    it("is undefined when route.resolve isn't provided", done => {
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
      const router = createRouter(inMemory, routes, {
        route: [PropertyReporter()],
        history: {
          locations: ["/test"]
        }
      });
      const routeProperties = router.route.properties("Test");
      expect(routeProperties.resolve).toBeUndefined();
      done();
    });
  });

  describe("extra", () => {
    it("is the provided value", () => {
      const extra = {
        unofficial: true,
        another: 1
      };
      const routes = prepareRoutes([
        {
          name: "Test",
          path: "test",
          extra
        },
        {
          name: "Not Found",
          path: "(.*)"
        }
      ]);
      const router = createRouter(inMemory, routes, {
        route: [PropertyReporter()],
        history: {
          locations: ["/test"]
        }
      });
      const routeProperties = router.route.properties("Test");
      expect(routeProperties.extra).toBe(extra);
    });
  });
});
