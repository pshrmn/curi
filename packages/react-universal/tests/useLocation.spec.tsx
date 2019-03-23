import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { InMemory } from "@hickory/in-memory";
import { create_router, prepare_routes } from "@curi/router";

// @ts-ignore (resolved by jest)
import { create_router_component, useLocation } from "@curi/react-universal";

describe("useLocation", () => {
  let node;
  let router, Router;
  const routes = prepare_routes([
    { name: "Home", path: "" },
    { name: "User", path: "u/:id" },
    { name: "Catch All", path: "(.*)" }
  ]);

  beforeEach(() => {
    node = document.createElement("div");
    router = create_router(InMemory, routes);
    Router = create_router_component(router);
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
