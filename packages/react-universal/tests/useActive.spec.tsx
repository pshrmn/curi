import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { inMemory } from "@hickory/in-memory";
import { createRouter, prepareRoutes } from "@curi/router";
import activeInteraction from "@curi/route-active";

import {
  createRouterComponent,
  useActive,
  useResponse
} from "@curi/react-universal";

describe("useActive", () => {
  let node;
  let router, Router;
  const routes = prepareRoutes([
    { name: "Home", path: "" },
    {
      name: "Contact",
      path: "contact",
      children: [{ name: "Method", path: ":method" }]
    }
  ]);

  beforeEach(() => {
    node = document.createElement("div");
    router = createRouter(inMemory, routes, {
      route: [activeInteraction()]
    });
    Router = createRouterComponent(router);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  describe("no route.active()", () => {
    it('throws if attempting to use in a Curi router without the "active" route interaction', () => {
      const router = createRouter(inMemory, routes);

      const realError = console.error;
      console.error = jest.fn();

      const Router = createRouterComponent(router);

      function App() {
        const active = useActive({ name: "Home" });
        return null;
      }

      expect(() => {
        ReactDOM.render(
          <Router>
            <App />
          </Router>,
          node
        );
      }).toThrow(
        `You are attempting to use the "active" route interaction, but have not included it in your Curi router.

import { createRouter } from "@curi/router";
import active from "@curi/route-active";

const router = createRouter(history, routes, {
  route: [active()]
});`
      );
      console.error = realError;
    });
  });

  describe("name", () => {
    it('uses the "name" to determine if it is active', () => {
      function App() {
        const active = useActive({ name: "Home" });
        expect(active).toBe(true);
        return null;
      }
      ReactDOM.render(
        <Router>
          <App />
        </Router>,
        node
      );
    });
  });

  describe("params", () => {
    it('uses the "params" to determine if it is active', () => {
      const router = createRouter(inMemory, routes, {
        route: [activeInteraction()],
        history: {
          locations: ["/contact/email"]
        }
      });
      const Router = createRouterComponent(router);
      function App() {
        const active = useActive({
          name: "Method",
          params: { method: "email" }
        });
        expect(active).toBe(true);
        return null;
      }
      ReactDOM.render(
        <Router>
          <App />
        </Router>,
        node
      );
    });
  });

  describe("partial", () => {
    it("returns true for partial matches when partial=true", () => {
      const router = createRouter(inMemory, routes, {
        route: [activeInteraction()],
        history: {
          locations: ["/contact/email"]
        }
      });
      const Router = createRouterComponent(router);
      function App() {
        const active = useActive({ name: "Contact", partial: true });
        expect(active).toBe(true);
        return null;
      }
      ReactDOM.render(
        <Router>
          <App />
        </Router>,
        node
      );
    });
  });

  describe("components", () => {
    it("is called with location if route is active", () => {
      const router = createRouter(inMemory, routes, {
        route: [activeInteraction()],
        history: {
          locations: ["/contact"]
        }
      });
      const components = jest.fn();
      let theLocation;
      const Router = createRouterComponent(router);
      function App() {
        const { response } = useResponse();
        theLocation = response.location;
        const active = useActive({ name: "Contact", components });
        return null;
      }
      ReactDOM.render(
        <Router>
          <App />
        </Router>,
        node
      );
      expect(components.mock.calls.length).toBe(1);
      expect(components.mock.calls[0][0]).toBe(theLocation);
    });

    it("is not called if route is not active", () => {
      const router = createRouter(inMemory, routes, {
        route: [activeInteraction()],
        history: {
          locations: ["/"]
        }
      });
      const components = jest.fn();
      let theResponse;
      const Router = createRouterComponent(router);
      function App() {
        const { response } = useResponse();
        theResponse = response;
        const active = useActive({ name: "Contact", components });
        return null;
      }
      ReactDOM.render(
        <Router>
          <App />
        </Router>,
        node
      );
      expect(components.mock.calls.length).toBe(0);
    });

    it("returns true if route matches and response check returns true", () => {
      const router = createRouter(inMemory, routes, {
        route: [activeInteraction()],
        history: {
          locations: ["/contact/email"]
        }
      });
      const Router = createRouterComponent(router);
      function App() {
        const active = useActive({
          name: "Contact",
          partial: true,
          components: () => true
        });
        expect(active).toBe(true);
        return null;
      }
      ReactDOM.render(
        <Router>
          <App />
        </Router>,
        node
      );
    });

    it("returns false if route matches, but location check returns false", () => {
      const router = createRouter(inMemory, routes, {
        route: [activeInteraction()],
        history: {
          locations: ["/contact/email"]
        }
      });
      const Router = createRouterComponent(router);
      function App() {
        const active = useActive({
          name: "Contact",
          partial: true,
          components: () => false
        });
        expect(active).toBe(false);
        return null;
      }
      ReactDOM.render(
        <Router>
          <App />
        </Router>,
        node
      );
    });
  });
});
