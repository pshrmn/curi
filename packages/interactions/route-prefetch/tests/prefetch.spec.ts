import "jest";

// resolved by jest
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
    it("adds routes with match function(s)", () => {
      const route = {
        name: "Player",
        path: "player",
        keys: [],
        match: {
          test: () => Promise.resolve()
        }
      };
      prefetch.register(route as Route);

      expect(prefetch.get("Player")).toBeDefined();
    });

    it("does not register if there are no match functions", () => {
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

    it("warns when registering a route the same name as one already registered", () => {
      const warn = console.warn;
      const mockWarn = jest.fn();
      console.warn = mockWarn;

      const first = {
        name: "Test",
        path: "first",
        keys: [],
        match: {
          test: () => Promise.resolve()
        }
      };
      const second = {
        name: "Test",
        path: "second",
        keys: [],
        match: {
          test: () => Promise.resolve()
        }
      };

      prefetch.register(first as Route);
      expect(mockWarn.mock.calls.length).toBe(0);

      prefetch.register(second as Route);
      expect(mockWarn.mock.calls.length).toBe(1);

      console.warn = warn;
    });
  });

  describe("get", () => {
    it("returns a Promise that resolved with object ({ resolved, error })", () => {
      const route = {
        name: "Player",
        path: "player/:id",
        keys: ["id"],
        match: {
          test: () => Promise.resolve()
        }
      };
      prefetch.register(route as Route);
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
        match: {
          test: () =>
            new Promise((resolve, reject) => {
              reject(errorMessage);
            })
        }
      };
      prefetch.register(route as Route);
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
          match: {
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
        prefetch.register(route as Route);
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
        match: {
          one: jest.fn(),
          two: jest.fn()
        }
      };
      const prefetch = createPrefetch();
      prefetch.register(route as Route);

      afterEach(() => {
        route.match.one.mockReset();
        route.match.two.mockReset();
      });

      it("calls all available async functions when not provided", () => {
        return prefetch.get("Home").then(resolved => {
          expect(route.match.one.mock.calls.length).toBe(1);
          expect(route.match.two.mock.calls.length).toBe(1);
        });
      });

      it("only calls match.one() when which = ['one']", () => {
        return prefetch.get("Home", null, ["one"]).then(resolved => {
          expect(route.match.one.mock.calls.length).toBe(1);
          expect(route.match.two.mock.calls.length).toBe(0);
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
        match: {
          test: () => Promise.resolve()
        }
      };
      prefetch.register(route as Route);
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
