import "jest";
import createPrefetch from "../src";
import { HickoryLocation } from "@hickory/root";

describe("prefetch addon", () => {
  let prefetch;

  beforeEach(() => {
    prefetch = createPrefetch();
  });

  describe("name", () => {
    it("is prefetch", () => {
      expect(prefetch.name).toBe("prefetch");
    });
  });

  describe("register", () => {
    it("adds the path to the known paths", () => {
      const spy = jest.fn(() => Promise.resolve());
      const playerURI = {
        name: "Player",
        path: "player",
        on: {
          every: () => Promise.resolve()
        }
      };
      prefetch.register(playerURI);

      expect(prefetch.get("Player")).toBeDefined();
    });

    it("does not register if there is no on.every() function", () => {
      const route = { name: "None", path: "player" };
      prefetch.register(route);
      // This is a bit roundabout, but we verify that the paths did not register
      // by resolving from catch
      expect.assertions(1);
      return prefetch.get("None").catch(err => {
        expect(err).toBe(
          "Could not prefetch data for None because it is not registered."
        );
      });
    });

    it("warns when registering the same name", () => {
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

      prefetch.register(first);
      expect(mockWarn.mock.calls.length).toBe(0);

      prefetch.register(second);
      expect(mockWarn.mock.calls.length).toBe(1);

      console.warn = warn;
    });
  });

  describe("get", () => {
    it("returns a Promise", () => {
      const playerURI = {
        name: "Player",
        path: "player/:id",
        on: {
          every: () => Promise.resolve()
        }
      };
      prefetch.register(playerURI);
      expect(prefetch.get("Player").then).toBeDefined();
    });

    it("passes arguments to route's on.every() function", () => {
      const playerURI = {
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
      prefetch.register(playerURI);
      prefetch.get("Player", {
        name: "Player",
        params: paramsToPass,
        location: locationToPass
      });
    });

    it("returns rejected Promise when path not found", () => {
      const output = prefetch.get("Anonymous", { id: 123 });
      expect.assertions(2);
      expect(output).toBeInstanceOf(Promise);
      return output.catch(err => {
        expect(true).toBe(true);
      });
    });
  });

  describe("reset", () => {
    it("resets the registered routes", () => {
      const playerURI = {
        name: "Player",
        path: "player/:id",
        on: {
          every: () => Promise.resolve()
        }
      };
      prefetch.register(playerURI);
      expect(prefetch.get("Player").then).toBeDefined();
      prefetch.reset();
      expect.assertions(2);
      return prefetch.get("Player").catch(err => {
        expect(err).toBe(
          `Could not prefetch data for Player because it is not registered.`
        );
      });
    });
  });
});
