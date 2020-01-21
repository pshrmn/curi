import "jest";
import { inMemory } from "@hickory/in-memory";
import { createRouter, prepareRoutes } from "@curi/router";

import { InMemoryOptions } from "@hickory/in-memory";

import { active } from "@curi/interactions";

describe("active route interaction", () => {
  describe("checking if a route is active", () => {
    it("returns false when name does not match", () => {
      let routes = prepareRoutes([
        {
          name: "Player",
          path: "player/:id"
        },
        { name: "Catch All", path: "(.*)" }
      ]);
      let router = createRouter<InMemoryOptions>(inMemory, routes);

      let { response } = router.current();
      let route = router.route("Player");
      let playerIsActive = active(route, response, { params: { id: "6" } });
      expect(playerIsActive).toBe(false);
    });

    describe("optional args", () => {
      it("works without getting passed optional object", () => {
        let routes = prepareRoutes([
          {
            name: "Home",
            path: ""
          },
          { name: "Catch All", path: "(.*)" }
        ]);
        let router = createRouter<InMemoryOptions>(inMemory, routes);

        let { response } = router.current();
        let route = router.route("Home");
        let homeIsActive = active(route, response);
        expect(homeIsActive).toBe(true);
      });

      describe("params", () => {
        it("returns true when name matches and params match", () => {
          let routes = prepareRoutes([
            {
              name: "Player",
              path: "player/:id"
            },
            { name: "Catch All", path: "(.*)" }
          ]);
          let router = createRouter<InMemoryOptions>(inMemory, routes, {
            history: {
              locations: [{ url: "/player/7" }]
            }
          });

          let { response } = router.current();
          let route = router.route("Player");
          let playerIsActive = active(route, response, {
            params: { id: "7" }
          });
          expect(playerIsActive).toBe(true);
        });

        it("returns false when name matches but params do not", () => {
          let routes = prepareRoutes([
            {
              name: "Player",
              path: "player/:id"
            },
            { name: "Catch All", path: "(.*)" }
          ]);
          let router = createRouter<InMemoryOptions>(inMemory, routes, {
            history: {
              locations: [{ url: "/player/7" }]
            }
          });

          let { response } = router.current();
          let route = router.route("Player");
          let playerIsActive = active(route, response, {
            params: { id: "6" }
          });
          expect(playerIsActive).toBe(false);
        });

        it("returns false if route expects params but none are provided", () => {
          let routes = prepareRoutes([
            {
              name: "Player",
              path: "player/:id"
            },
            { name: "Catch All", path: "(.*)" }
          ]);
          let router = createRouter<InMemoryOptions>(inMemory, routes, {
            history: {
              locations: [{ url: "/player/7" }]
            }
          });

          let { response } = router.current();
          let route = router.route("Player");
          let playerIsActive = active(route, response);
          expect(playerIsActive).toBe(false);
        });
      });

      describe("partial", () => {
        it("defaults to false (returns false when name is partial match but partial is not provided)", () => {
          let routes = prepareRoutes([
            {
              name: "Player",
              path: "player/:id",
              children: [
                {
                  name: "Coach",
                  path: "coach"
                }
              ]
            },
            { name: "Catch All", path: "(.*)" }
          ]);
          let router = createRouter<InMemoryOptions>(inMemory, routes, {
            history: {
              locations: [{ url: "/player/6/coach" }]
            }
          });

          let { response } = router.current();
          let route = router.route("Player");
          let playerIsActive = active(route, response, {
            params: { id: "6" }
          });
          expect(playerIsActive).toBe(false);
        });

        it("returns false when name is partial match but partial is not true", () => {
          let routes = prepareRoutes([
            {
              name: "Player",
              path: "player/:id",
              children: [
                {
                  name: "Coach",
                  path: "coach"
                }
              ]
            },
            { name: "Catch All", path: "(.*)" }
          ]);
          let router = createRouter<InMemoryOptions>(inMemory, routes, {
            history: {
              locations: [{ url: "/player/6/coach" }]
            }
          });

          let { response } = router.current();
          let route = router.route("Player");
          let playerIsActive = active(route, response, {
            params: { id: "6" },
            partial: false
          });
          expect(playerIsActive).toBe(false);
        });

        it("returns true when name is partial match and partial is true", () => {
          let routes = prepareRoutes([
            {
              name: "Player",
              path: "player/:id",
              children: [
                {
                  name: "Coach",
                  path: "coach"
                }
              ]
            },
            { name: "Catch All", path: "(.*)" }
          ]);
          let router = createRouter<InMemoryOptions>(inMemory, routes, {
            history: {
              locations: [{ url: "/player/6/coach" }]
            }
          });

          let { response } = router.current();
          let route = router.route("Player");
          let playerIsActive = active(route, response, {
            params: { id: "6" },
            partial: true
          });
          expect(playerIsActive).toBe(true);
        });
      });

      describe("components", () => {
        it("returns true when route matches and components returns true", () => {
          let routes = prepareRoutes([
            {
              name: "Home",
              path: ""
            },
            { name: "Catch All", path: "(.*)" }
          ]);
          let router = createRouter<InMemoryOptions>(inMemory, routes, {
            history: {
              locations: [{ url: "/#test" }]
            }
          });

          let { response } = router.current();
          let route = router.route("Home");
          let isActive = active(route, response, {
            components: location => location.hash === "test"
          });
          expect(isActive).toBe(true);
        });

        it("returns false when route matches but components returns false", () => {
          let routes = prepareRoutes([
            {
              name: "Home",
              path: ""
            },
            { name: "Catch All", path: "(.*)" }
          ]);
          let router = createRouter<InMemoryOptions>(inMemory, routes, {
            history: {
              locations: [{ url: "/#test" }]
            }
          });

          let { response } = router.current();
          let route = router.route("Home");
          let isActive = active(route, response, {
            components: location => false
          });
          expect(isActive).toBe(false);
        });

        it("doesn't call components function if route doesn't match", () => {
          let routes = prepareRoutes([
            {
              name: "Home",
              path: ""
            },
            { name: "Catch All", path: "(.*)" }
          ]);
          let router = createRouter<InMemoryOptions>(inMemory, routes, {
            history: {
              locations: [{ url: "/not-a#test" }]
            }
          });
          let components = jest.fn(() => true);
          let { response } = router.current();
          let route = router.route("Home");
          let isActive = active(route, response, {
            components
          });
          expect(isActive).toBe(false);
          expect(components.mock.calls.length).toBe(0);
        });
      });
    });
  });
});
