import "jest";

// @ts-ignore (resolved by jest)
import { prepareRoutes } from "@curi/router";

describe("prepareRoutes()", () => {
  describe("paths beginning with forward slash", () => {
    const realWarn = console.warn;
    const fakeWarn = (console.warn = jest.fn());

    afterEach(() => {
      fakeWarn.mockReset();
    });

    afterAll(() => {
      console.warn = realWarn;
    });

    it("removes the leading slash", () => {
      const routes = prepareRoutes([
        { name: "Home", path: "/" },
        { name: "Catch All", path: "(.*)" }
      ]);
      expect(routes[0].public.path).toBe("");
    });

    it("warns", () => {
      const routes = prepareRoutes([
        { name: "Home", path: "/" },
        { name: "Catch All", path: "(.*)" }
      ]);
      expect(fakeWarn.mock.calls.length).toBe(1);
    });
  });

  describe("unique names", () => {
    it("throws if multiple routes have the same name", () => {
      const routes = [
        { name: "Home", path: "" },
        { name: "Home", path: "home" },
        { name: "Catch All", path: "(.*)" }
      ];
      expect(() => {
        prepareRoutes(routes);
      }).toThrow(
        `Multiple routes have the name "Home". Route names must be unique.`
      );
    });

    it("throws with nested routes", () => {
      const routes = [
        {
          name: "Home",
          path: "",
          children: [{ name: "Child", path: "child" }]
        },
        {
          name: "About",
          path: "about",
          children: [{ name: "Child", path: "child" }]
        },
        { name: "Catch All", path: "(.*)" }
      ];
      expect(() => {
        prepareRoutes(routes);
      }).toThrow(
        `Multiple routes have the name "Child". Route names must be unique.`
      );
    });
  });
});
