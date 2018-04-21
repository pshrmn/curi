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

  describe("no route.active()", () => {
    it('warns if attempting to use in a Curi router without the "active" route interaction', () => {
      const router = curi(history, routes);

      const realError = console.error;
      console.error = jest.fn();

      expect(() => {
        ReactDOM.render(
          <CuriProvider router={router}>
            {() => <Active name="Home">{active => null}</Active>}
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

  describe("name", () => {
    it('uses the "name" to determine if it is active', () => {
      ReactDOM.render(
        <CuriProvider router={router}>
          {() => (
            <Active name="Home">
              {active => {
                expect(active).toBe(true);
                return null;
              }}
            </Active>
          )}
        </CuriProvider>,
        node
      );
    });
  });

  describe("params", () => {
    it('uses the "params" to determine if it is active', () => {
      const history = InMemory({ locations: ["/contact/email"] });
      const router = curi(history, routes, {
        route: [activeInteraction()]
      });
      ReactDOM.render(
        <CuriProvider router={router}>
          {() => (
            <Active name="Method" params={{ method: "email" }}>
              {active => {
                expect(active).toBe(true);
                return null;
              }}
            </Active>
          )}
        </CuriProvider>,
        node
      );
    });
  });

  describe("children", () => {
    it("is called when <Active> renders", () => {
      const childrenMock = jest.fn(() => {
        return null;
      });
      ReactDOM.render(
        <CuriProvider router={router}>
          {() => <Active name="Home">{childrenMock}</Active>}
        </CuriProvider>,
        node,
        () => {
          expect(childrenMock.mock.calls.length).toBe(1);
        }
      );
    });

    it("children(true) if the specified route is active", () => {
      ReactDOM.render(
        <CuriProvider router={router}>
          {() => (
            <Active name="Home">
              {active => {
                expect(active).toBe(true);
                return null;
              }}
            </Active>
          )}
        </CuriProvider>,
        node
      );
    });

    it("children(false) if the specified route is NOT active", () => {
      ReactDOM.render(
        <CuriProvider router={router}>
          {() => (
            <Active name="Contact">
              {active => {
                expect(active).toBe(false);
                return null;
              }}
            </Active>
          )}
        </CuriProvider>,
        node
      );
    });
  });

  describe("partial", () => {
    it("children(true) for partial matches when partial=true", () => {
      const history = InMemory({ locations: ["/contact/email"] });
      const router = curi(history, routes, {
        route: [activeInteraction()]
      });

      ReactDOM.render(
        <CuriProvider router={router}>
          {() => (
            <Active name="Contact" partial={true}>
              {active => {
                expect(active).toBe(true);
                return null;
              }}
            </Active>
          )}
        </CuriProvider>,
        node
      );
    });
  });
});
