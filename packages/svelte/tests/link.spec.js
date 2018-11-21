import InMemory from "@hickory/in-memory";
import { curi, prepareRoutes } from "@curi/router";
import simulant from "simulant";
import { curiStore } from "@curi/svelte";

import Link from "../src/Link.html";

describe("<Link>", () => {
  const routes = prepareRoutes([
    { name: "Home", path: "" },
    { name: "User", path: "u/:id" },
    { name: "Not Found", path: "(.*)" }
  ]);

  it("renders an anchor with expected pathname", () => {
    const history = InMemory();

    const router = curi(history, routes);
    const store = curiStore(router);

    const node = document.createElement("div");
    const link = new Link({
      target: node,
      store,
      data: {
        name: "Home"
      }
    });

    const a = node.querySelector("a");
    expect(a).not.toBeUndefined();
    expect(a.getAttribute("href")).toEqual("/");
  });

  it("uses params attribute to generate pathname", () => {
    const history = InMemory();
    const router = curi(history, routes);
    const store = curiStore(router);

    const node = document.createElement("div");
    const link = new Link({
      target: node,
      store,
      data: {
        name: "User",
        params: { id: "1" }
      }
    });

    const a = node.querySelector("a");
    expect(a.getAttribute("href")).toEqual("/u/1");
  });

  it('uses relative href if "name" isn\'t provided', () => {
    const history = InMemory({ locations: ["/u/2"] });
    const router = curi(history, routes);
    const store = curiStore(router);

    const node = document.createElement("div");
    const link = new Link({
      target: node,
      store,
      data: {
        hash: "is-a-band"
      }
    });

    const a = node.querySelector("a");
    expect(a.getAttribute("href")).toBe("#is-a-band");
  });

  it("appends query & hash to end of URI", () => {
    const history = InMemory();
    const router = curi(history, routes);
    const store = curiStore(router);

    const node = document.createElement("div");
    const link = new Link({
      target: node,
      store,
      data: {
        name: "Home",
        hash: "test",
        query: "one=two"
      }
    });

    const a = node.querySelector("a");
    expect(a.getAttribute("href")).toEqual("/?one=two#test");
  });

  describe("clicking a <Link>", () => {
    it("will navigate to the new location", () => {
      const history = InMemory();
      history.navigate = jest.fn();
      const router = curi(history, routes);
      const store = curiStore(router);

      const node = document.createElement("div");
      const link = new Link({
        target: node,
        store,
        data: {
          name: "User",
          params: { id: 1 }
        }
      });

      const a = node.querySelector("a");
      const event = simulant("click");
      simulant.fire(a, event);
      expect(history.navigate.mock.calls.length).toBe(1);
    });

    it("will ignore modified clicks", () => {
      const history = InMemory();
      history.navigate = jest.fn();
      const router = curi(history, routes);
      const store = curiStore(router);

      const node = document.createElement("div");
      const link = new Link({
        target: node,
        store,
        data: {
          name: "User",
          params: { id: 2 }
        }
      });

      const a = node.querySelector("a");

      const modifiers = ["metaKey", "altKey", "ctrlKey", "shiftKey"];
      modifiers.forEach(m => {
        simulant.fire(a, "click", { [m]: true });
        expect(history.navigate.mock.calls.length).toBe(0);
      });
    });

    it("will ignore click if event.defaultPrevented is true", () => {
      const history = InMemory();
      history.navigate = jest.fn();
      const router = curi(history, routes);
      const store = curiStore(router);

      const node = document.createElement("div");
      const link = new Link({
        target: node,
        store,
        data: {
          name: "User",
          params: { id: 3 }
        }
      });

      const a = node.querySelector("a");
      const event = simulant("click");
      event.preventDefault();
      simulant.fire(a, event);
      expect(history.navigate.mock.calls.length).toBe(0);
    });

    it("will ignore click if not done with left mouse button", () => {
      const history = InMemory();
      history.navigate = jest.fn();
      const router = curi(history, routes);
      const store = curiStore(router);

      const node = document.createElement("div");
      const link = new Link({
        target: node,
        store,
        data: {
          name: "User",
          params: { id: 3 }
        }
      });

      const a = node.querySelector("a");
      const event = simulant("click", { button: 1 });
      simulant.fire(a, event);
      expect(history.navigate.mock.calls.length).toBe(0);
    });
  });
});
