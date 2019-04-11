import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { in_memory } from "@hickory/in-memory";
import { create_router, prepare_routes } from "@curi/router";

import {
  create_router_component,
  useRouter,
  useResponse
} from "@curi/react-universal";

describe("useRouter", () => {
  let node;
  let router, Router;
  const routes = prepare_routes([
    { name: "Home", path: "" },
    { name: "About", path: "about" },
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

  it("provides access to the router object", () => {
    function App() {
      const context_router = useRouter();
      expect(context_router).toBe(router);
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
    const Test = jest.fn(() => {
      const context_router = useRouter();
      return null;
    });

    const Pure = () => {
      return <Test />;
    };

    const Memoized = React.memo(Pure);

    const App = jest.fn(() => {
      const { response } = useResponse();
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
      router.navigate({ name: "About" });
    });

    expect(Test.mock.calls.length).toBe(1);
    expect(App.mock.calls.length).toBe(2);
  });
});
