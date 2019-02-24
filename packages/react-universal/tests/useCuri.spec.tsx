import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { InMemory } from "@hickory/in-memory";
import { curi, prepareRoutes } from "@curi/router";

import { curiProvider, useCuri } from "@curi/react-universal";

describe("useCuri", () => {
  let node;
  let history, router, Router;
  const routes = prepareRoutes([
    { name: "Home", path: "" },
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
