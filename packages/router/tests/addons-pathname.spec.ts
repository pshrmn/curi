import "jest";

// @ts-ignore (resolved by jest)
import { pathname } from "@curi/router";

describe("pathnameInteraction route interaction", () => {
  let pathnameInteraction;

  beforeEach(() => {
    pathnameInteraction = pathname();
  });

  describe("name", () => {
    it("is pathname", () => {
      expect(pathnameInteraction.name).toBe("pathname");
    });
  });

  describe("register", () => {
    it("adds the path to the known paths", () => {
      const player = { name: "Player", path: "player" };
      pathnameInteraction.register(player);
      expect(pathnameInteraction.get("Player")).toBeDefined();
    });

    it("merges path with parent path", () => {
      const grandparent = { name: "Grandparent", path: "grandparent" };
      const parent = { name: "Parent", path: "parent" };
      const child = { name: "Child", path: "child" };
      pathnameInteraction.register(grandparent);
      pathnameInteraction.register(parent, "Grandparent");
      pathnameInteraction.register(child, "Parent");
      expect(pathnameInteraction.get("Child")).toBe(
        "/grandparent/parent/child"
      );
    });

    it("merges when there is a trailing slash", () => {
      const parent = { name: "Parent", path: "parent/" };
      const child = { name: "Child", path: "child" };
      pathnameInteraction.register(parent);
      pathnameInteraction.register(child, "Parent");
      expect(pathnameInteraction.get("Child")).toBe("/parent/child");
    });

    it("warns when registering the same name", () => {
      const warn = console.warn;
      const mockWarn = jest.fn();
      console.warn = mockWarn;

      const first = { name: "Test", path: "first" };
      const second = { name: "Test", path: "second" };

      pathnameInteraction.register(first);
      expect(mockWarn.mock.calls.length).toBe(0);

      pathnameInteraction.register(second);
      expect(mockWarn.mock.calls.length).toBe(1);

      console.warn = warn;
    });
  });

  describe("get", () => {
    it("returns a pathnameInteraction using params", () => {
      const player = { name: "Player", path: "player/:id" };
      pathnameInteraction.register(player);
      const output = pathnameInteraction.get("Player", { id: 17 });
      expect(output).toBe("/player/17");
    });

    it("returns undefined when path not found", () => {
      const error = console.error;
      const mockError = jest.fn();
      console.error = mockError;

      const output = pathnameInteraction.get("Anonymous", { id: 123 });
      expect(output).toBe(undefined);
      expect(mockError.mock.calls.length).toBe(1);

      console.error = error;
    });

    it("works when paths contain no params", () => {
      // duh?
      const staticRoute = { name: "Static", path: "this/has/no/params" };
      pathnameInteraction.register(staticRoute);
      const output = pathnameInteraction.get("Static");
      expect(output).toBe("/this/has/no/params");
    });

    it("re-uses compiled fn on subsequent calls", () => {
      // this test is just added for coverage
      const player = { name: "Player", path: "player/:id" };
      pathnameInteraction.register(player);
      const output = pathnameInteraction.get("Player", { id: 17 });
      expect(output).toBe("/player/17");
      const output2 = pathnameInteraction.get("Player", { id: 71 });
      expect(output2).toBe("/player/71");
    });

    it("does not add extra leading slash if path begins with slash", () => {
      // another code coverage test. There wasn't a "good" place to
      // put this
      const player = { name: "Player", path: "/player/:id" };
      pathnameInteraction.register(player);
      const output = pathnameInteraction.get("Player", { id: 17 });
      expect(output).toBe("/player/17");
    });
  });
});
