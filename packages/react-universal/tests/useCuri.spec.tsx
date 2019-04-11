import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { in_memory } from "@hickory/in-memory";
import { create_router, prepare_routes } from "@curi/router";

import { create_router_component, useResponse } from "@curi/react-universal";

describe("useResponse", () => {
  let node;
  let router, Router;
  const routes = prepare_routes([
    { name: "Home", path: "" },
    { name: "Catch All", path: "(.*)" }
  ]);

  beforeEach(() => {
    node = document.createElement("div");
    router = create_router(in_memory, routes);
    Router = create_router_component(router);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  it("passes router, response, and navigation to children function", () => {
    const { response, navigation } = router.current();
    function App() {
      const result = useResponse();
      expect(result.router).toBe(router);
      expect(result.response).toBe(response);
      expect(result.navigation).toBe(navigation);
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
