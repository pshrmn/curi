import "jest";
import { inMemory } from "@hickory/in-memory";

import { createRouter, prepareRoutes } from "@curi/router";

describe("route.pathOptions.match", () => {
  describe("default options", () => {
    it("sensitive = false", () => {
      const routes = prepareRoutes({
        routes: [
          {
            name: "Test",
            path: "here"
          },
          {
            name: "Not Found",
            path: "(.*)"
          }
        ]
      });
      const router = createRouter(inMemory, routes, {
        history: {
          locations: ["/Here"]
        }
      });
      const { response } = router.current();
      expect(response.name).toBe("Test");
    });

    it("strict = false", () => {
      const routes = prepareRoutes({
        routes: [
          {
            name: "Test",
            path: "here"
          },
          {
            name: "Not Found",
            path: "(.*)"
          }
        ]
      });
      const router = createRouter(inMemory, routes, {
        history: {
          locations: ["/here/"]
        }
      });
      const { response } = router.current();
      expect(response.name).toBe("Test");
    });

    it("end = true", () => {
      const routes = prepareRoutes({
        routes: [
          {
            name: "Test",
            path: "here"
          },
          {
            name: "Not Found",
            path: "(.*)"
          }
        ]
      });
      const router = createRouter(inMemory, routes, {
        history: {
          locations: ["/here/again"]
        }
      });
      const { response } = router.current();
      expect(response.name).toBe("Not Found");
    });
  });

  describe("user provided options", () => {
    it("sensitive = true", () => {
      const routes = prepareRoutes({
        routes: [
          {
            name: "Test",
            path: "here",
            pathOptions: { match: { sensitive: true } }
          },
          {
            name: "Not Found",
            path: "(.*)"
          }
        ]
      });
      const router = createRouter(inMemory, routes, {
        history: {
          locations: ["/Here"]
        }
      });
      const { response } = router.current();
      expect(response.name).toBe("Not Found");
    });

    it("strict = true", () => {
      const routes = prepareRoutes({
        routes: [
          {
            name: "Test",
            path: "here",
            pathOptions: { match: { strict: true } }
          },
          {
            name: "Not Found",
            path: "(.*)"
          }
        ]
      });
      const router = createRouter(inMemory, routes, {
        history: {
          locations: ["/here/"]
        }
      });
      const { response } = router.current();
      expect(response.name).toBe("Not Found");
    });

    it("end = false", () => {
      const routes = prepareRoutes({
        routes: [
          {
            name: "Test",
            path: "here",
            pathOptions: { match: { end: false } }
          },
          {
            name: "Not Found",
            path: "(.*)"
          }
        ]
      });
      const router = createRouter(inMemory, routes, {
        history: {
          locations: ["/here/again"]
        }
      });
      const { response } = router.current();
      expect(response.name).toBe("Test");
    });
  });
});
