import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { in_memory } from "@hickory/in-memory";
import { create_router, prepare_routes } from "@curi/router";
import activeInteraction from "@curi/route-active";

import {
  create_router_component,
  useActive,
  useCuri
} from "@curi/react-universal";

describe("useActive", () => {
  let node;
  let router, Router;
  const routes = prepare_routes([
    { name: "Home", path: "" },
    {
      name: "Contact",
      path: "contact",
      children: [{ name: "Method", path: ":method" }]
    }
  ]);

  beforeEach(() => {
    node = document.createElement("div");
    router = create_router(in_memory, routes, {
      route: [activeInteraction()]
    });
    Router = create_router_component(router);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  describe("no route.active()", () => {
    it('throws if attempting to use in a Curi router without the "active" route interaction', () => {
      const router = create_router(in_memory, routes);

      const realError = console.error;
      console.error = jest.fn();

      const Router = create_router_component(router);

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

import curi from "@curi/router";
import active from "@curi/route-active";

const router = create_router(history, routes, {
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
      const router = create_router(in_memory, routes, {
        route: [activeInteraction()],
        history: {
          locations: ["/contact/email"]
        }
      });
      const Router = create_router_component(router);
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
      const router = create_router(in_memory, routes, {
        route: [activeInteraction()],
        history: {
          locations: ["/contact/email"]
        }
      });
      const Router = create_router_component(router);
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

  describe("locationCheck", () => {
    it("is called with location if route is active", () => {
      const router = create_router(in_memory, routes, {
        route: [activeInteraction()],
        history: {
          locations: ["/contact"]
        }
      });
      const locCheck = jest.fn();
      let theLocation;
      const Router = create_router_component(router);
      function App() {
        const { response } = useCuri();
        theLocation = response.location;
        const active = useActive({ name: "Contact", locationCheck: locCheck });
        return null;
      }
      ReactDOM.render(
        <Router>
          <App />
        </Router>,
        node
      );
      expect(locCheck.mock.calls.length).toBe(1);
      expect(locCheck.mock.calls[0][0]).toBe(theLocation);
    });

    it("is not called if route is not active", () => {
      const router = create_router(in_memory, routes, {
        route: [activeInteraction()],
        history: {
          locations: ["/"]
        }
      });
      const locCheck = jest.fn();
      let theResponse;
      const Router = create_router_component(router);
      function App() {
        const { response } = useCuri();
        theResponse = response;
        const active = useActive({ name: "Contact", locationCheck: locCheck });
        return null;
      }
      ReactDOM.render(
        <Router>
          <App />
        </Router>,
        node
      );
      expect(locCheck.mock.calls.length).toBe(0);
    });

    it("returns true if route matches and response check returns true", () => {
      const router = create_router(in_memory, routes, {
        route: [activeInteraction()],
        history: {
          locations: ["/contact/email"]
        }
      });
      const Router = create_router_component(router);
      function App() {
        const active = useActive({
          name: "Contact",
          partial: true,
          locationCheck: () => true
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
      const router = create_router(in_memory, routes, {
        route: [activeInteraction()],
        history: {
          locations: ["/contact/email"]
        }
      });
      const Router = create_router_component(router);
      function App() {
        const active = useActive({
          name: "Contact",
          partial: true,
          locationCheck: () => false
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
