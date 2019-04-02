import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { in_memory } from "@hickory/in-memory";
import { create_router, prepare_routes } from "@curi/router";

import { create_router_component, Curious } from "@curi/react-universal";

describe("<Curious>", () => {
  let node;
  let history, router, Router;
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
    ReactDOM.render(
      <Router>
        <Curious>
          {value => {
            expect(value.router).toBe(router);
            expect(value.response).toBe(response);
            expect(value.navigation).toBe(navigation);
            return null;
          }}
        </Curious>
      </Router>,
      node
    );
  });
});
