import "jest";
import InMemory from "@hickory/in-memory";
import { curi, prepareRoutes } from "@curi/router";

// @ts-ignore (resolved by jest)
import createActive from "@curi/route-active";

describe("active route interaction", () => {
  const history = InMemory();

  it("is called using router.route.active()", () => {
    const routes = prepareRoutes([{ name: "Catch All", path: "(.*)" }]);
    const router = curi(history, routes, {
      route: [createActive()]
    });
    expect(router.route.active).toBeDefined();
  });

  describe("get", () => {
    it("returns false if the route is not registered", () => {
      const history = InMemory({
        locations: ["/"]
      });
      const routes = prepareRoutes([
        {
          name: "Player",
          path: "player/:id"
        },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(history, routes, {
        route: [createActive()]
      });

      const { response } = router.current();
      const playerIsActive = router.route.active("Does Not Exist", response, {
        id: "6"
      });
      expect(playerIsActive).toBe(false);
    });

    it("returns false when name does not match", () => {
      const history = InMemory({
        locations: ["/"]
      });
      const routes = prepareRoutes([
        {
          name: "Player",
          path: "player/:id"
        },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(history, routes, {
        route: [createActive()]
      });

      const { response } = router.current();
      const playerIsActive = router.route.active("Player", response, {
        id: "6"
      });
      expect(playerIsActive).toBe(false);
    });

    describe("params", () => {
      it("returns true when name matches and params match", () => {
        const history = InMemory({
          locations: ["/player/7"]
        });
        const routes = prepareRoutes([
          {
            name: "Player",
            path: "player/:id"
          },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(history, routes, {
          route: [createActive()]
        });

        const { response } = router.current();
        const playerIsActive = router.route.active("Player", response, {
          id: "7"
        });
        expect(playerIsActive).toBe(true);
      });

      it("returns false when name matches but params do not", () => {
        const history = InMemory({
          locations: ["/player/7"]
        });
        const routes = prepareRoutes([
          {
            name: "Player",
            path: "player/:id"
          },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(history, routes, {
          route: [createActive()]
        });

        const { response } = router.current();
        const playerIsActive = router.route.active("Player", response, {
          id: "6"
        });
        expect(playerIsActive).toBe(false);
      });
    });

    describe("partial", () => {
      it("returns false when name is partial match but partial is not true", () => {
        const history = InMemory({
          locations: ["/player/6/coach"]
        });
        const routes = prepareRoutes([
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
        const router = curi(history, routes, {
          route: [createActive()]
        });

        const { response } = router.current();
        const playerIsActive = router.route.active("Player", response, {
          id: "6"
        });
        expect(playerIsActive).toBe(false);
      });

      it("returns true when name is partial match and partial is true", () => {
        const history = InMemory({
          locations: ["/player/6/coach"]
        });
        const routes = prepareRoutes([
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
        const router = curi(history, routes, {
          route: [createActive()]
        });

        const { response } = router.current();
        const playerIsActive = router.route.active(
          "Player",
          response,
          { id: "6" },
          true
        );
        expect(playerIsActive).toBe(true);
      });
    });

    describe("location check", () => {
      it("returns true when route matches and location check returns true", () => {
        const history = InMemory({
          locations: ["/#test"]
        });
        const routes = prepareRoutes([
          {
            name: "Home",
            path: ""
          },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(history, routes, {
          route: [createActive()]
        });

        const { response } = router.current();
        const isActive = router.route.active(
          "Home",
          response,
          null,
          null,
          location => location.hash === "test"
        );
        expect(isActive).toBe(true);
      });

      it("returns false when route matches but location check returns false", () => {
        const history = InMemory({
          locations: ["/#test"]
        });
        const routes = prepareRoutes([
          {
            name: "Home",
            path: ""
          },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(history, routes, {
          route: [createActive()]
        });

        const { response } = router.current();
        const isActive = router.route.active(
          "Home",
          response,
          null,
          null,
          location => false
        );
        expect(isActive).toBe(false);
      });

      it("doesn't call location check if route doesn't match", () => {
        const history = InMemory({
          locations: ["/not-a#test"]
        });
        const routes = prepareRoutes([
          {
            name: "Home",
            path: ""
          },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(history, routes, {
          route: [createActive()]
        });
        const locationCheck = jest.fn(() => true);
        const { response } = router.current();
        const isActive = router.route.active(
          "Home",
          response,
          null,
          null,
          locationCheck
        );
        expect(isActive).toBe(false);
        expect(locationCheck.mock.calls.length).toBe(0);
      });
    });
  });

  describe("reset", () => {
    it("resetting removes the registered routes", () => {
      const history = InMemory({
        locations: ["/player/7"]
      });
      const routes = prepareRoutes([
        {
          name: "Player",
          path: "player/:id"
        },
        { name: "Catch All", path: "(.*)" }
      ]);
      const emptyRoutes = prepareRoutes([{ name: "Catch All", path: "(.*)" }]);

      const router = curi(history, routes, {
        route: [createActive()]
      });

      const playerIsActive = router.route.active(
        "Player",
        router.current().response,
        { id: "7" }
      );
      expect(playerIsActive).toBe(true);

      router.refresh(emptyRoutes);

      const playerIsActiveAfterRefresh = router.route.active(
        "Player",
        router.current().response,
        { id: "7" }
      );
      expect(playerIsActiveAfterRefresh).toBe(false);
    });
  });
});
