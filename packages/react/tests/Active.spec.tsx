import "jest";
import React from "react";
import ReactDOM from "react-dom";
import InMemory from "@hickory/in-memory";
import curi from "@curi/core";
import activeInteraction from "@curi/route-active";

import CuriProvider from "../src/CuriProvider";
import Active from "../src/Active";

import { HickoryLocation } from "@hickory/root";

describe("<Active>", () => {
  let node;
  let history;
  let router;
  const routes = [
    { name: "Home", path: "" },
    {
      name: "Contact",
      path: "contact",
      children: [{ name: "Method", path: ":method" }]
    }
  ];

  beforeEach(() => {
    node = document.createElement("div");
    history = InMemory();
    router = curi(history, routes, {
      route: [activeInteraction()]
    });
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  describe("no active interaction", () => {
    it('warns if attempting to use in a Curi router without the "active" route interaction', () => {
      const router = curi(history, routes);
      const Test = () => null;
      function merge(props) {
        return props;
      }

      const realError = console.error;
      console.error = jest.fn();

      expect(() => {
        ReactDOM.render(
          <CuriProvider router={router}>
            {() => (
              <Active name="Home" merge={merge}>
                <Test />
              </Active>
            )}
          </CuriProvider>,
          node
        );
      }).toThrow(
        'You are attempting to use the "active" prop, but have not included the "active" ' +
          "route interaction (@curi/route-active) in your Curi router."
      );
      console.error = realError;
    });
  });

  describe("children", () => {
    it("re-renders the children element it is passed", () => {
      const Test = () => <div>Test</div>;
      function merge(props) {
        return props;
      }

      ReactDOM.render(
        <CuriProvider router={router}>
          {() => (
            <Active name="Home" merge={merge}>
              <Test />
            </Active>
          )}
        </CuriProvider>,
        node
      );
      expect(node.textContent).toBe("Test");
    });
  });

  describe("merge", () => {
    it("does not call merge function when not active", () => {
      const Test = () => null;
      const merge = jest.fn();

      ReactDOM.render(
        <CuriProvider router={router}>
          {() => (
            <Active name="About" merge={merge}>
              <Test />
            </Active>
          )}
        </CuriProvider>,
        node
      );
      expect(merge.mock.calls.length).toBe(0);
    });

    it("calls merge function when active", () => {
      const Test = () => null;
      const merge = jest.fn();

      ReactDOM.render(
        <CuriProvider router={router}>
          {() => (
            <Active name="Home" merge={merge}>
              <Test />
            </Active>
          )}
        </CuriProvider>,
        node
      );
      expect(merge.mock.calls.length).toBe(1);
    });

    it("merges props into children element's props when active", () => {
      const Test = () => null;
      function merge(props) {
        props.className = "not-a-test";
        return props;
      }

      ReactDOM.render(
        <CuriProvider router={router}>
          {() => (
            <Active name="Home" merge={merge}>
              <div className="test" />
            </Active>
          )}
        </CuriProvider>,
        node
      );
      const div = node.querySelector("not-a-test");
      expect(div).toBeDefined();
    });
  });

  describe("partial", () => {
    it("works for partial matches when partial=true", () => {
      const Test = () => null;
      function merge(props) {
        props.className = "not-a-test";
        return props;
      }
      const history = InMemory({ locations: ["/contact/email"] });
      const router = curi(history, routes, {
        route: [activeInteraction()]
      });

      ReactDOM.render(
        <CuriProvider router={router}>
          {() => (
            <Active name="Contact" partial={true} merge={merge}>
              <div className="test" />
            </Active>
          )}
        </CuriProvider>,
        node
      );
      const div = node.querySelector("not-a-test");
      expect(div).toBeDefined();
    });
  });

  describe("extra", () => {
    it("does nothing when not provided", () => {
      const Test = () => null;
      const merge = jest.fn();

      ReactDOM.render(
        <CuriProvider router={router}>
          {() => (
            <Active name="Home" merge={merge}>
              <Test />
            </Active>
          )}
        </CuriProvider>,
        node
      );
      expect(merge.mock.calls.length).toBe(1);
    });

    it("passes current location and details to the extra function", () => {
      const Test = () => null;
      const merge = jest.fn();
      const details = { query: "test=ing" };
      const extra = jest.fn((loc: HickoryLocation, deets: object): boolean => {
        //expect(loc).toBe(fakeResponse.location);
        expect(deets).toBe(details);
        return true;
      });

      ReactDOM.render(
        <CuriProvider router={router}>
          {() => (
            <Active name="Home" merge={merge} extra={extra} details={details}>
              <Test />
            </Active>
          )}
        </CuriProvider>,
        node
      );
      expect(extra.mock.calls.length).toBe(1);
    });

    it("component is not active if extra returns false", () => {
      const Test = () => null;
      const merge = jest.fn();
      const extra = () => false;

      ReactDOM.render(
        <CuriProvider router={router}>
          {() => (
            <Active name="Home" merge={merge} extra={extra}>
              <Test />
            </Active>
          )}
        </CuriProvider>,
        node
      );
      expect(merge.mock.calls.length).toBe(0);
    });
  });
});
