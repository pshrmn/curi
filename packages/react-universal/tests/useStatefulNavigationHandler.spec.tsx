import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { Simulate } from "react-dom/test-utils";
import { InMemory } from "@hickory/in-memory";
import { curi, prepareRoutes } from "@curi/router";

import wait from "./utils/wait";

// @ts-ignore (resolved by jest)
import {
  curiProvider,
  useStatefulNavigationHandler
} from "@curi/react-universal";

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

describe("useStatefulNavigationHandler", () => {
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

      function NavLink(props) {
        const { eventHandler, navigating } = useStatefulNavigationHandler(
          props
        );
        return (
          <a href="#" onClick={eventHandler}>
            {props.children(navigating)}
          </a>
        );
      }

      ReactDOM.render(
        <Router>
          <NavLink name="Test" hash="thing" query="one=1" state="yo">
            {() => null}
          </NavLink>
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

      function NavLink(props) {
        const { eventHandler, navigating } = useStatefulNavigationHandler(
          props
        );
        return (
          <a href="#" onClick={eventHandler}>
            {props.children(navigating)}
          </a>
        );
      }

      ReactDOM.render(
        <Router>
          <NavLink name="Test" onNav={onNav}>
            {() => null}
          </NavLink>
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

        function NavLink(props) {
          const { eventHandler, navigating } = useStatefulNavigationHandler(
            props,
            canNavigate
          );
          return (
            <a href="#" onClick={eventHandler}>
              {props.children(navigating)}
            </a>
          );
        }

        ReactDOM.render(
          <Router>
            <NavLink name="Test">{() => null}</NavLink>
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

  describe("navigating", () => {
    it("is false on initial render", () => {
      const history = InMemory();

      const routes = prepareRoutes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(history, routes);
      const Router = curiProvider(router);

      function NavLink(props) {
        const { eventHandler, navigating } = useStatefulNavigationHandler(
          props
        );
        expect(navigating).toBe(false);
        return (
          <a href="#" onClick={eventHandler}>
            {props.children(navigating)}
          </a>
        );
      }

      ReactDOM.render(
        <Router>
          <NavLink name="Test">{navigating => navigating.toString()}</NavLink>
        </Router>,
        node
      );
    });

    it("is true when navigation starts", () => {
      const history = InMemory();

      const routes = prepareRoutes([
        { name: "Test", path: "test" },
        {
          name: "Slow",
          path: "slow",
          resolve() {
            // takes 100ms to resolve
            return new Promise(resolve => {
              setTimeout(() => {
                resolve("slow");
              }, 100);
            });
          }
        },
        {
          name: "Fast",
          path: "fast"
        },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(history, routes);
      const Router = curiProvider(router);

      function NavLink(props) {
        const { eventHandler, navigating } = useStatefulNavigationHandler(
          props
        );
        return <a onClick={eventHandler}>{props.children(navigating)}</a>;
      }

      ReactDOM.render(
        <Router>
          <NavLink name="Slow">{navigating => navigating.toString()}</NavLink>
        </Router>,
        node
      );

      const a = node.querySelector("a");

      expect(a.textContent).toBe("false");

      const leftClickEvent = createClick();
      Simulate.click(a, leftClickEvent);

      expect(a.textContent).toBe("true");
    });

    it("is false when navigation finishes", async () => {
      const history = InMemory();

      const routes = prepareRoutes([
        { name: "Test", path: "test" },
        {
          name: "Slow",
          path: "slow",
          resolve() {
            // takes 50ms to resolve
            return new Promise(resolve => {
              setTimeout(() => {
                resolve("slow");
              }, 50);
            });
          }
        },
        {
          name: "Fast",
          path: "fast"
        },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(history, routes);
      const Router = curiProvider(router);

      function NavLink(props) {
        const { eventHandler, navigating } = useStatefulNavigationHandler(
          props
        );
        return <a onClick={eventHandler}>{props.children(navigating)}</a>;
      }

      ReactDOM.render(
        <Router>
          <NavLink name="Slow">{navigating => navigating.toString()}</NavLink>
        </Router>,
        node
      );

      const a = node.querySelector("a");

      expect(a.textContent).toBe("false");

      const leftClickEvent = createClick();
      Simulate.click(a, leftClickEvent);

      expect(a.textContent).toBe("true");

      await wait(100);

      expect(a.textContent).toBe("false");
    });
  });
});
