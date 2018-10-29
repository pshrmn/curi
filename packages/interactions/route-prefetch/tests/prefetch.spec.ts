import "jest";

// @ts-ignore (resolved by jest)
import createPrefetch from "@curi/route-prefetch";

import { HickoryLocation } from "@hickory/root";
import { Interaction, Route } from "@curi/router";

describe("prefetch route interaction", () => {
  let prefetch: Interaction;

  beforeEach(() => {
    prefetch = createPrefetch();
  });

  describe("name", () => {
    it("is prefetch", () => {
      expect(prefetch.name).toBe("prefetch");
    });
  });

  describe("register", () => {
    it("adds routes with async function(s)", () => {
      const route = {
        name: "Player",
        path: "player",
        keys: [],
        resolve: {
          test: () => Promise.resolve()
        }
      };
      prefetch.register(route);

      expect(prefetch.get("Player")).toBeDefined();
    });

    it("does not register if there are no async functions", () => {
      const route = { name: "None", path: "player" };
      prefetch.register(route as Route);
      // This is a bit roundabout, but we verify that the paths did not register
      // by resolving from catch
      expect.assertions(1);
      return prefetch.get("None").then(resolved => {
        expect(resolved.error).toBe(
          "Could not prefetch data for None because it is not registered."
        );
      });
    });
  });

  describe("get", () => {
    it("returns a Promise that resolved with object ({ resolved, error })", () => {
      const route = {
        name: "Player",
        path: "player/:id",
        keys: ["id"],
        resolve: {
          test: () => Promise.resolve()
        }
      };
      prefetch.register(route);
      expect(prefetch.get("Player").then).toBeDefined();
    });

    it("returns Promise with error message when path not found", () => {
      const name = "Anonymous";
      const output = prefetch.get(name, { id: 123 });
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
      const route = {
        name,
        path: "throws",
        keys: [],
        resolve: {
          test: () =>
            new Promise((resolve, reject) => {
              reject(errorMessage);
            })
        }
      };
      prefetch.register(route);
      const output = prefetch.get(name, { id: 123 });
      expect.assertions(2);
      expect(output).toBeInstanceOf(Promise);
      return output.then(resolved => {
        expect(resolved.error).toBe(errorMessage);
      });
    });

    describe("props", () => {
      it("passes arguments to route's on.every() function", () => {
        const route = {
          name: "Player",
          path: "player/:id",
          keys: ["id"],
          resolve: {
            test: function(props) {
              expect(props).toMatchObject({
                name: "Player",
                location: locationToPass,
                params: paramsToPass
              });
              return Promise.resolve(true);
            }
          }
        };
        const paramsToPass = { id: 1 };
        const locationToPass = {} as HickoryLocation;
        prefetch.register(route);
        prefetch.get("Player", {
          name: "Player",
          params: paramsToPass,
          location: locationToPass
        });
      });
    });

    describe("which", () => {
      const route = {
        name: "Home",
        path: "",
        keys: [],
        resolve: {
          one: jest.fn(),
          two: jest.fn()
        }
      };
      const prefetch = createPrefetch();
      prefetch.register(route);

      afterEach(() => {
        route.resolve.one.mockReset();
        route.resolve.two.mockReset();
      });

      it("calls all available async functions when not provided", () => {
        return prefetch.get("Home").then(resolved => {
          expect(route.resolve.one.mock.calls.length).toBe(1);
          expect(route.resolve.two.mock.calls.length).toBe(1);
        });
      });

      it("only calls async.one() when which = ['one']", () => {
        return prefetch.get("Home", null, ["one"]).then(resolved => {
          expect(route.resolve.one.mock.calls.length).toBe(1);
          expect(route.resolve.two.mock.calls.length).toBe(0);
        });
      });
    });
  });

  describe("reset", () => {
    it("resets the registered routes", () => {
      const route = {
        name: "Player",
        path: "player/:id",
        keys: ["id"],
        resolve: {
          test: () => Promise.resolve()
        }
      };
      prefetch.register(route);
      expect(prefetch.get("Player").then).toBeDefined();
      prefetch.reset();
      expect.assertions(2);
      return prefetch.get("Player").then(resolved => {
        expect(resolved.error).toBe(
          `Could not prefetch data for Player because it is not registered.`
        );
      });
    });
  });
});
