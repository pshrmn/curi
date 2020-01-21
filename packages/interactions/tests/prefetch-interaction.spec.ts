import "jest";
import { prepareRoutes } from "@curi/router";

import { SessionLocation } from "@hickory/root";

import { prefetch } from "@curi/interactions";

describe("prefetch route interaction", () => {
  describe("routes", () => {
    it("resolves with error for synchronous routes", () => {
      let routes = prepareRoutes([
        { name: "Sync", path: "sync" },
        { name: "Catch All", path: "(.*)" }
      ]);
      // This is a bit roundabout, but we verify that the paths did not register
      // by resolving from catch
      expect.assertions(1);
      let route = routes.route("Sync");
      return prefetch(route).then(resolved => {
        expect(resolved.error).toBe(
          "Could not prefetch data for Sync because it does not have a resolve function."
        );
      });
    });
  });

  describe("calling prefetch()", () => {
    it("returns a Promise that resolved with object ({ resolved, error })", () => {
      let routes = prepareRoutes([
        {
          name: "Player",
          path: "player/:id",
          resolve() {
            return Promise.resolve();
          }
        },
        { name: "Catch All", path: "(.*)" }
      ]);
      let route = routes.route("Player");
      expect(prefetch(route).then).toBeDefined();
    });

    it("returns Promise with error message when resolve throws", () => {
      let name = "Thrower";
      let errorMessage = "woops!";
      let routes = prepareRoutes([
        {
          name,
          path: "throws",
          resolve() {
            return Promise.reject(errorMessage);
          }
        },
        { name: "Catch All", path: "(.*)" }
      ]);
      let route = routes.route(name);
      let locationToPass = {} as SessionLocation;
      let output = prefetch(route, {
        match: { name, params: { id: 123 }, location: locationToPass }
      });
      expect.assertions(2);
      expect(output).toBeInstanceOf(Promise);
      return output.then(resolved => {
        expect(resolved.error).toBe(errorMessage);
      });
    });

    describe("match", () => {
      it("passes arguments to route's resolve function", done => {
        let routes = prepareRoutes([
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
        let paramsToPass = { id: 1 };
        let locationToPass = {} as SessionLocation;
        let route = routes.route("Player");
        prefetch(route, {
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
        let external = {};

        let routes = prepareRoutes([
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
        let route = routes.route("Player");
        prefetch(route, { external });
      });
    });
  });
});
