import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { inMemory } from "@hickory/in-memory";
import { createRouter, prepareRoutes } from "@curi/router";

import { createRouterComponent, useResponse } from "@curi/react-universal";

describe("useResponse", () => {
  let node;
  const routes = prepareRoutes({
    routes: [
      { name: "Home", path: "" },
      { name: "About", path: "about" },
      { name: "Catch All", path: "(.*)" }
    ]
  });

  beforeEach(() => {
    node = document.createElement("div");
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  it("returns response, and navigation objects", () => {
    const router = createRouter(inMemory, routes);
    const Router = createRouterComponent(router);
    const { response, navigation } = router.current();
    function App() {
      const result = useResponse();
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
    const router = createRouter(inMemory, routes);
    const Router = createRouterComponent(router);
    let fromContext;
    function App() {
      fromContext = useResponse();
      return <div>{fromContext.response.name}</div>;
    }

    act(() => {
      ReactDOM.render(
        <Router>
          <App />
        </Router>,
        node
      );
    });

    const first = router.current();
    expect(fromContext.response).toBe(first.response);
    expect(fromContext.navigation).toBe(first.navigation);

    act(() => {
      const url = router.url({ name: "About" });
      router.navigate({ url });
    });

    const second = router.current();
    expect(fromContext.response).toBe(second.response);
    expect(fromContext.navigation).toBe(second.navigation);
  });
});
