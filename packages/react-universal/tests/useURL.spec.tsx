import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { inMemory } from "@hickory/in-memory";
import { createRouter, prepareRoutes } from "@curi/router";
import * as qs from "qs";

import { createRouterComponent, useURL } from "@curi/react-universal";

describe("useURL", () => {
  let node;
  const routes = prepareRoutes({
    routes: [
      { name: "Home", path: "" },
      { name: "User", path: "u/:id" },
      { name: "Catch All", path: "(.*)" }
    ]
  });

  beforeEach(() => {
    node = document.createElement("div");
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  describe("pathname", () => {
    it("returns route's pathname", () => {
      const router = createRouter(inMemory, routes);
      const Router = createRouterComponent(router);
      function App() {
        const result = useURL({ name: "Home" });
        expect(result).toBe("/");
        return null;
      }
      ReactDOM.render(
        <Router>
          <App />
        </Router>,
        node
      );
    });

    it("returns route's pathname using params", () => {
      const router = createRouter(inMemory, routes);
      const Router = createRouterComponent(router);
      function App() {
        const result = useURL({ name: "User", params: { id: "1" } });
        expect(result).toBe("/u/1");
        return null;
      }
      ReactDOM.render(
        <Router>
          <App />
        </Router>,
        node
      );
    });

    it("has no pathname component if name is not provided", () => {
      const router = createRouter(inMemory, routes, {
        history: {
          locations: [{ url: "/example" }]
        }
      });
      const Router = createRouterComponent(router);
      function App() {
        const result = useURL({ hash: "test" });
        expect(result).toBe("#test");
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

  describe("query", () => {
    it("returns provided query", () => {
      const router = createRouter(inMemory, routes);
      const Router = createRouterComponent(router);
      function App() {
        const result = useURL({ name: "Home", query: "hi=yo" });
        expect(result).toBe("/?hi=yo");
        return null;
      }
      ReactDOM.render(
        <Router>
          <App />
        </Router>,
        node
      );
    });

    it("works with custom history parse/stringifiers", () => {
      const router = createRouter(inMemory, routes, {
        history: {
          query: {
            parse: qs.parse,
            stringify: qs.stringify
          }
        }
      });
      const Router = createRouterComponent(router);

      function App() {
        const result = useURL({ name: "Home", query: { hi: "yo" } });
        expect(result).toBe("/?hi=yo");
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

  describe("hash", () => {
    it("returns provided hash", () => {
      const router = createRouter(inMemory, routes);
      const Router = createRouterComponent(router);
      function App() {
        const result = useURL({ name: "Home", hash: "test" });
        expect(result).toBe("/#test");
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
