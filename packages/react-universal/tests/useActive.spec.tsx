import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { InMemory } from "@hickory/in-memory";
import { curi, prepareRoutes } from "@curi/router";
import activeInteraction from "@curi/route-active";

// @ts-ignore (resolved by jest)
import { curiProvider, useActive, useCuri } from "@curi/react-universal";

describe("useActive", () => {
  let node;
  let history;
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
    history = InMemory();
    router = curi(history, routes, {
      route: [activeInteraction()]
    });
    Router = curiProvider(router);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  describe("no route.active()", () => {
    it('throws if attempting to use in a Curi router without the "active" route interaction', () => {
      const router = curi(history, routes);

      const realError = console.error;
      console.error = jest.fn();

      const Router = curiProvider(router);

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

const router = curi(history, routes, {
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
      const history = InMemory({ locations: ["/contact/email"] });
      const router = curi(history, routes, {
        route: [activeInteraction()]
      });
      const Router = curiProvider(router);
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
      const history = InMemory({ locations: ["/contact/email"] });
      const router = curi(history, routes, {
        route: [activeInteraction()]
      });
      const Router = curiProvider(router);
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
      const history = InMemory({ locations: ["/contact"] });
      const router = curi(history, routes, {
        route: [activeInteraction()]
      });
      const locCheck = jest.fn();
      let theLocation;
      const Router = curiProvider(router);
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
      const history = InMemory({ locations: ["/"] });
      const router = curi(history, routes, {
        route: [activeInteraction()]
      });
      const locCheck = jest.fn();
      let theResponse;
      const Router = curiProvider(router);
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
      const history = InMemory({ locations: ["/contact/email"] });
      const router = curi(history, routes, {
        route: [activeInteraction()]
      });
      const Router = curiProvider(router);
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
      const history = InMemory({ locations: ["/contact/email"] });
      const router = curi(history, routes, {
        route: [activeInteraction()]
      });
      const Router = curiProvider(router);
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
