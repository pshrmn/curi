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
});
