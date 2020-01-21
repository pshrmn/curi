import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { inMemory } from "@hickory/in-memory";
import { createRouter, prepareRoutes } from "@curi/router";

import { createRouterComponent, Link } from "@curi/react-dom";

describe("<Link>", () => {
  let node;
  let router, Router: React.FunctionComponent;
  let routes = prepareRoutes([
    { name: "Test", path: "" },
    { name: "Best", path: "best" },
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

  describe("anchor", () => {
    it("renders an <a> by default", () => {
      ReactDOM.render(
        <Router>
          <Link name="Test">Test</Link>}
        </Router>,
        node
      );
      let a = node.querySelector("a");
      expect(a).toBeDefined();
    });

    it("renders the provided component instead of an anchor", () => {
      let StyledAnchor = props => <a style={{ color: "orange" }} {...props} />;
      ReactDOM.render(
        <Router>
          <Link anchor={StyledAnchor} name="Test">
            Test
          </Link>
        </Router>,
        node
      );
      let a = node.querySelector("a");
      expect(a).toBeDefined();
      expect(getComputedStyle(a).color).toBe("orange");
    });
  });

  describe("href", () => {
    describe("name", () => {
      it("sets the href attribute using the named route's path", () => {
        ReactDOM.render(
          <Router>
            <Link name="Test">Test</Link>}
          </Router>,
          node
        );
        let a = node.querySelector("a");
        expect(a.getAttribute("href")).toBe("/");
      });

      it("has no pathname component if name is not provided", () => {
        let routes = prepareRoutes([{ name: "Catch All", path: "(.*)" }]);
        let router = createRouter(inMemory, routes, {
          history: {
            locations: [{ url: "/the-initial-location" }]
          }
        });
        let Router = createRouterComponent(router);
        ReactDOM.render(
          <Router>
            <Link hash="test">Test</Link>
          </Router>,
          node
        );
        let a = node.querySelector("a");
        expect(a.getAttribute("href")).toBe("#test");
      });
    });

    describe("params", () => {
      let router, Router;
      let routes = prepareRoutes([
        { name: "Park", path: "park/:name" },
        { name: "Catch All", path: "(.*)" }
      ]);

      beforeEach(() => {
        router = createRouter(inMemory, routes);
        Router = createRouterComponent(router);
      });

      it("uses params to generate the href", () => {
        let params = { name: "Glacier" };
        ReactDOM.render(
          <Router>
            <Link name="Park" params={params}>
              Test
            </Link>
          </Router>,
          node
        );
        let a = node.querySelector("a");
        expect(a.getAttribute("href")).toBe("/park/Glacier");
      });

      it("updates href when props change", () => {
        let params = { name: "Glacier" };
        ReactDOM.render(
          <Router>
            <Link name="Park" params={params}>
              Test
            </Link>
          </Router>,
          node
        );
        let a = node.querySelector("a");
        expect(a.getAttribute("href")).toBe("/park/Glacier");

        let newParams = { name: "Yellowstone" };
        ReactDOM.render(
          <Router>
            <Link name="Park" params={newParams}>
              Test
            </Link>
          </Router>,
          node
        );
        a = node.querySelector("a");
        expect(a.getAttribute("href")).toBe("/park/Yellowstone");
      });
    });

    describe("hash & query", () => {
      it("merges hash & query props with the pathname when creating href", () => {
        let routes = prepareRoutes([
          { name: "Test", path: "test" },
          { name: "Catch All", path: "(.*)" }
        ]);
        let router = createRouter(inMemory, routes);
        let Router = createRouterComponent(router);
        ReactDOM.render(
          <Router>
            <Link name="Test" query="one=two" hash="hashtag">
              Test
            </Link>
          </Router>,
          node
        );
        let a = node.querySelector("a");
        expect(a.getAttribute("href")).toBe("/test?one=two#hashtag");
      });
    });
  });

  describe("additional props", () => {
    it("passes additional props to the rendered anchor", () => {
      ReactDOM.render(
        <Router>
          <Link name="Test" className="hi">
            Test
          </Link>
        </Router>,
        node
      );

      let a = node.querySelector("a");
      expect(a.classList.contains("hi")).toBe(true);
    });

    it('does not overwrite "native" props set on the rendered element', () => {
      ReactDOM.render(
        <Router>
          <Link name="Test" href="/oh-no">
            Test
          </Link>
        </Router>,
        node
      );

      let a = node.querySelector("a");
      expect(a.getAttribute("href")).toBe("/");
    });
  });

  describe("ref", () => {
    it("returns the anchor's ref, not the link's", () => {
      let routes = prepareRoutes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      let router = createRouter(inMemory, routes);
      let Router = createRouterComponent(router);
      let ref = React.createRef();
      ReactDOM.render(
        <Router>
          <Link name="Test" ref={ref}>
            Test
          </Link>
        </Router>,
        node
      );
      let a = node.querySelector("a");
      expect(a).toBe(ref.current);
    });
  });

  describe("children", () => {
    it("renders the provided children", () => {
      let routes = prepareRoutes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      let router = createRouter(inMemory, routes);
      let Router = createRouterComponent(router);
      let children = "Test Value";
      ReactDOM.render(
        <Router>
          <Link name="Test">{children}</Link>
        </Router>,
        node
      );
      let a = node.querySelector("a");
      expect(a.textContent).toBe(children);
    });
  });

  describe("clicking a link", () => {
    describe("onNav", () => {
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

        ReactDOM.render(
          <Router>
            <Link name="Test" onNav={onNav}>
              Test
            </Link>
          </Router>,
          node
        );
        let a = node.querySelector("a");
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
        Simulate.click(a, leftClickEvent);
        expect(onNav.mock.calls.length).toBe(1);
        expect(mockNavigate.mock.calls.length).toBe(1);
      });

      it("does not call history.navigate if onNav prevents default", () => {
        let mockNavigate = jest.fn();
        let onNav = jest.fn(event => {
          event.preventDefault();
        });
        let routes = prepareRoutes([
          { name: "Test", path: "test" },
          { name: "Catch All", path: "(.*)" }
        ]);
        let router = createRouter(inMemory, routes);
        router.history.navigate = mockNavigate;
        let Router = createRouterComponent(router);

        ReactDOM.render(
          <Router>
            <Link name="Test" onNav={onNav}>
              Test
            </Link>
          </Router>,
          node
        );
        let a = node.querySelector("a");
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
        Simulate.click(a, leftClickEvent);
        expect(onNav.mock.calls.length).toBe(1);
        expect(mockNavigate.mock.calls.length).toBe(0);
      });
    });

    it("doesn't call history.navigate for modified clicks", () => {
      let mockNavigate = jest.fn();
      let routes = prepareRoutes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      let router = createRouter(inMemory, routes);
      router.history.navigate = mockNavigate;
      let Router = createRouterComponent(router);

      ReactDOM.render(
        <Router>
          <Link name="Test">Test</Link>
        </Router>,
        node
      );
      let a = node.querySelector("a");
      let modifiedClickEvent = {
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
      let modifiers = ["metaKey", "altKey", "ctrlKey", "shiftKey"];
      modifiers.forEach(m => {
        let eventCopy = Object.assign({}, modifiedClickEvent);
        eventCopy[m] = true;
        Simulate.click(a, eventCopy);
        expect(mockNavigate.mock.calls.length).toBe(0);
      });
    });

    it("doesn't call history.navigate if event.preventDefault has been called", () => {
      let mockNavigate = jest.fn();
      let routes = prepareRoutes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      let router = createRouter(inMemory, routes);
      router.history.navigate = mockNavigate;
      let Router = createRouterComponent(router);

      ReactDOM.render(
        <Router>
          <Link name="Test">Test</Link>
        </Router>,
        node
      );
      let a = node.querySelector("a");
      let preventedEvent = {
        defaultPrevented: true,
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
        Simulate.click(a, preventedEvent);
      });
      expect(mockNavigate.mock.calls.length).toBe(0);
    });

    describe("target", () => {
      it("calls history.navigate if target is not defined", () => {
        let mockNavigate = jest.fn();
        let routes = prepareRoutes([
          { name: "Test", path: "test" },
          { name: "Catch All", path: "(.*)" }
        ]);
        let router = createRouter(inMemory, routes);
        router.history.navigate = mockNavigate;
        let Router = createRouterComponent(router);

        ReactDOM.render(
          <Router>
            <Link name="Test">Test</Link>
          </Router>,
          node
        );
        let a = node.querySelector("a");
        let event = {
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
          Simulate.click(a, event);
        });
        expect(mockNavigate.mock.calls.length).toBe(1);
      });

      it("doesn't call history.navigate if target is defined", () => {
        let mockNavigate = jest.fn();
        let routes = prepareRoutes([
          { name: "Test", path: "test" },
          { name: "Catch All", path: "(.*)" }
        ]);
        let router = createRouter(inMemory, routes);
        router.history.navigate = mockNavigate;
        let Router = createRouterComponent(router);

        ReactDOM.render(
          <Router>
            <Link name="Test" target="_blank">
              Test
            </Link>
          </Router>,
          node
        );
        let a = node.querySelector("a");
        let event = {
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
          Simulate.click(a, event);
        });
        expect(mockNavigate.mock.calls.length).toBe(0);
      });
    });
  });
});
