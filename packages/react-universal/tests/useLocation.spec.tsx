import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { inMemory } from "@hickory/in-memory";
import { createRouter, prepareRoutes } from "@curi/router";

import { createRouterComponent, useLocation } from "@curi/react-universal";

describe("useLocation", () => {
  let node;
  let router, Router;
  const routes = prepareRoutes({
    routes: [
      { name: "Home", path: "" },
      { name: "User", path: "u/:id" },
      { name: "Catch All", path: "(.*)" }
    ]
  });

  beforeEach(() => {
    node = document.createElement("div");
    router = createRouter(inMemory, routes);
    Router = createRouterComponent(router);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  describe("pathname", () => {
    it("returns route's pathname", () => {
      function App() {
        const result = useLocation({ name: "Home" });
        expect(result).toMatchObject({
          pathname: "/"
        });
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
        const result = useLocation({ name: "User", params: { id: "1" } });
        expect(result).toMatchObject({
          pathname: "/u/1"
        });
        return null;
      }
      ReactDOM.render(
        <Router>
          <App />
        </Router>,
        node
      );
    });

    it("returns empty string if name is not provided", () => {
      function App() {
        const result = useLocation({});
        expect(result).toMatchObject({
          pathname: ""
        });
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
        const result = useLocation({ name: "Home", query: "hi=yo" });
        expect(result).toMatchObject({
          query: "hi=yo"
        });
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
        const result = useLocation({ name: "Home", hash: "test" });
        expect(result).toMatchObject({
          hash: "test"
        });
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

  describe("state", () => {
    it("returns provided state", () => {
      const state = { key: "value" };
      function App() {
        const result = useLocation({ name: "Home", state });
        expect(result).toMatchObject({
          state
        });
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
