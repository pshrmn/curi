import "jest";
import createPrefetch from "../src";

import { HickoryLocation } from "@hickory/root";
import { Interaction, Route } from "@curi/core";

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
    it("adds routes with on.initial() function", () => {
      const route = {
        name: "Player",
        path: "player",
        on: {
          initial: () => Promise.resolve()
        }
      };
      prefetch.register(route as Route);

      expect(prefetch.get("Player")).toBeDefined();
    });

    it("adds routes with on.every() function", () => {
      const route = {
        name: "Player",
        path: "player",
        on: {
          every: () => Promise.resolve()
        }
      };
      prefetch.register(route as Route);

      expect(prefetch.get("Player")).toBeDefined();
    });

    it("does not register if there is no on.initial() or on.every() function", () => {
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
        on: {
          every: () => Promise.resolve()
        }
      };
      const second = {
        name: "Test",
        path: "second",
        on: {
          every: () => Promise.resolve()
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
    it("returns a Promise that resolved with a Resolved object ({ initial, every, error })", () => {
      const route = {
        name: "Player",
        path: "player/:id",
        on: {
          every: () => Promise.resolve()
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

    describe("props", () => {
      it("passes arguments to route's on.every() function", () => {
        const route = {
          name: "Player",
          path: "player/:id",
          on: {
            every: function(props) {
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
        on: {
          initial: jest.fn(),
          every: jest.fn()
        }
      };
      const prefetch = createPrefetch();
      prefetch.register(route as Route);

      afterEach(() => {
        route.on.initial.mockReset();
        route.on.every.mockReset();
      });

      it("calls all available async functions when not provided", () => {
        return prefetch.get("Home").then(resolved => {
          expect(route.on.initial.mock.calls.length).toBe(1);
          expect(route.on.every.mock.calls.length).toBe(1);
        });
      });

      it("only calls on.initial() when which = { initial: true }", () => {
        return prefetch.get("Home", null, { initial: true }).then(resolved => {
          expect(route.on.initial.mock.calls.length).toBe(1);
          expect(route.on.every.mock.calls.length).toBe(0);
        });
      });

      it("only calls on.every() when which = { every: true }", () => {
        return prefetch.get("Home", null, { every: true }).then(resolved => {
          expect(route.on.initial.mock.calls.length).toBe(0);
          expect(route.on.every.mock.calls.length).toBe(1);
        });
      });
    });
  });

  describe("reset", () => {
    it("resets the registered routes", () => {
      const route = {
        name: "Player",
        path: "player/:id",
        on: {
          every: () => Promise.resolve()
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
