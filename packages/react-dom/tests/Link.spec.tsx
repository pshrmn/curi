import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { Simulate } from "react-dom/test-utils";
import InMemory from "@hickory/in-memory";
import { curi, prepareRoutes } from "@curi/router";

// @ts-ignore (resolved by jest)
import { curiProvider, Link } from "@curi/react-dom";

describe("<Link>", () => {
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
        const history = InMemory({
          locations: ["/the-initial-location"]
        });
        const routes = prepareRoutes([{ name: "Catch All", path: "(.*)" }]);
        const router = curi(history, routes);
        const Router = curiProvider(router);
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
      let history, router, Router;
      const routes = prepareRoutes([
        { name: "Park", path: "park/:name" },
        { name: "Catch All", path: "(.*)" }
      ]);

      beforeEach(() => {
        history = InMemory();
        router = curi(history, routes);
        Router = curiProvider(router);
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

        const newParams = { name: "Yellowstone" };
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
        const history = InMemory();
        const routes = prepareRoutes([
          { name: "Test", path: "test" },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(history, routes);
        const Router = curiProvider(router);
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
      const history = InMemory();
      const routes = prepareRoutes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(history, routes);
      const Router = curiProvider(router);
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
      const history = InMemory();
      const routes = prepareRoutes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(history, routes);
      const Router = curiProvider(router);
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
        const history = InMemory();
        const mockNavigate = jest.fn();
        history.navigate = mockNavigate;
        const onNav = jest.fn(event => {
          event.preventDefault();
        });
        const routes = prepareRoutes([
          { name: "Test", path: "test" },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(history, routes);
        const Router = curiProvider(router);

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
      const history = InMemory();
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;

      const routes = prepareRoutes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(history, routes);
      const Router = curiProvider(router);

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
      const history = InMemory();
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;

      const routes = prepareRoutes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(history, routes);
      const Router = curiProvider(router);

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
      Simulate.click(a, preventedEvent);
      expect(mockNavigate.mock.calls.length).toBe(0);
    });
  });
});
