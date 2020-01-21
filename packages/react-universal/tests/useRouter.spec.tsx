import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { inMemory } from "@hickory/in-memory";
import { createRouter, prepareRoutes } from "@curi/router";

import {
  createRouterComponent,
  useRouter,
  useResponse
} from "@curi/react-universal";

describe("useRouter", () => {
  let node;
  let router, Router;
  let routes = prepareRoutes([
    { name: "Home", path: "" },
    { name: "About", path: "about" },
    { name: "Catch All", path: "(.*)" }
  ]);

  beforeEach(() => {
    node = document.createElement("div");
    router = createRouter(inMemory, routes);
    Router = createRouterComponent(router);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  it("provides access to the router object", () => {
    function App() {
      let contextRouter = useRouter();
      expect(contextRouter).toBe(router);
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

  it("does not need to re-render when there is a new response", () => {
    let Test = jest.fn(() => {
      let contextRouter = useRouter();
      return null;
    });

    let Pure = () => {
      return <Test />;
    };

    let Memoized = React.memo(Pure);

    let App = jest.fn(() => {
      let { response } = useResponse();
      return (
        <React.Fragment>
          <div>{response.name}</div>
          <Memoized />
        </React.Fragment>
      );
    });

    act(() => {
      ReactDOM.render(
        <Router>
          {/*
          //@ts-ignore */}
          <App />
        </Router>,
        node
      );
    });

    expect(Test.mock.calls.length).toBe(1);
    expect(App.mock.calls.length).toBe(1);

    act(() => {
      let url = router.url({ name: "About" });
      router.navigate({ url });
    });

    expect(Test.mock.calls.length).toBe(1);
    expect(App.mock.calls.length).toBe(2);
  });
});
