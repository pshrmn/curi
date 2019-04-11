import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { in_memory } from "@hickory/in-memory";
import { create_router, prepare_routes } from "@curi/router";

import { create_router_component, useResponse } from "@curi/react-universal";

describe("useResponse", () => {
  let node;
  const routes = prepare_routes([
    { name: "Home", path: "" },
    { name: "About", path: "about" },
    { name: "Catch All", path: "(.*)" }
  ]);

  beforeEach(() => {
    node = document.createElement("div");
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  it("returns router, response, and navigation objects", () => {
    const router = create_router(in_memory, routes);
    const Router = create_router_component(router);
    const { response, navigation } = router.current();
    function App() {
      const result = useResponse();
      expect(result.router).toBe(router);
      expect(result.response).toBe(response);
      expect(result.navigation).toBe(navigation);
      return null;
    }
    act(() => {
      ReactDOM.render(
        <Router>
          <App />
        </Router>,
        node
      );
    });
  });

  it("is called when there is a new response", () => {
    const router = create_router(in_memory, routes);
    const Router = create_router_component(router);
    let from_context;
    function App() {
      from_context = useResponse();
      return <div>{from_context.response.name}</div>;
    }

    act(() => {
      ReactDOM.render(
        <Router>
          <App />
        </Router>,
        node
      );
    });

    const first_current = router.current();
    expect(from_context.response).toBe(first_current.response);
    expect(from_context.navigation).toBe(first_current.navigation);

    act(() => {
      router.navigate({ name: "About" });
    });

    const second_current = router.current();
    expect(from_context.response).toBe(second_current.response);
    expect(from_context.navigation).toBe(second_current.navigation);
  });
});
