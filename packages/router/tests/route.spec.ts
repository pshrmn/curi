import "jest";
import { Route, Interaction } from "../src/types";
import { InMemory } from "@hickory/in-memory";

// @ts-ignore (resolved by jest)
import { curi, prepareRoutes } from "@curi/router";

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
      const history = InMemory({ locations: ["/test"] });
      const routes = prepareRoutes([
        {
          name: "Test",
          path: "test"
        }
      ]);
      const router = curi(history, routes, {
        route: [PropertyReporter()]
      });
      const routeProperties = router.route.properties("Test");
      expect(routeProperties.name).toBe("Test");
    });
  });

  describe("path", () => {
    it("is the provided value", () => {
      const history = InMemory({ locations: ["/test"] });
      const routes = prepareRoutes([
        {
          name: "Test",
          path: "test"
        }
      ]);
      const router = curi(history, routes, {
        route: [PropertyReporter()]
      });
      const routeProperties = router.route.properties("Test");
      expect(routeProperties.path).toBe("test");
    });
  });

  describe("keys", () => {
    it("is the array of param names parsed from the path", () => {
      const history = InMemory({ locations: ["/four/five/six"] });
      const routes = prepareRoutes([
        {
          name: "Test",
          path: ":one/:two/:three"
        }
      ]);
      const router = curi(history, routes, {
        route: [PropertyReporter()]
      });
      const routeProperties = router.route.properties("Test");
      expect(routeProperties.keys).toEqual(["one", "two", "three"]);
    });

    it("is an empty array when the path has no params", () => {
      const history = InMemory({ locations: ["/one/two/three"] });
      const routes = prepareRoutes([
        {
          name: "Test",
          path: "one/two/three"
        }
      ]);
      const router = curi(history, routes, {
        route: [PropertyReporter()]
      });
      const routeProperties = router.route.properties("Test");
      expect(routeProperties.keys).toEqual([]);
    });
  });

  describe("resolve", () => {
    it("is the resolve function", done => {
      const history = InMemory({ locations: ["/test"] });
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
      const router = curi(history, routes, {
        route: [PropertyReporter()]
      });
      const routeProperties = router.route.properties("Test");

      routeProperties.resolve().then(([iResult, eResult]) => {
        expect(iResult).toBe("iTest");
        expect(eResult).toBe("eTest");
        done();
      });
    });

    it("is undefined when route.resolve isn't provided", done => {
      const history = InMemory({ locations: ["/test"] });
      const routes = prepareRoutes([
        {
          name: "Test",
          path: "test"
        }
      ]);
      const router = curi(history, routes, {
        route: [PropertyReporter()]
      });
      const routeProperties = router.route.properties("Test");
      expect(routeProperties.resolve).toBeUndefined();
      done();
    });
  });

  describe("extra", () => {
    it("is the provided value", () => {
      const history = InMemory({ locations: ["/test"] });
      const extra = {
        unofficial: true,
        another: 1
      };
      const routes = prepareRoutes([
        {
          name: "Test",
          path: "test",
          extra
        }
      ]);
      const router = curi(history, routes, {
        route: [PropertyReporter()]
      });
      const routeProperties = router.route.properties("Test");
      expect(routeProperties.extra).toBe(extra);
    });
  });
});
