import "jest";
import createRoute from "../src/route";
import { Route, Addon } from "../src/types";
import curi from "../src/curi";
import InMemory from "@hickory/in-memory";

function PropertyReporter(): Addon {
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
          `Could not generate pathname for ${name} because it is not registered.`
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
        addons: [PropertyReporter()]
      });
      const routeProperties = router.addons.properties("Test");
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
        addons: [PropertyReporter()]
      });
      const routeProperties = router.addons.properties("Test");
      expect(routeProperties.path).toBe("test");
    });
  });

  describe("keys", () => {
    it("is the array of param names parsed from the path", () => {
      const history = InMemory({ locations: ["/test"] });
      const routes = [
        {
          name: "Test",
          path: ":one/:two/:three"
        }
      ];
      const router = curi(history, routes, {
        addons: [PropertyReporter()]
      });
      const routeProperties = router.addons.properties("Test");
      expect(routeProperties.keys).toEqual(["one", "two", "three"]);
    });

    it("is an empty array when the path has no params", () => {
      const history = InMemory({ locations: ["/test"] });
      const routes = [
        {
          name: "Test",
          path: "one/two/three"
        }
      ];
      const router = curi(history, routes, {
        addons: [PropertyReporter()]
      });
      const routeProperties = router.addons.properties("Test");
      expect(routeProperties.keys).toEqual([]);
    });
  });

  describe("load", () => {
    describe("initial", () => {
      it("will be defined when a on.initial function is provided", () => {
        const initialTest = () => Promise.resolve();

        const history = InMemory({ locations: ["/test"] });
        const routes = [
          {
            name: "Test",
            path: "test",
            on: {
              initial: initialTest
            }
          }
        ];
        const router = curi(history, routes, {
          addons: [PropertyReporter()]
        });
        const routeProperties = router.addons.properties("Test");
        expect(routeProperties.on.initial).toBeDefined();
      });

      it("will be undefined when on.initial fn isn't defined", () => {
        const history = InMemory({ locations: ["/test"] });
        const routes = [
          {
            name: "Test",
            path: "test"
          }
        ];
        const router = curi(history, routes, {
          addons: [PropertyReporter()]
        });
        const routeProperties = router.addons.properties("Test");
        expect(routeProperties.on.initial).toBeUndefined();
      });
    });

    describe("every", () => {
      it("will be the provided on.every() function", () => {
        const everyTest = () => Promise.resolve();

        const history = InMemory({ locations: ["/test"] });
        const routes = [
          {
            name: "Test",
            path: "test",
            on: { every: everyTest }
          }
        ];
        const router = curi(history, routes, {
          addons: [PropertyReporter()]
        });
        const routeProperties = router.addons.properties("Test");
        expect(routeProperties.on.every).toBe(everyTest);
      });

      it("will be undefined when on.every() isn't defined", () => {
        const history = InMemory({ locations: ["/test"] });
        const routes = [
          {
            name: "Test",
            path: "test"
          }
        ];
        const router = curi(history, routes, {
          addons: [PropertyReporter()]
        });
        const routeProperties = router.addons.properties("Test");
        expect(routeProperties.on.every).toBeUndefined();
      });
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
        addons: [PropertyReporter()]
      });
      const routeProperties = router.addons.properties("Test");
      expect(routeProperties.extra).toBe(extra);
    });
  });
});
