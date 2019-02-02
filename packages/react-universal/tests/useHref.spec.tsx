import "jest";
import React from "react";
import ReactDOM from "react-dom";
import InMemory from "@hickory/in-memory";
import { curi, prepareRoutes } from "@curi/router";
import * as qs from "qs";

// @ts-ignore (resolved by jest)
import { curiProvider, useHref } from "@curi/react-universal";

describe("useHref", () => {
  let node;
  let history, router, Router;
  const routes = prepareRoutes([
    { name: "Home", path: "" },
    { name: "User", path: "u/:id" },
    { name: "Catch All", path: "(.*)" }
  ]);

  beforeEach(() => {
    node = document.createElement("div");
    history = InMemory();
    router = curi(history, routes);
    Router = curiProvider(router);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  describe("pathname", () => {
    it("returns route's pathname", () => {
      function App() {
        const result = useHref({ name: "Home" });
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
      function App() {
        const result = useHref({ name: "User", params: { id: "1" } });
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

    it("is relative if route name is not provided", () => {
      function App() {
        const result = useHref({});
        expect(result).toBe("");
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
      function App() {
        const result = useHref({ name: "Home", query: "hi=yo" });
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
      const history = InMemory({
        query: {
          parse: qs.parse,
          stringify: qs.stringify
        }
      });
      const router = curi(history, routes);
      const Router = curiProvider(router);

      function App() {
        const result = useHref({ name: "Home", query: { hi: "yo" } });
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
      function App() {
        const result = useHref({ name: "Home", hash: "test" });
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
