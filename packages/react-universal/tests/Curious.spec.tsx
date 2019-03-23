import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { InMemory } from "@hickory/in-memory";
import { curi, prepare_routes } from "@curi/router";

// @ts-ignore (resolved by jest)
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
    router = curi(InMemory, routes);
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
