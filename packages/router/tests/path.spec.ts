import "jest";
import { inMemory } from "@hickory/in-memory";

import { createRouter, prepareRoutes } from "@curi/router";

describe("route.pathOptions.match", () => {
  describe("sensitive", () => {
    it("does case-insensitive matching when false (default)", () => {
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

    it("does case sensitive matchign when true", () => {
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
  });

  describe("strict", () => {
    it("will match a trailing delimiter when false", () => {
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

    it("will not match a trailing delimiter when true", () => {
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
  });

  describe("end", () => {
    it("does not match if there are segments after the path when true", () => {
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

    it("matches when there are segments after the path when false", () => {
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

    describe("with children routes", () => {
      it("matches if path matches exactly", () => {
        const routes = prepareRoutes({
          routes: [
            {
              name: "Test",
              path: "test",
              children: [
                {
                  name: "Ing",
                  path: "ing"
                }
              ]
            },
            {
              name: "Not Found",
              path: "(.*)"
            }
          ]
        });
        const router = createRouter(inMemory, routes, {
          history: {
            locations: ["/test"]
          }
        });
        const { response } = router.current();
        expect(response.name).toBe("Test");
      });

      it("acts as if end is false in order to match children routes", () => {
        const routes = prepareRoutes({
          routes: [
            {
              name: "Test",
              path: "test",
              children: [
                {
                  name: "Ing",
                  path: "ing"
                }
              ]
            },
            {
              name: "Not Found",
              path: "(.*)"
            }
          ]
        });
        const router = createRouter(inMemory, routes, {
          history: {
            locations: ["/test/ing"]
          }
        });
        const { response } = router.current();
        expect(response.name).toBe("Ing");
      });

      it("when end is true, path doesn't match exactly, and no children match, it does not match", () => {
        const routes = prepareRoutes({
          routes: [
            {
              name: "Test",
              path: "test",
              children: [
                {
                  name: "Ing",
                  path: "ing"
                }
              ]
            },
            {
              name: "Not Found",
              path: "(.*)"
            }
          ]
        });
        const router = createRouter(inMemory, routes, {
          history: {
            locations: ["/test/ed"]
          }
        });
        const { response } = router.current();
        expect(response.name).toBe("Not Found");
      });

      it("when end is false, path doesn't match exactly, and no children match, it matches", () => {
        const routes = prepareRoutes({
          routes: [
            {
              name: "Test",
              path: "test",
              pathOptions: {
                match: {
                  end: false
                }
              },
              children: [
                {
                  name: "Ing",
                  path: "ing"
                }
              ]
            },
            {
              name: "Not Found",
              path: "(.*)"
            }
          ]
        });
        const router = createRouter(inMemory, routes, {
          history: {
            locations: ["/test/ed"]
          }
        });
        const { response } = router.current();
        expect(response.name).toBe("Test");
      });
    });
  });
});
