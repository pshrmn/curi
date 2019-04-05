import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { in_memory } from "@hickory/in-memory";
import { create_router, prepare_routes } from "@curi/router";

import { sleep } from "../../../utils/tests";

import {
  create_router_component,
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

  beforeEach(() => {
    node = document.createElement("div");
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  describe("event handler", () => {
    it("it uses nav props (name, params, hash, query, and state) to generate nav location", () => {
      const mockNavigate = jest.fn();
      const routes = prepare_routes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = create_router(in_memory, routes);
      router.history.navigate = mockNavigate;
      const Router = create_router_component(router);

      function AsyncLink(props) {
        const { event_handler, navigating } = useStatefulNavigationHandler(
          props
        );
        return (
          <a href="#" onClick={event_handler}>
            {props.children(navigating)}
          </a>
        );
      }

      ReactDOM.render(
        <Router>
          <AsyncLink name="Test" hash="thing" query="one=1" state="yo">
            {() => null}
          </AsyncLink>
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
      const mockNavigate = jest.fn();
      const onNav = jest.fn();
      const routes = prepare_routes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = create_router(in_memory, routes);
      router.history.navigate = mockNavigate;
      const Router = create_router_component(router);

      function AsyncLink(props) {
        const { event_handler, navigating } = useStatefulNavigationHandler(
          props
        );
        return (
          <a href="#" onClick={event_handler}>
            {props.children(navigating)}
          </a>
        );
      }

      ReactDOM.render(
        <Router>
          <AsyncLink name="Test" onNav={onNav}>
            {() => null}
          </AsyncLink>
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
        const mockNavigate = jest.fn();
        const routes = prepare_routes([
          { name: "Test", path: "test" },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = create_router(in_memory, routes);
        router.history.navigate = mockNavigate;
        const Router = create_router_component(router);

        function AsyncLink(props) {
          const { event_handler, navigating } = useStatefulNavigationHandler(
            props,
            canNavigate
          );
          return (
            <a href="#" onClick={event_handler}>
              {props.children(navigating)}
            </a>
          );
        }

        ReactDOM.render(
          <Router>
            <AsyncLink name="Test">{() => null}</AsyncLink>
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
      const routes = prepare_routes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = create_router(in_memory, routes);
      const Router = create_router_component(router);

      function AsyncLink(props) {
        const { event_handler, navigating } = useStatefulNavigationHandler(
          props
        );
        expect(navigating).toBe(false);
        return (
          <a href="#" onClick={event_handler}>
            {props.children(navigating)}
          </a>
        );
      }

      ReactDOM.render(
        <Router>
          <AsyncLink name="Test">
            {navigating => navigating.toString()}
          </AsyncLink>
        </Router>,
        node
      );
    });

    it("is true when navigation starts", () => {
      const routes = prepare_routes([
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
      const router = create_router(in_memory, routes);
      const Router = create_router_component(router);

      function AsyncLink(props) {
        const { event_handler, navigating } = useStatefulNavigationHandler(
          props
        );
        return <a onClick={event_handler}>{props.children(navigating)}</a>;
      }

      ReactDOM.render(
        <Router>
          <AsyncLink name="Slow">
            {navigating => navigating.toString()}
          </AsyncLink>
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
      const routes = prepare_routes([
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
      const router = create_router(in_memory, routes);
      const Router = create_router_component(router);

      function AsyncLink(props) {
        const { event_handler, navigating } = useStatefulNavigationHandler(
          props
        );
        return <a onClick={event_handler}>{props.children(navigating)}</a>;
      }

      ReactDOM.render(
        <Router>
          <AsyncLink name="Slow">
            {navigating => navigating.toString()}
          </AsyncLink>
        </Router>,
        node
      );

      const a = node.querySelector("a");

      expect(a.textContent).toBe("false");

      const leftClickEvent = createClick();
      Simulate.click(a, leftClickEvent);

      expect(a.textContent).toBe("true");

      await act(async () => {
        await sleep(100);
      });

      expect(a.textContent).toBe("false");
    });
  });
});
