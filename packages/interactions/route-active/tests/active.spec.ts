import "jest";
import { in_memory } from "@hickory/in-memory";
import { create_router, prepare_routes } from "@curi/router";

import create_active from "@curi/route-active";

import { InMemoryOptions } from "@hickory/in-memory";

describe("active route interaction", () => {
  it("is called using router.route.active()", () => {
    const routes = prepare_routes([{ name: "Catch All", path: "(.*)" }]);
    const router = create_router(in_memory, routes, {
      route: [create_active()]
    });
    expect(router.route.active).toBeDefined();
  });

  describe("get", () => {
    it("returns false if the route is not registered", () => {
      const routes = prepare_routes([
        {
          name: "Player",
          path: "player/:id"
        },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = create_router<InMemoryOptions>(in_memory, routes, {
        route: [create_active()],
        history: {
          locations: ["/"]
        }
      });

      const { response } = router.current();
      const player_is_active = router.route.active("Does Not Exist", response, {
        params: { id: "6" }
      });
      expect(player_is_active).toBe(false);
    });

    it("returns false when name does not match", () => {
      const routes = prepare_routes([
        {
          name: "Player",
          path: "player/:id"
        },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = create_router<InMemoryOptions>(in_memory, routes, {
        route: [create_active()],
        history: {
          locations: ["/"]
        }
      });

      const { response } = router.current();
      const player_is_active = router.route.active("Player", response, {
        params: { id: "6" }
      });
      expect(player_is_active).toBe(false);
    });

    describe("optional args", () => {
      it("works without getting passed optional object", () => {
        const routes = prepare_routes([
          {
            name: "Home",
            path: ""
          },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = create_router<InMemoryOptions>(in_memory, routes, {
          route: [create_active()],
          history: {
            locations: ["/"]
          }
        });

        const { response } = router.current();
        const home_is_active = router.route.active("Home", response);
        expect(home_is_active).toBe(true);
      });

      describe("params", () => {
        it("returns true when name matches and params match", () => {
          const routes = prepare_routes([
            {
              name: "Player",
              path: "player/:id"
            },
            { name: "Catch All", path: "(.*)" }
          ]);
          const router = create_router<InMemoryOptions>(in_memory, routes, {
            route: [create_active()],
            history: {
              locations: ["/player/7"]
            }
          });

          const { response } = router.current();
          const player_is_active = router.route.active("Player", response, {
            params: { id: "7" }
          });
          expect(player_is_active).toBe(true);
        });

        it("returns false when name matches but params do not", () => {
          const routes = prepare_routes([
            {
              name: "Player",
              path: "player/:id"
            },
            { name: "Catch All", path: "(.*)" }
          ]);
          const router = create_router<InMemoryOptions>(in_memory, routes, {
            route: [create_active()],
            history: {
              locations: ["/player/7"]
            }
          });

          const { response } = router.current();
          const player_is_active = router.route.active("Player", response, {
            params: { id: "6" }
          });
          expect(player_is_active).toBe(false);
        });
      });

      describe("partial", () => {
        it("defaults to false (returns false when name is partial match but partial is not provided)", () => {
          const routes = prepare_routes([
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
          const router = create_router<InMemoryOptions>(in_memory, routes, {
            route: [create_active()],
            history: {
              locations: ["/player/6/coach"]
            }
          });

          const { response } = router.current();
          const player_is_active = router.route.active("Player", response, {
            params: { id: "6" }
          });
          expect(player_is_active).toBe(false);
        });

        it("returns false when name is partial match but partial is not true", () => {
          const routes = prepare_routes([
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
          const router = create_router<InMemoryOptions>(in_memory, routes, {
            route: [create_active()],
            history: {
              locations: ["/player/6/coach"]
            }
          });

          const { response } = router.current();
          const player_is_active = router.route.active("Player", response, {
            params: { id: "6" },
            partial: false
          });
          expect(player_is_active).toBe(false);
        });

        it("returns true when name is partial match and partial is true", () => {
          const routes = prepare_routes([
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
          const router = create_router<InMemoryOptions>(in_memory, routes, {
            route: [create_active()],
            history: {
              locations: ["/player/6/coach"]
            }
          });

          const { response } = router.current();
          const player_is_active = router.route.active("Player", response, {
            params: { id: "6" },
            partial: true
          });
          expect(player_is_active).toBe(true);
        });
      });

      describe("location_check", () => {
        it("returns true when route matches and location_check returns true", () => {
          const routes = prepare_routes([
            {
              name: "Home",
              path: ""
            },
            { name: "Catch All", path: "(.*)" }
          ]);
          const router = create_router<InMemoryOptions>(in_memory, routes, {
            route: [create_active()],
            history: {
              locations: ["/#test"]
            }
          });

          const { response } = router.current();
          const is_active = router.route.active("Home", response, {
            location_check: location => location.hash === "test"
          });
          expect(is_active).toBe(true);
        });

        it("returns false when route matches but location_check returns false", () => {
          const routes = prepare_routes([
            {
              name: "Home",
              path: ""
            },
            { name: "Catch All", path: "(.*)" }
          ]);
          const router = create_router<InMemoryOptions>(in_memory, routes, {
            route: [create_active()],
            history: {
              locations: ["/#test"]
            }
          });

          const { response } = router.current();
          const is_active = router.route.active("Home", response, {
            location_check: location => false
          });
          expect(is_active).toBe(false);
        });

        it("doesn't call location_check if route doesn't match", () => {
          const routes = prepare_routes([
            {
              name: "Home",
              path: ""
            },
            { name: "Catch All", path: "(.*)" }
          ]);
          const router = create_router<InMemoryOptions>(in_memory, routes, {
            route: [create_active()],
            history: {
              locations: ["/not-a#test"]
            }
          });
          const location_check = jest.fn(() => true);
          const { response } = router.current();
          const is_active = router.route.active("Home", response, {
            location_check
          });
          expect(is_active).toBe(false);
          expect(location_check.mock.calls.length).toBe(0);
        });
      });
    });
  });

  describe("reset", () => {
    it("resetting removes the registered routes", () => {
      const routes = prepare_routes([
        {
          name: "Player",
          path: "player/:id"
        },
        { name: "Catch All", path: "(.*)" }
      ]);
      const empty_routes = prepare_routes([
        { name: "Catch All", path: "(.*)" }
      ]);

      const router = create_router<InMemoryOptions>(in_memory, routes, {
        route: [create_active()],
        history: {
          locations: ["/player/7"]
        }
      });

      const player_is_active = router.route.active(
        "Player",
        router.current().response,
        {
          params: { id: "7" }
        }
      );
      expect(player_is_active).toBe(true);

      router.refresh(empty_routes);

      const player_is_active_after_refresh = router.route.active(
        "Player",
        router.current().response,
        {
          params: { id: "7" }
        }
      );
      expect(player_is_active_after_refresh).toBe(false);
    });
  });
});
