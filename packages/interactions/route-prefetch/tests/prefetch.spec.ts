import "jest";
import { InMemory } from "@hickory/in-memory";
import { curi, prepareRoutes } from "@curi/router";

import { SessionLocation } from "@hickory/root";

import createPrefetch from "@curi/route-prefetch";

describe("prefetch route interaction", () => {
  it("is called using router.route.prefetch()", () => {
    const routes = prepareRoutes([{ name: "Catch All", path: "(.*)" }]);
    const router = curi(InMemory, routes, {
      route: [createPrefetch()]
    });
    expect(router.route.prefetch).toBeDefined();
  });

  describe("routes", () => {
    it("adds routes with async function(s)", () => {
      const routes = prepareRoutes([
        {
          name: "Player",
          path: "player",
          resolve() {
            return Promise.resolve();
          }
        },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(InMemory, routes, {
        route: [createPrefetch()]
      });
      expect(router.route.prefetch("Player")).toBeDefined();
    });

    it("does not register if there are no async functions", () => {
      const routes = prepareRoutes([
        { name: "None", path: "player" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(InMemory, routes, {
        route: [createPrefetch()]
      });
      // This is a bit roundabout, but we verify that the paths did not register
      // by resolving from catch
      expect.assertions(1);
      return router.route.prefetch("None").then(resolved => {
        expect(resolved.error).toBe(
          "Could not prefetch data for None because it is not registered."
        );
      });
    });
  });

  describe("calling prefetch()", () => {
    it("returns a Promise that resolved with object ({ resolved, error })", () => {
      const routes = prepareRoutes([
        {
          name: "Player",
          path: "player/:id",
          resolve() {
            return Promise.resolve();
          }
        },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(InMemory, routes, {
        route: [createPrefetch()]
      });
      expect(router.route.prefetch("Player").then).toBeDefined();
    });

    it("returns Promise with error message when path not found", () => {
      const name = "Anonymous";

      const routes = prepareRoutes([{ name: "Catch All", path: "(.*)" }]);
      const router = curi(InMemory, routes, {
        route: [createPrefetch()]
      });

      const output = router.route.prefetch(name, { id: 123 });
      expect.assertions(2);
      expect(output).toBeInstanceOf(Promise);
      return output.then(resolved => {
        expect(resolved.error).toBe(
          `Could not prefetch data for ${name} because it is not registered.`
        );
      });
    });

    it("returns Promise with error message when route throws", () => {
      const name = "Thrower";
      const errorMessage = "woops!";
      const routes = prepareRoutes([
        {
          name,
          path: "throws",
          resolve() {
            return new Promise((resolve, reject) => {
              reject(errorMessage);
            });
          }
        },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(InMemory, routes, {
        route: [createPrefetch()]
      });

      const output = router.route.prefetch(name, { id: 123 });
      expect.assertions(2);
      expect(output).toBeInstanceOf(Promise);
      return output.then(resolved => {
        expect(resolved.error).toBe(errorMessage);
      });
    });

    describe("match", () => {
      it("passes arguments to route's resolve function", done => {
        const routes = prepareRoutes([
          {
            name: "Player",
            path: "player/:id",
            resolve(match) {
              expect(match).toMatchObject({
                name: "Player",
                location: locationToPass,
                params: paramsToPass
              });
              done();
              return Promise.resolve(true);
            }
          },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(InMemory, routes, {
          route: [createPrefetch()]
        });
        const paramsToPass = { id: 1 };
        const locationToPass = {} as SessionLocation;
        router.route.prefetch("Player", {
          match: {
            name: "Player",
            params: paramsToPass,
            location: locationToPass
          }
        });
      });
    });

    describe("external", () => {
      it("passes external argument to resolve function call", done => {
        const external = {};

        const routes = prepareRoutes([
          {
            name: "Player",
            path: "player",
            resolve(_, ext) {
              expect(ext).toBe(external);
              done();
              return Promise.resolve();
            }
          },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(InMemory, routes, {
          route: [createPrefetch()],
          external
        });
        router.route.prefetch("Player", { external: router.external });
      });
    });
  });

  it("resets the registered routes when routes are refreshed", () => {
    const routes = prepareRoutes([
      {
        name: "Player",
        path: "player/:id",
        resolve() {
          return Promise.resolve();
        }
      },
      { name: "Catch All", path: "(.*)" }
    ]);
    const router = curi(InMemory, routes, {
      route: [createPrefetch()]
    });

    expect(router.route.prefetch("Player").then).toBeDefined();

    const emptyRoutes = prepareRoutes([{ name: "Catch All", path: "(.*)" }]);
    router.refresh(emptyRoutes);

    expect.assertions(2);
    return router.route.prefetch("Player").then(resolved => {
      expect(resolved.error).toBe(
        `Could not prefetch data for Player because it is not registered.`
      );
    });
  });
});
