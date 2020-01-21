import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { Simulate } from "react-dom/test-utils";
import { inMemory } from "@hickory/in-memory";
import { createRouter, prepareRoutes } from "@curi/router";

import {
  useURL,
  createRouterComponent,
  useNavigationHandler
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

describe("useNavigationHandler", () => {
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

      function Link(props) {
        let url = useURL(props);
        let { eventHandler } = useNavigationHandler({ url, ...props });
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

      function Link(props) {
        let url = useURL(props);
        let { eventHandler } = useNavigationHandler({ url, ...props });
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

        function Link(props) {
          let url = useURL(props);
          let { eventHandler } = useNavigationHandler({
            url,
            canNavigate,
            ...props
          });
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
        let a = node.querySelector("a");
        let leftClickEvent = createClick();

        Simulate.click(a, leftClickEvent);

        expect(mockNavigate.mock.calls.length).toBe(0);
      });
    });
  });
});
