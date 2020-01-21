import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { inMemory } from "@hickory/in-memory";
import { createRouter, prepareRoutes } from "@curi/router";
import * as qs from "qs";

import { createRouterComponent, useURL } from "@curi/react-universal";

describe("useURL", () => {
  let node;
  let routes = prepareRoutes([
    { name: "Home", path: "" },
    { name: "User", path: "u/:id" },
    { name: "Catch All", path: "(.*)" }
  ]);

  beforeEach(() => {
    node = document.createElement("div");
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  describe("pathname", () => {
    it("returns route's pathname", () => {
      let router = createRouter(inMemory, routes);
      let Router = createRouterComponent(router);
      function App() {
        let result = useURL({ name: "Home" });
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
      let router = createRouter(inMemory, routes);
      let Router = createRouterComponent(router);
      function App() {
        let result = useURL({ name: "User", params: { id: "1" } });
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
      let router = createRouter(inMemory, routes, {
        history: {
          locations: [{ url: "/example" }]
        }
      });
      let Router = createRouterComponent(router);
      function App() {
        let result = useURL({ hash: "test" });
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
      let router = createRouter(inMemory, routes);
      let Router = createRouterComponent(router);
      function App() {
        let result = useURL({ name: "Home", query: "hi=yo" });
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
      let router = createRouter(inMemory, routes, {
        history: {
          query: {
            parse: qs.parse,
            stringify: qs.stringify
          }
        }
      });
      let Router = createRouterComponent(router);

      function App() {
        let result = useURL({ name: "Home", query: { hi: "yo" } });
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
      let router = createRouter(inMemory, routes);
      let Router = createRouterComponent(router);
      function App() {
        let result = useURL({ name: "Home", hash: "test" });
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
