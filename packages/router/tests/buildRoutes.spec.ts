import "jest";

// @ts-ignore (resolved by jest)
import { buildRoutes } from "@curi/router";

describe("buildRoutes()", () => {
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
      const routes = buildRoutes([
        { name: "Home", path: "/" },
        { name: "Catch All", path: "(.*)" }
      ]);
      expect(routes[0].public.path).toBe("");
    });

    it("warns", () => {
      const routes = buildRoutes([
        { name: "Home", path: "/" },
        { name: "Catch All", path: "(.*)" }
      ]);
      expect(fakeWarn.mock.calls.length).toBe(1);
    });
  });
});
