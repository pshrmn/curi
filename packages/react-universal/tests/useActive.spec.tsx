import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { inMemory } from "@hickory/in-memory";
import { createRouter, prepareRoutes } from "@curi/router";

import {
  createRouterComponent,
  useActive,
  useResponse
} from "@curi/react-universal";

describe("useActive", () => {
  let node;
  let router, Router;
  let routes = prepareRoutes([
    { name: "Home", path: "" },
    {
      name: "Contact",
      path: "contact",
      children: [{ name: "Method", path: ":method" }]
    }
  ]);

  beforeEach(() => {
    node = document.createElement("div");
    router = createRouter(inMemory, routes);
    Router = createRouterComponent(router);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  describe("name", () => {
    it('uses the "name" to determine if it is active', () => {
      function App() {
        let active = useActive({ name: "Home" });
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
      let router = createRouter(inMemory, routes, {
        history: {
          locations: [{ url: "/contact/email" }]
        }
      });
      let Router = createRouterComponent(router);
      function App() {
        let active = useActive({
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
      let router = createRouter(inMemory, routes, {
        history: {
          locations: [{ url: "/contact/email" }]
        }
      });
      let Router = createRouterComponent(router);
      function App() {
        let active = useActive({ name: "Contact", partial: true });
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
      let router = createRouter(inMemory, routes, {
        history: {
          locations: [{ url: "/contact" }]
        }
      });
      let components = jest.fn();
      let theLocation;
      let Router = createRouterComponent(router);
      function App() {
        let { response } = useResponse();
        theLocation = response.location;
        let active = useActive({ name: "Contact", components });
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
      let router = createRouter(inMemory, routes);
      let components = jest.fn();
      let theResponse;
      let Router = createRouterComponent(router);
      function App() {
        let { response } = useResponse();
        theResponse = response;
        let active = useActive({ name: "Contact", components });
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
      let router = createRouter(inMemory, routes, {
        history: {
          locations: [{ url: "/contact/email" }]
        }
      });
      let Router = createRouterComponent(router);
      function App() {
        let active = useActive({
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
      let router = createRouter(inMemory, routes, {
        history: {
          locations: [{ url: "/contact/email" }]
        }
      });
      let Router = createRouterComponent(router);
      function App() {
        let active = useActive({
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
