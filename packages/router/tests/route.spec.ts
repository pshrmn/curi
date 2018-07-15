import "jest";
import { Route, Interaction } from "../src/types";
import { curi } from "../src";
import InMemory from "@hickory/in-memory";

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
      const routes = [
        {
          name: "Test",
          path: "test"
        }
      ];
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
      const routes = [
        {
          name: "Test",
          path: "test"
        }
      ];
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
      const routes = [
        {
          name: "Test",
          path: ":one/:two/:three"
        }
      ];
      const router = curi(history, routes, {
        route: [PropertyReporter()]
      });
      const routeProperties = router.route.properties("Test");
      expect(routeProperties.keys).toEqual(["one", "two", "three"]);
    });

    it("is an empty array when the path has no params", () => {
      const history = InMemory({ locations: ["/one/two/three"] });
      const routes = [
        {
          name: "Test",
          path: "one/two/three"
        }
      ];
      const router = curi(history, routes, {
        route: [PropertyReporter()]
      });
      const routeProperties = router.route.properties("Test");
      expect(routeProperties.keys).toEqual([]);
    });
  });

  describe("match", () => {
    it("is the match functions", done => {
      const history = InMemory({ locations: ["/test"] });
      const routes = [
        {
          name: "Test",
          path: "test",
          match: {
            iTest: () => Promise.resolve("iTest"),
            eTest: () => Promise.resolve("eTest")
          }
        }
      ];
      const router = curi(history, routes, {
        route: [PropertyReporter()]
      });
      const routeProperties = router.route.properties("Test");
      const { iTest, eTest } = routeProperties.match;
      Promise.all([iTest(), eTest()]).then(([iResult, eResult]) => {
        expect(iResult).toBe("iTest");
        expect(eResult).toBe("eTest");
        done();
      });
    });

    it("is an empty object when route.match isn't provided", done => {
      const history = InMemory({ locations: ["/test"] });
      const routes = [
        {
          name: "Test",
          path: "test"
        }
      ];
      const router = curi(history, routes, {
        route: [PropertyReporter()]
      });
      const routeProperties = router.route.properties("Test");
      expect(routeProperties.match).toEqual({});
      done();
    });

    it("is an empty object when route.match is an empty object", done => {
      const history = InMemory({ locations: ["/test"] });
      const routes = [
        {
          name: "Test",
          path: "test",
          match: {}
        }
      ];
      const router = curi(history, routes, {
        route: [PropertyReporter()]
      });
      const routeProperties = router.route.properties("Test");
      expect(routeProperties.match).toEqual({});
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
      const routes = [
        {
          name: "Test",
          path: "test",
          extra
        }
      ];
      const router = curi(history, routes, {
        route: [PropertyReporter()]
      });
      const routeProperties = router.route.properties("Test");
      expect(routeProperties.extra).toBe(extra);
    });
  });
});
