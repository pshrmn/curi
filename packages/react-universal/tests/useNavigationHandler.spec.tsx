import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { Simulate } from "react-dom/test-utils";
import InMemory from "@hickory/in-memory";
import { curi, prepareRoutes } from "@curi/router";

// @ts-ignore (resolved by jest)
import { curiProvider, useNavigationHandler } from "@curi/react-universal";

function createClick(opts?: {}) {
  return {
    defaultPrevented: false,
    preventDefault() {
      this.defaultPrevented = true;
    },
    metaKey: null,
    altKey: null,
    ctrlKey: null,
    shiftKey: null,
    button: 0,
    ...opts
  };
}

describe("useNavigationHandler", () => {
  let node;
  let history, router, Router: React.FunctionComponent;
  const routes = prepareRoutes([
    { name: "Test", path: "" },
    { name: "Best", path: "best" },
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

  describe("event handler", () => {
    it("it uses nav props (name, params, hash, query, and state) to generate nav location", () => {
      const history = InMemory();
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;
      const routes = prepareRoutes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(history, routes);
      const Router = curiProvider(router);

      function Link(props) {
        const { eventHandler } = useNavigationHandler(props);
        return (
          <a href="#" onClick={eventHandler}>
            {props.children}
          </a>
        );
      }

      ReactDOM.render(
        <Router>
          <Link name="Test" hash="thing" query="one=1" state="yo">
            Test
          </Link>
        </Router>,
        node
      );
      const a = node.querySelector("a");
      const leftClickEvent = createClick();
      Simulate.click(a, leftClickEvent);
      const mockLocation = mockNavigate.mock.calls[0][0];
      expect(mockLocation).toMatchObject({
        pathname: "/test",
        hash: "thing",
        query: "one=1",
        state: "yo"
      });
    });

    it("calls onNav prop func if provided", () => {
      const history = InMemory();
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;
      const onNav = jest.fn();
      const routes = prepareRoutes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(history, routes);
      const Router = curiProvider(router);

      function Link(props) {
        const { eventHandler } = useNavigationHandler(props);
        return (
          <a href="#" onClick={eventHandler}>
            {props.children}
          </a>
        );
      }

      ReactDOM.render(
        <Router>
          <Link name="Test" onNav={onNav}>
            Test
          </Link>
        </Router>,
        node
      );
      const a = node.querySelector("a");
      const leftClickEvent = createClick();
      Simulate.click(a, leftClickEvent);
      expect(onNav.mock.calls.length).toBe(1);
      expect(mockNavigate.mock.calls.length).toBe(1);
    });

    describe("canNavigate", () => {
      function canNavigate() {
        return false;
      }

      it("does not call history.navigate if canNavigate returns false", () => {
        const history = InMemory();
        const mockNavigate = jest.fn();
        history.navigate = mockNavigate;

        const routes = prepareRoutes([
          { name: "Test", path: "test" },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(history, routes);
        const Router = curiProvider(router);

        function Link(props) {
          const { eventHandler } = useNavigationHandler(props, canNavigate);
          return (
            <a href="#" onClick={eventHandler}>
              {props.children}
            </a>
          );
        }

        ReactDOM.render(
          <Router>
            <Link name="Test">Test</Link>
          </Router>,
          node
        );
        const a = node.querySelector("a");
        const leftClickEvent = createClick();

        Simulate.click(a, leftClickEvent);

        expect(mockNavigate.mock.calls.length).toBe(0);
      });
    });
  });
});
