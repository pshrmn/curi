import "jest";
import { InMemory } from "@hickory/in-memory";

// @ts-ignore (resolved by jest)
import { curi, prepareRoutes } from "@curi/router";

describe("route.pathOptions matching", () => {
  describe("default options", () => {
    it("sensitive = false", () => {
      const routes = prepareRoutes([
        {
          name: "Test",
          path: "here"
        },
        {
          name: "Not Found",
          path: "(.*)"
        }
      ]);
      const router = curi(InMemory, routes, {
        history: {
          locations: ["/Here"]
        }
      });
      const { response } = router.current();
      expect(response.name).toBe("Test");
    });

    it("strict = false", () => {
      const routes = prepareRoutes([
        {
          name: "Test",
          path: "here"
        },
        {
          name: "Not Found",
          path: "(.*)"
        }
      ]);
      const router = curi(InMemory, routes, {
        history: {
          locations: ["/here/"]
        }
      });
      const { response } = router.current();
      expect(response.name).toBe("Test");
    });

    it("end = true", () => {
      const routes = prepareRoutes([
        {
          name: "Test",
          path: "here"
        },
        {
          name: "Not Found",
          path: "(.*)"
        }
      ]);
      const router = curi(InMemory, routes, {
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
      const routes = prepareRoutes([
        {
          name: "Test",
          path: "here",
          pathOptions: { sensitive: true }
        },
        {
          name: "Not Found",
          path: "(.*)"
        }
      ]);
      const router = curi(InMemory, routes, {
        history: {
          locations: ["/Here"]
        }
      });
      const { response } = router.current();
      expect(response.name).toBe("Not Found");
    });

    it("strict = true", () => {
      const routes = prepareRoutes([
        {
          name: "Test",
          path: "here",
          pathOptions: { strict: true }
        },
        {
          name: "Not Found",
          path: "(.*)"
        }
      ]);
      const router = curi(InMemory, routes, {
        history: {
          locations: ["/here/"]
        }
      });
      const { response } = router.current();
      expect(response.name).toBe("Not Found");
    });

    it("end = false", () => {
      const routes = prepareRoutes([
        {
          name: "Test",
          path: "here",
          pathOptions: { end: false }
        },
        {
          name: "Not Found",
          path: "(.*)"
        }
      ]);
      const router = curi(InMemory, routes, {
        history: {
          locations: ["/here/again"]
        }
      });
      const { response } = router.current();
      expect(response.name).toBe("Test");
    });
  });
});
