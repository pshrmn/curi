import "jest";
import { Route, Interaction } from "../src/types";
import InMemory from "@hickory/in-memory";

// @ts-ignore (resolved by jest)
import { curi, buildRoutes } from "@curi/router";

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
      const routes = buildRoutes([
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
      const routes = buildRoutes([
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
      const routes = buildRoutes([
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
      const routes = buildRoutes([
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
    it("is the resolve functions", done => {
      const history = InMemory({ locations: ["/test"] });
      const routes = buildRoutes([
        {
          name: "Test",
          path: "test",
          resolve: {
            iTest: () => Promise.resolve("iTest"),
            eTest: () => Promise.resolve("eTest")
          }
        }
      ]);
      const router = curi(history, routes, {
        route: [PropertyReporter()]
      });
      const routeProperties = router.route.properties("Test");
      const { iTest, eTest } = routeProperties.resolve;
      Promise.all([iTest(), eTest()]).then(([iResult, eResult]) => {
        expect(iResult).toBe("iTest");
        expect(eResult).toBe("eTest");
        done();
      });
    });

    it("is an empty object when route.resolve isn't provided", done => {
      const history = InMemory({ locations: ["/test"] });
      const routes = buildRoutes([
        {
          name: "Test",
          path: "test"
        }
      ]);
      const router = curi(history, routes, {
        route: [PropertyReporter()]
      });
      const routeProperties = router.route.properties("Test");
      expect(routeProperties.resolve).toEqual({});
      done();
    });

    it("is an empty object when route.resolve is an empty object", done => {
      const history = InMemory({ locations: ["/test"] });
      const routes = buildRoutes([
        {
          name: "Test",
          path: "test",
          resolve: {}
        }
      ]);
      const router = curi(history, routes, {
        route: [PropertyReporter()]
      });
      const routeProperties = router.route.properties("Test");
      expect(routeProperties.resolve).toEqual({});
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
      const routes = buildRoutes([
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
