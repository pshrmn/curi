import "jest";
import { InMemory } from "@hickory/in-memory";

// @ts-ignore (resolved by jest)
import { curi, prepare_routes } from "@curi/router";

describe("route.path_options matching", () => {
  describe("default options", () => {
    it("sensitive = false", () => {
      const routes = prepare_routes([
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
      const routes = prepare_routes([
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
      const routes = prepare_routes([
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
      const routes = prepare_routes([
        {
          name: "Test",
          path: "here",
          path_options: { sensitive: true }
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
      const routes = prepare_routes([
        {
          name: "Test",
          path: "here",
          path_options: { strict: true }
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
      const routes = prepare_routes([
        {
          name: "Test",
          path: "here",
          path_options: { end: false }
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
