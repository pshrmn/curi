import "jest";
import { prepareRoutes } from "@curi/router";

import { SessionLocation } from "@hickory/root";

import prefetch from "@curi/route-prefetch";

describe("prefetch route interaction", () => {
  it("is called using name", () => {
    const routes = prepareRoutes(
      [{ name: "Catch All", path: "(.*)" }],
      [prefetch()]
    );
    expect(routes.interactions.prefetch).toBeDefined();
  });

  describe("routes", () => {
    it("adds routes with async function(s)", () => {
      const routes = prepareRoutes(
        [
          {
            name: "Player",
            path: "player",
            resolve() {
              return Promise.resolve();
            }
          },
          { name: "Catch All", path: "(.*)" }
        ],
        [prefetch()]
      );
      expect(routes.interactions.prefetch("Player")).toBeDefined();
    });

    it("does not register if there are no async functions", () => {
      const routes = prepareRoutes(
        [{ name: "None", path: "player" }, { name: "Catch All", path: "(.*)" }],
        [prefetch()]
      );
      // This is a bit roundabout, but we verify that the paths did not register
      // by resolving from catch
      expect.assertions(1);
      return routes.interactions.prefetch("None").then(resolved => {
        expect(resolved.error).toBe(
          "Could not prefetch data for None because it is not registered."
        );
      });
    });
  });

  describe("calling prefetch()", () => {
    it("returns a Promise that resolved with object ({ resolved, error })", () => {
      const routes = prepareRoutes(
        [
          {
            name: "Player",
            path: "player/:id",
            resolve() {
              return Promise.resolve();
            }
          },
          { name: "Catch All", path: "(.*)" }
        ],
        [prefetch()]
      );
      expect(routes.interactions.prefetch("Player").then).toBeDefined();
    });

    it("returns Promise with error message when path not found", () => {
      const name = "Anonymous";

      const routes = prepareRoutes(
        [{ name: "Catch All", path: "(.*)" }],
        [prefetch()]
      );

      const output = routes.interactions.prefetch(name, { id: 123 });
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
      const routes = prepareRoutes(
        [
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
        ],
        [prefetch()]
      );

      const output = routes.interactions.prefetch(name, { id: 123 });
      expect.assertions(2);
      expect(output).toBeInstanceOf(Promise);
      return output.then(resolved => {
        expect(resolved.error).toBe(errorMessage);
      });
    });

    describe("match", () => {
      it("passes arguments to route's resolve function", done => {
        const routes = prepareRoutes(
          [
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
          ],
          [prefetch()]
        );
        const paramsToPass = { id: 1 };
        const locationToPass = {} as SessionLocation;
        routes.interactions.prefetch("Player", {
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

        const routes = prepareRoutes(
          [
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
          ],
          [prefetch()]
        );
        routes.interactions.prefetch("Player", { external });
      });
    });
  });
});
