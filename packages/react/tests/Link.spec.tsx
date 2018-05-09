import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { Simulate } from "react-dom/test-utils";
import InMemory from "@hickory/in-memory";
import curi, { Response } from "@curi/core";
import activeInteraction from "@curi/route-active";
import Link from "../src/Link";
import CuriProvider from "../src/CuriProvider";

import { LocationDetails } from "@hickory/in-memory";

describe("<Link>", () => {
  let node;
  let history, router;
  const routes = [{ name: "Test", path: "" }];

  beforeEach(() => {
    node = document.createElement("div");
    history = InMemory();
    router = curi(history, routes);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  describe("anchor", () => {
    it("renders an <a> by default", () => {
      ReactDOM.render(
        <CuriProvider router={router}>
          {() => <Link to="Test">Test</Link>}
        </CuriProvider>,
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
        <CuriProvider router={router}>
          {() => (
            <Link anchor={StyledAnchor} to="Test">
              Test
            </Link>
          )}
        </CuriProvider>,
        node
      );
      const a = node.querySelector("a");
      expect(a).toBeDefined();
      expect(getComputedStyle(a).color).toBe("orange");
    });
  });

  describe("to", () => {
    it("sets the href attribute using the named route's path", () => {
      ReactDOM.render(
        <CuriProvider router={router}>
          {() => <Link to="Test">Test</Link>}
        </CuriProvider>,
        node
      );
      const a = node.querySelector("a");
      expect(a.getAttribute("href")).toBe("/");
    });

    it("uses the pathname from current response's location if 'to' is not provided", () => {
      const history = InMemory({
        locations: ["/the-initial-location"]
      });
      const router = curi(history, [{ name: "Catch All", path: "(.*)" }]);
      ReactDOM.render(
        <CuriProvider router={router}>
          {() => <Link to={null}>Test</Link>}
        </CuriProvider>,
        node
      );
      const a = node.querySelector("a");
      expect(a.getAttribute("href")).toBe("/the-initial-location");
    });
  });

  describe("params", () => {
    let history, router;
    const routes = [
      { name: "Park", path: "/park/:name" },
      { name: "Catch All", path: "(.*)" }
    ];

    beforeEach(() => {
      history = InMemory();
      router = curi(history, routes);
    });

    it("uses params to generate the href", () => {
      const params = { name: "Glacier" };
      ReactDOM.render(
        <CuriProvider router={router}>
          {() => (
            <Link to="Park" params={params}>
              Test
            </Link>
          )}
        </CuriProvider>,
        node
      );
      const a = node.querySelector("a");
      expect(a.getAttribute("href")).toBe("/park/Glacier");
    });

    it("updates href when props change", () => {
      const params = { name: "Glacier" };
      ReactDOM.render(
        <CuriProvider router={router}>
          {() => (
            <Link to="Park" params={params}>
              Test
            </Link>
          )}
        </CuriProvider>,
        node
      );
      let a = node.querySelector("a");
      expect(a.getAttribute("href")).toBe("/park/Glacier");

      const newParams = { name: "Yellowstone" };
      ReactDOM.render(
        <CuriProvider router={router}>
          {() => (
            <Link to="Park" params={newParams}>
              Test
            </Link>
          )}
        </CuriProvider>,
        node
      );
      a = node.querySelector("a");
      expect(a.getAttribute("href")).toBe("/park/Yellowstone");
    });
  });

  describe("hash & query", () => {
    it("merges hash & query props with the pathname when creating href", () => {
      const history = InMemory();
      const router = curi(history, [
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      ReactDOM.render(
        <CuriProvider router={router}>
          {() => (
            <Link to="Test" query="one=two" hash="hashtag">
              Test
            </Link>
          )}
        </CuriProvider>,
        node
      );
      const a = node.querySelector("a");
      expect(a.getAttribute("href")).toBe("/test?one=two#hashtag");
    });
  });

  describe("ref", () => {
    it("returns the anchor's ref, not the link's", () => {
      const history = InMemory();
      const router = curi(history, [
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const ref = React.createRef();
      ReactDOM.render(
        <CuriProvider router={router}>
          {() => (
            <Link to="Test" ref={ref}>
              Test
            </Link>
          )}
        </CuriProvider>,
        node
      );
      const a = node.querySelector("a");
      expect(a).toBe(ref.current);
    });
  });

  describe("clicking a link", () => {
    it("calls history.navigate", () => {
      const history = InMemory();
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;

      const router = curi(history, [{ name: "Test", path: "" }]);
      ReactDOM.render(
        <CuriProvider router={router}>
          {() => <Link to="Test">Test</Link>}
        </CuriProvider>,
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
      expect(mockNavigate.mock.calls.length).toBe(1);
    });

    it("includes hash, query, and state in location passed to history.navigate", () => {
      const history = InMemory();
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;

      const router = curi(history, [{ name: "Test", path: "" }]);
      ReactDOM.render(
        <CuriProvider router={router}>
          {() => (
            <Link to="Test" hash="thing" query="one=1" state="yo">
              Test
            </Link>
          )}
        </CuriProvider>,
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
      const mockLocation = mockNavigate.mock.calls[0][0];
      expect(mockLocation).toMatchObject({
        pathname: "/",
        hash: "thing",
        query: "one=1",
        state: "yo"
      });
    });

    describe("onClick", () => {
      it("calls onClick prop func if provided", () => {
        const history = InMemory();
        const mockNavigate = jest.fn();
        history.navigate = mockNavigate;
        const onClick = jest.fn();
        const router = curi(history, [{ name: "Test", path: "" }]);
        ReactDOM.render(
          <CuriProvider router={router}>
            {() => (
              <Link to="Test" onClick={onClick}>
                Test
              </Link>
            )}
          </CuriProvider>,
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
        expect(onClick.mock.calls.length).toBe(1);
        expect(mockNavigate.mock.calls.length).toBe(1);
      });

      it("does not call history.navigate if onClick prevents default", () => {
        const history = InMemory();
        const mockNavigate = jest.fn();
        history.navigate = mockNavigate;
        const onClick = jest.fn(event => {
          event.preventDefault();
        });
        const router = curi(history, [{ name: "Test", path: "" }]);
        ReactDOM.render(
          <CuriProvider router={router}>
            {() => (
              <Link to="Test" onClick={onClick}>
                Test
              </Link>
            )}
          </CuriProvider>,
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
        expect(onClick.mock.calls.length).toBe(1);
        expect(mockNavigate.mock.calls.length).toBe(0);
      });
    });

    it("doesn't call history.navigate for modified clicks", () => {
      const history = InMemory();
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;

      const router = curi(history, [{ name: "Test", path: "" }]);
      ReactDOM.render(
        <CuriProvider router={router}>
          {() => <Link to="Test">Test</Link>}
        </CuriProvider>,
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

      const router = curi(history, [{ name: "Test", path: "" }]);
      ReactDOM.render(
        <CuriProvider router={router}>
          {() => <Link to="Test">Test</Link>}
        </CuriProvider>,
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
