import "jest";
import { InMemory } from "@hickory/in-memory";

// @ts-ignore (resolved by jest)
import { curi, prepareRoutes } from "@curi/router";

describe("route.pathOptions matching", () => {
  describe("default options", () => {
    it("sensitive = false", () => {
      const history = InMemory({ locations: ["/Here"] });
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
      const router = curi(history, routes);
      const { response } = router.current();
      expect(response.name).toBe("Test");
    });

    it("strict = false", () => {
      const history = InMemory({ locations: ["/here/"] });
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
      const router = curi(history, routes);
      const { response } = router.current();
      expect(response.name).toBe("Test");
    });

    it("end = true", () => {
      const history = InMemory({ locations: ["/here/again"] });
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
      const router = curi(history, routes);
      const { response } = router.current();
      expect(response.name).toBe("Not Found");
    });
  });

  describe("user provided options", () => {
    it("sensitive = true", () => {
      const history = InMemory({ locations: ["/Here"] });
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
      const router = curi(history, routes);
      const { response } = router.current();
      expect(response.name).toBe("Not Found");
    });

    it("strict = true", () => {
      const history = InMemory({ locations: ["/here/"] });
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
      const router = curi(history, routes);
      const { response } = router.current();
      expect(response.name).toBe("Not Found");
    });

    it("end = false", () => {
      const history = InMemory({ locations: ["/here/again"] });
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
      const router = curi(history, routes);
      const { response } = router.current();
      expect(response.name).toBe("Test");
    });
  });
});
