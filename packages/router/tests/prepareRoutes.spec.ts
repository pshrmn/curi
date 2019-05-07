import "jest";

import { prepareRoutes } from "@curi/router";

describe("prepareRoutes()", () => {
  describe("paths beginning with forward slash", () => {
    it("throws", () => {
      expect(() => {
        const routes = prepareRoutes([
          { name: "Home", path: "/" },
          { name: "Catch All", path: "(.*)" }
        ]);
      }).toThrow(
        `Route paths cannot start with a forward slash (/). (Received "/")`
      );
    });
  });

  describe("unique names", () => {
    it("throws if multiple routes have the same name", () => {
      expect(() => {
        prepareRoutes([
          { name: "Home", path: "" },
          { name: "Home", path: "home" },
          { name: "Catch All", path: "(.*)" }
        ]);
      }).toThrow(
        `Multiple routes have the name "Home". Route names must be unique.`
      );
    });

    it("throws with nested routes", () => {
      expect(() => {
        prepareRoutes([
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
        ]);
      }).toThrow(
        `Multiple routes have the name "Child". Route names must be unique.`
      );
    });
  });
});
