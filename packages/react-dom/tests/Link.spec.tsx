import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { in_memory } from "@hickory/in-memory";
import { create_router, prepare_routes } from "@curi/router";

import { create_router_component, Link } from "@curi/react-dom";

describe("<Link>", () => {
  let node;
  let router, Router: React.FunctionComponent;
  const routes = prepare_routes([
    { name: "Test", path: "" },
    { name: "Best", path: "best" },
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

  describe("anchor", () => {
    it("renders an <a> by default", () => {
      ReactDOM.render(
        <Router>
          <Link name="Test">Test</Link>}
        </Router>,
        node
      );
      const a = node.querySelector("a");
      expect(a).toBeDefined();
    });

    it("renders the provided component instead of an anchor", () => {
      const StyledAnchor = props => (
        <a style={{ color: "orange" }} {...props} />
      );
      ReactDOM.render(
        <Router>
          <Link anchor={StyledAnchor} name="Test">
            Test
          </Link>
        </Router>,
        node
      );
      const a = node.querySelector("a");
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
        const a = node.querySelector("a");
        expect(a.getAttribute("href")).toBe("/");
      });

      it("creates a relative link if 'name' is undefined", () => {
        const routes = prepare_routes([{ name: "Catch All", path: "(.*)" }]);
        const router = create_router(in_memory, routes, {
          history: {
            locations: ["/the-initial-location"]
          }
        });
        const Router = create_router_component(router);
        ReactDOM.render(
          <Router>
            <Link name={null}>Test</Link>
          </Router>,
          node
        );
        const a = node.querySelector("a");
        expect(a.getAttribute("href")).toBe("");
      });
    });

    describe("params", () => {
      let router, Router;
      const routes = prepare_routes([
        { name: "Park", path: "park/:name" },
        { name: "Catch All", path: "(.*)" }
      ]);

      beforeEach(() => {
        router = create_router(in_memory, routes);
        Router = create_router_component(router);
      });

      it("uses params to generate the href", () => {
        const params = { name: "Glacier" };
        ReactDOM.render(
          <Router>
            <Link name="Park" params={params}>
              Test
            </Link>
          </Router>,
          node
        );
        const a = node.querySelector("a");
        expect(a.getAttribute("href")).toBe("/park/Glacier");
      });

      it("updates href when props change", () => {
        const params = { name: "Glacier" };
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

        const new_params = { name: "Yellowstone" };
        ReactDOM.render(
          <Router>
            <Link name="Park" params={new_params}>
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
        const routes = prepare_routes([
          { name: "Test", path: "test" },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = create_router(in_memory, routes);
        const Router = create_router_component(router);
        ReactDOM.render(
          <Router>
            <Link name="Test" query="one=two" hash="hashtag">
              Test
            </Link>
          </Router>,
          node
        );
        const a = node.querySelector("a");
        expect(a.getAttribute("href")).toBe("/test?one=two#hashtag");
      });
    });
  });

  describe("forward", () => {
    it("passes forward to the rendered anchor", () => {
      ReactDOM.render(
        <Router>
          <Link name="Test" forward={{ className: "hi" }}>
            Test
          </Link>
        </Router>,
        node
      );

      const a = node.querySelector("a");
      expect(a.classList.contains("hi")).toBe(true);
    });
  });

  describe("ref", () => {
    it("returns the anchor's ref, not the link's", () => {
      const routes = prepare_routes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = create_router(in_memory, routes);
      const Router = create_router_component(router);
      const ref = React.createRef();
      ReactDOM.render(
        <Router>
          <Link name="Test" ref={ref}>
            Test
          </Link>
        </Router>,
        node
      );
      const a = node.querySelector("a");
      expect(a).toBe(ref.current);
    });
  });

  describe("children", () => {
    it("renders the provided children", () => {
      const routes = prepare_routes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = create_router(in_memory, routes);
      const Router = create_router_component(router);
      const children = "Test Value";
      ReactDOM.render(
        <Router>
          <Link name="Test">{children}</Link>
        </Router>,
        node
      );
      const a = node.querySelector("a");
      expect(a.textContent).toBe(children);
    });
  });

  describe("clicking a link", () => {
    describe("onNav", () => {
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

        ReactDOM.render(
          <Router>
            <Link name="Test" onNav={onNav}>
              Test
            </Link>
          </Router>,
          node
        );
        const a = node.querySelector("a");
        const leftClickEvent = {
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
        const mockNavigate = jest.fn();
        const onNav = jest.fn(event => {
          event.preventDefault();
        });
        const routes = prepare_routes([
          { name: "Test", path: "test" },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = create_router(in_memory, routes);
        router.history.navigate = mockNavigate;
        const Router = create_router_component(router);

        ReactDOM.render(
          <Router>
            <Link name="Test" onNav={onNav}>
              Test
            </Link>
          </Router>,
          node
        );
        const a = node.querySelector("a");
        const leftClickEvent = {
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
      const mockNavigate = jest.fn();
      const routes = prepare_routes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = create_router(in_memory, routes);
      router.history.navigate = mockNavigate;
      const Router = create_router_component(router);

      ReactDOM.render(
        <Router>
          <Link name="Test">Test</Link>
        </Router>,
        node
      );
      const a = node.querySelector("a");
      const modifiedClickEvent = {
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
      const modifiers = ["metaKey", "altKey", "ctrlKey", "shiftKey"];
      modifiers.forEach(m => {
        const eventCopy = Object.assign({}, modifiedClickEvent);
        eventCopy[m] = true;
        Simulate.click(a, eventCopy);
        expect(mockNavigate.mock.calls.length).toBe(0);
      });
    });

    it("doesn't call history.navigate if event.preventDefault has been called", () => {
      const mockNavigate = jest.fn();
      const routes = prepare_routes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = create_router(in_memory, routes);
      router.history.navigate = mockNavigate;
      const Router = create_router_component(router);

      ReactDOM.render(
        <Router>
          <Link name="Test">Test</Link>
        </Router>,
        node
      );
      const a = node.querySelector("a");
      const preventedEvent = {
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
  });
});
