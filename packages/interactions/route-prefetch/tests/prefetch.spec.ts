import "jest";
import InMemory from "@hickory/in-memory";
import { curi, prepareRoutes } from "@curi/router";

import { HickoryLocation } from "@hickory/root";

// @ts-ignore (resolved by jest)
import createPrefetch from "@curi/route-prefetch";

describe("prefetch route interaction", () => {
  const history = InMemory();

  it("is called using router.route.prefetch()", () => {
    const routes = prepareRoutes([{ name: "Catch All", path: "(.*)" }]);
    const router = curi(history, routes, {
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
          resolve: {
            test: () => Promise.resolve()
          }
        },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(history, routes, {
        route: [createPrefetch()]
      });
      expect(router.route.prefetch("Player")).toBeDefined();
    });

    it("does not register if there are no async functions", () => {
      const routes = prepareRoutes([
        { name: "None", path: "player" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(history, routes, {
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
          resolve: {
            test: () => Promise.resolve()
          }
        },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(history, routes, {
        route: [createPrefetch()]
      });
      expect(router.route.prefetch("Player").then).toBeDefined();
    });

    it("returns Promise with error message when path not found", () => {
      const name = "Anonymous";

      const routes = prepareRoutes([{ name: "Catch All", path: "(.*)" }]);
      const router = curi(history, routes, {
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
          resolve: {
            test: () =>
              new Promise((resolve, reject) => {
                reject(errorMessage);
              })
          }
        },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(history, routes, {
        route: [createPrefetch()]
      });

      const output = router.route.prefetch(name, { id: 123 });
      expect.assertions(2);
      expect(output).toBeInstanceOf(Promise);
      return output.then(resolved => {
        expect(resolved.error).toBe(errorMessage);
      });
    });

    describe("props", () => {
      it("passes arguments to route's on.every() function", done => {
        const routes = prepareRoutes([
          {
            name: "Player",
            path: "player/:id",
            resolve: {
              test: function(props) {
                expect(props).toMatchObject({
                  name: "Player",
                  location: locationToPass,
                  params: paramsToPass
                });
                done();
                return Promise.resolve(true);
              }
            }
          },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(history, routes, {
          route: [createPrefetch()]
        });
        const paramsToPass = { id: 1 };
        const locationToPass = {} as HickoryLocation;
        router.route.prefetch("Player", {
          name: "Player",
          params: paramsToPass,
          location: locationToPass
        });
      });
    });

    describe("which", () => {
      const one = jest.fn();
      const two = jest.fn();
      const routes = prepareRoutes([
        {
          name: "Home",
          path: "",
          resolve: { one, two }
        },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(history, routes, {
        route: [createPrefetch()]
      });

      beforeEach(() => {
        one.mockReset();
        two.mockReset();
      });

      it("calls all available async functions when not provided", () => {
        return router.route.prefetch("Home").then(resolved => {
          expect(one.mock.calls.length).toBe(1);
          expect(two.mock.calls.length).toBe(1);
        });
      });

      it("only calls async.one() when which = ['one']", () => {
        return router.route.prefetch("Home", null, ["one"]).then(resolved => {
          expect(one.mock.calls.length).toBe(1);
          expect(two.mock.calls.length).toBe(0);
        });
      });
    });
  });

  it("resets the registered routes when routes are refreshed", () => {
    const routes = prepareRoutes([
      {
        name: "Player",
        path: "player/:id",
        resolve: {
          test: () => Promise.resolve()
        }
      },
      { name: "Catch All", path: "(.*)" }
    ]);
    const router = curi(history, routes, {
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
