import "jest";
import { InMemory } from "@hickory/in-memory";
import { create_router, prepare_routes } from "@curi/router";

import { SessionLocation } from "@hickory/root";

import create_prefetch from "@curi/route-prefetch";

describe("prefetch route interaction", () => {
  it("is called using router.route.prefetch()", () => {
    const routes = prepare_routes([{ name: "Catch All", path: "(.*)" }]);
    const router = create_router(InMemory, routes, {
      route: [create_prefetch()]
    });
    expect(router.route.prefetch).toBeDefined();
  });

  describe("routes", () => {
    it("adds routes with async function(s)", () => {
      const routes = prepare_routes([
        {
          name: "Player",
          path: "player",
          resolve() {
            return Promise.resolve();
          }
        },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = create_router(InMemory, routes, {
        route: [create_prefetch()]
      });
      expect(router.route.prefetch("Player")).toBeDefined();
    });

    it("does not register if there are no async functions", () => {
      const routes = prepare_routes([
        { name: "None", path: "player" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = create_router(InMemory, routes, {
        route: [create_prefetch()]
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
      const routes = prepare_routes([
        {
          name: "Player",
          path: "player/:id",
          resolve() {
            return Promise.resolve();
          }
        },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = create_router(InMemory, routes, {
        route: [create_prefetch()]
      });
      expect(router.route.prefetch("Player").then).toBeDefined();
    });

    it("returns Promise with error message when path not found", () => {
      const name = "Anonymous";

      const routes = prepare_routes([{ name: "Catch All", path: "(.*)" }]);
      const router = create_router(InMemory, routes, {
        route: [create_prefetch()]
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
      const error_message = "woops!";
      const routes = prepare_routes([
        {
          name,
          path: "throws",
          resolve() {
            return new Promise((resolve, reject) => {
              reject(error_message);
            });
          }
        },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = create_router(InMemory, routes, {
        route: [create_prefetch()]
      });

      const output = router.route.prefetch(name, { id: 123 });
      expect.assertions(2);
      expect(output).toBeInstanceOf(Promise);
      return output.then(resolved => {
        expect(resolved.error).toBe(error_message);
      });
    });

    describe("match", () => {
      it("passes arguments to route's resolve function", done => {
        const routes = prepare_routes([
          {
            name: "Player",
            path: "player/:id",
            resolve(match) {
              expect(match).toMatchObject({
                name: "Player",
                location: location_to_pass,
                params: params_to_pass
              });
              done();
              return Promise.resolve(true);
            }
          },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = create_router(InMemory, routes, {
          route: [create_prefetch()]
        });
        const params_to_pass = { id: 1 };
        const location_to_pass = {} as SessionLocation;
        router.route.prefetch("Player", {
          match: {
            name: "Player",
            params: params_to_pass,
            location: location_to_pass
          }
        });
      });
    });

    describe("external", () => {
      it("passes external argument to resolve function call", done => {
        const external = {};

        const routes = prepare_routes([
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
        const router = create_router(InMemory, routes, {
          route: [create_prefetch()],
          external
        });
        router.route.prefetch("Player", { external: router.external });
      });
    });
  });

  it("resets the registered routes when routes are refreshed", () => {
    const routes = prepare_routes([
      {
        name: "Player",
        path: "player/:id",
        resolve() {
          return Promise.resolve();
        }
      },
      { name: "Catch All", path: "(.*)" }
    ]);
    const router = create_router(InMemory, routes, {
      route: [create_prefetch()]
    });

    expect(router.route.prefetch("Player").then).toBeDefined();

    const empty_routes = prepare_routes([{ name: "Catch All", path: "(.*)" }]);
    router.refresh(empty_routes);

    expect.assertions(2);
    return router.route.prefetch("Player").then(resolved => {
      expect(resolved.error).toBe(
        `Could not prefetch data for Player because it is not registered.`
      );
    });
  });
});
