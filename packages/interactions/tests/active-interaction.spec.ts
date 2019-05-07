import "jest";
import { inMemory } from "@hickory/in-memory";
import { createRouter, prepareRoutes } from "@curi/router";

import { InMemoryOptions } from "@hickory/in-memory";

import { active } from "@curi/interactions";

describe("active route interaction", () => {
  describe("checking if a route is active", () => {
    it("returns false when name does not match", () => {
      const routes = prepareRoutes({
        routes: [
          {
            name: "Player",
            path: "player/:id"
          },
          { name: "Catch All", path: "(.*)" }
        ]
      });
      const router = createRouter<InMemoryOptions>(inMemory, routes);

      const { response } = router.current();
      const route = router.route("Player");
      const playerIsActive = active(route, response, { params: { id: "6" } });
      expect(playerIsActive).toBe(false);
    });

    describe("optional args", () => {
      it("works without getting passed optional object", () => {
        const routes = prepareRoutes({
          routes: [
            {
              name: "Home",
              path: ""
            },
            { name: "Catch All", path: "(.*)" }
          ]
        });
        const router = createRouter<InMemoryOptions>(inMemory, routes);

        const { response } = router.current();
        const route = router.route("Home");
        const homeIsActive = active(route, response);
        expect(homeIsActive).toBe(true);
      });

      describe("params", () => {
        it("returns true when name matches and params match", () => {
          const routes = prepareRoutes({
            routes: [
              {
                name: "Player",
                path: "player/:id"
              },
              { name: "Catch All", path: "(.*)" }
            ]
          });
          const router = createRouter<InMemoryOptions>(inMemory, routes, {
            history: {
              locations: [{ url: "/player/7" }]
            }
          });

          const { response } = router.current();
          const route = router.route("Player");
          const playerIsActive = active(route, response, {
            params: { id: "7" }
          });
          expect(playerIsActive).toBe(true);
        });

        it("returns false when name matches but params do not", () => {
          const routes = prepareRoutes({
            routes: [
              {
                name: "Player",
                path: "player/:id"
              },
              { name: "Catch All", path: "(.*)" }
            ]
          });
          const router = createRouter<InMemoryOptions>(inMemory, routes, {
            history: {
              locations: [{ url: "/player/7" }]
            }
          });

          const { response } = router.current();
          const route = router.route("Player");
          const playerIsActive = active(route, response, {
            params: { id: "6" }
          });
          expect(playerIsActive).toBe(false);
        });

        it("returns false if route expects params but none are provided", () => {
          const routes = prepareRoutes({
            routes: [
              {
                name: "Player",
                path: "player/:id"
              },
              { name: "Catch All", path: "(.*)" }
            ]
          });
          const router = createRouter<InMemoryOptions>(inMemory, routes, {
            history: {
              locations: [{ url: "/player/7" }]
            }
          });

          const { response } = router.current();
          const route = router.route("Player");
          const playerIsActive = active(route, response);
          expect(playerIsActive).toBe(false);
        });
      });

      describe("partial", () => {
        it("defaults to false (returns false when name is partial match but partial is not provided)", () => {
          const routes = prepareRoutes({
            routes: [
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
            ]
          });
          const router = createRouter<InMemoryOptions>(inMemory, routes, {
            history: {
              locations: [{ url: "/player/6/coach" }]
            }
          });

          const { response } = router.current();
          const route = router.route("Player");
          const playerIsActive = active(route, response, {
            params: { id: "6" }
          });
          expect(playerIsActive).toBe(false);
        });

        it("returns false when name is partial match but partial is not true", () => {
          const routes = prepareRoutes({
            routes: [
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
            ]
          });
          const router = createRouter<InMemoryOptions>(inMemory, routes, {
            history: {
              locations: [{ url: "/player/6/coach" }]
            }
          });

          const { response } = router.current();
          const route = router.route("Player");
          const playerIsActive = active(route, response, {
            params: { id: "6" },
            partial: false
          });
          expect(playerIsActive).toBe(false);
        });

        it("returns true when name is partial match and partial is true", () => {
          const routes = prepareRoutes({
            routes: [
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
            ]
          });
          const router = createRouter<InMemoryOptions>(inMemory, routes, {
            history: {
              locations: [{ url: "/player/6/coach" }]
            }
          });

          const { response } = router.current();
          const route = router.route("Player");
          const playerIsActive = active(route, response, {
            params: { id: "6" },
            partial: true
          });
          expect(playerIsActive).toBe(true);
        });
      });

      describe("components", () => {
        it("returns true when route matches and components returns true", () => {
          const routes = prepareRoutes({
            routes: [
              {
                name: "Home",
                path: ""
              },
              { name: "Catch All", path: "(.*)" }
            ]
          });
          const router = createRouter<InMemoryOptions>(inMemory, routes, {
            history: {
              locations: [{ url: "/#test" }]
            }
          });

          const { response } = router.current();
          const route = router.route("Home");
          const isActive = active(route, response, {
            components: location => location.hash === "test"
          });
          expect(isActive).toBe(true);
        });

        it("returns false when route matches but components returns false", () => {
          const routes = prepareRoutes({
            routes: [
              {
                name: "Home",
                path: ""
              },
              { name: "Catch All", path: "(.*)" }
            ]
          });
          const router = createRouter<InMemoryOptions>(inMemory, routes, {
            history: {
              locations: [{ url: "/#test" }]
            }
          });

          const { response } = router.current();
          const route = router.route("Home");
          const isActive = active(route, response, {
            components: location => false
          });
          expect(isActive).toBe(false);
        });

        it("doesn't call components function if route doesn't match", () => {
          const routes = prepareRoutes({
            routes: [
              {
                name: "Home",
                path: ""
              },
              { name: "Catch All", path: "(.*)" }
            ]
          });
          const router = createRouter<InMemoryOptions>(inMemory, routes, {
            history: {
              locations: [{ url: "/not-a#test" }]
            }
          });
          const components = jest.fn(() => true);
          const { response } = router.current();
          const route = router.route("Home");
          const isActive = active(route, response, {
            components
          });
          expect(isActive).toBe(false);
          expect(components.mock.calls.length).toBe(0);
        });
      });
    });
  });
});
