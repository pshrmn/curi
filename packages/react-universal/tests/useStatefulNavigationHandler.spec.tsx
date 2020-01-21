import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { inMemory } from "@hickory/in-memory";
import { createRouter, prepareRoutes } from "@curi/router";

import { sleep } from "../../../utils/tests";

import {
  createRouterComponent,
  useURL,
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
      let mockNavigate = jest.fn();
      let routes = prepareRoutes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      let router = createRouter(inMemory, routes);
      router.history.navigate = mockNavigate;
      let Router = createRouterComponent(router);

      function AsyncLink(props) {
        let url = useURL(props);
        let { eventHandler, navigating } = useStatefulNavigationHandler({
          url,
          ...props
        });
        return (
          <a href="#" onClick={eventHandler}>
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
      let a = node.querySelector("a");
      let leftClickEvent = createClick();
      Simulate.click(a, leftClickEvent);
      let mockURL = mockNavigate.mock.calls[0][0];
      expect(mockURL).toMatchObject({
        url: "/test?one=1#thing",
        state: "yo"
      });
    });

    it("calls onNav prop func if provided", () => {
      let mockNavigate = jest.fn();
      let onNav = jest.fn();
      let routes = prepareRoutes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      let router = createRouter(inMemory, routes);
      router.history.navigate = mockNavigate;
      let Router = createRouterComponent(router);

      function AsyncLink(props) {
        let url = useURL(props);
        let { eventHandler, navigating } = useStatefulNavigationHandler({
          url,
          ...props
        });
        return (
          <a href="#" onClick={eventHandler}>
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
      let a = node.querySelector("a");
      let leftClickEvent = createClick();
      Simulate.click(a, leftClickEvent);
      expect(onNav.mock.calls.length).toBe(1);
      expect(mockNavigate.mock.calls.length).toBe(1);
    });

    describe("canNavigate", () => {
      function canNavigate() {
        return false;
      }

      it("does not call history.navigate if canNavigate returns false", () => {
        let mockNavigate = jest.fn();
        let routes = prepareRoutes([
          { name: "Test", path: "test" },
          { name: "Catch All", path: "(.*)" }
        ]);
        let router = createRouter(inMemory, routes);
        router.history.navigate = mockNavigate;
        let Router = createRouterComponent(router);

        function AsyncLink(props) {
          let url = useURL(props);
          let { eventHandler, navigating } = useStatefulNavigationHandler({
            url,
            canNavigate,
            ...props
          });
          return (
            <a href="#" onClick={eventHandler}>
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
        let a = node.querySelector("a");
        let leftClickEvent = createClick();

        Simulate.click(a, leftClickEvent);

        expect(mockNavigate.mock.calls.length).toBe(0);
      });
    });
  });

  describe("navigating", () => {
    it("is false on initial render", () => {
      let routes = prepareRoutes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      let router = createRouter(inMemory, routes);
      let Router = createRouterComponent(router);

      function AsyncLink(props) {
        let url = useURL(props);
        let { eventHandler, navigating } = useStatefulNavigationHandler({
          url,
          ...props
        });
        expect(navigating).toBe(false);
        return (
          <a href="#" onClick={eventHandler}>
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
      let routes = prepareRoutes([
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
      let router = createRouter(inMemory, routes);
      let Router = createRouterComponent(router);

      function AsyncLink(props) {
        let { eventHandler, navigating } = useStatefulNavigationHandler({
          url: "/slow",
          ...props
        });
        return <a onClick={eventHandler}>{props.children(navigating)}</a>;
      }

      ReactDOM.render(
        <Router>
          <AsyncLink name="Slow">
            {navigating => navigating.toString()}
          </AsyncLink>
        </Router>,
        node
      );

      let a = node.querySelector("a");

      expect(a.textContent).toBe("false");

      let leftClickEvent = createClick();
      Simulate.click(a, leftClickEvent);

      expect(a.textContent).toBe("true");
    });

    it("is false when navigation finishes", async () => {
      let routes = prepareRoutes([
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
      let router = createRouter(inMemory, routes);
      let Router = createRouterComponent(router);

      function AsyncLink(props) {
        let { eventHandler, navigating } = useStatefulNavigationHandler({
          url: "/slow",
          ...props
        });
        return <a onClick={eventHandler}>{props.children(navigating)}</a>;
      }

      ReactDOM.render(
        <Router>
          <AsyncLink name="Slow">
            {navigating => navigating.toString()}
          </AsyncLink>
        </Router>,
        node
      );

      let a = node.querySelector("a");

      expect(a.textContent).toBe("false");

      let leftClickEvent = createClick();
      Simulate.click(a, leftClickEvent);

      expect(a.textContent).toBe("true");

      await act(async () => {
        await sleep(100);
      });

      expect(a.textContent).toBe("false");
    });
  });
});
