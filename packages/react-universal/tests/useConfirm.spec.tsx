import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { inMemory } from "@hickory/in-memory";
import { createRouter, prepareRoutes } from "@curi/router";

import { createRouterComponent, useConfirm } from "@curi/react-universal";

describe("useConfirm", () => {
  let node;
  let routes = prepareRoutes([
    { name: "Home", path: "" },
    {
      name: "Contact",
      path: "contact",
      children: [{ name: "Method", path: ":method" }]
    }
  ]);

  beforeEach(() => {
    node = document.createElement("div");
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  it("sets a confirmation function that will be called upon navigation", () => {
    let router = createRouter(inMemory, routes);
    let Router = createRouterComponent(router);

    let confirmation = jest.fn();

    function Confirmation() {
      useConfirm(confirmation);
      return null;
    }

    act(() => {
      ReactDOM.render(
        <Router>
          <Confirmation />
        </Router>,
        node
      );
    });

    expect(confirmation.mock.calls.length).toBe(0);

    router.navigate({ url: "/contact" });

    expect(confirmation.mock.calls.length).toBe(1);
  });

  it("stops calling confirmation function after useConfirm is called with no function", () => {
    let router = createRouter(inMemory, routes);
    let Router = createRouterComponent(router);

    let confirmation = jest.fn();

    function Confirmation() {
      let [confirm, setConfirm] = React.useState(() => confirmation);
      useConfirm(confirm);

      return (
        <button
          onClick={() => {
            setConfirm(undefined);
          }}
        >
          Remove confirm
        </button>
      );
    }

    act(() => {
      ReactDOM.render(
        <Router>
          <Confirmation />
        </Router>,
        node
      );
    });

    expect(confirmation.mock.calls.length).toBe(0);

    act(() => {
      router.navigate({ url: "/contact" });
    });

    expect(confirmation.mock.calls.length).toBe(1);

    let button = node.querySelector("button");
    let leftClickEvent = {
      defaultPrevented: false,
      preventDefault() {
        this.defaultPrevented = true;
      },
      metaKey: null,
      altKey: null,
      ctrlKey: null,
      shiftKey: null,
      button: 0
    };

    act(() => {
      Simulate.click(button, leftClickEvent);
    });

    act(() => {
      router.navigate({ url: "/" });
    });

    expect(confirmation.mock.calls.length).toBe(1);
  });

  it("stops calling confirmation function if useConfirm unmounts", () => {
    let router = createRouter(inMemory, routes);
    let Router = createRouterComponent(router);

    let confirmation = jest.fn();

    function Confirmation() {
      useConfirm(confirmation);
      return null;
    }

    act(() => {
      ReactDOM.render(
        <Router>
          <Confirmation />
        </Router>,
        node
      );
    });

    expect(confirmation.mock.calls.length).toBe(0);

    act(() => {
      router.navigate({ url: "/contact" });
    });

    expect(confirmation.mock.calls.length).toBe(1);

    ReactDOM.render(
      <Router>
        <div />
      </Router>,
      node
    );

    act(() => {
      router.navigate({ url: "/" });
    });

    expect(confirmation.mock.calls.length).toBe(1);
  });
});
