import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { InMemory } from "@hickory/in-memory";
import { create_router, prepare_routes } from "@curi/router";

// @ts-ignore (resolved by jest)
import { create_router_component, useCuri } from "@curi/react-universal";

describe("useCuri", () => {
  let node;
  let router, Router;
  const routes = prepare_routes([
    { name: "Home", path: "" },
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

  it("passes router, response, and navigation to children function", () => {
    const { response, navigation } = router.current();
    function Curious() {
      const result = useCuri();
      expect(result.router).toBe(router);
      expect(result.response).toBe(response);
      expect(result.navigation).toBe(navigation);
      return null;
    }
    ReactDOM.render(
      <Router>
        <Curious />
      </Router>,
      node
    );
  });
});
