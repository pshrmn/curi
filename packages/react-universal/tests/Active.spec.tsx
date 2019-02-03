import "jest";
import React from "react";
import ReactDOM from "react-dom";
import InMemory from "@hickory/in-memory";
import { curi, prepareRoutes } from "@curi/router";
import activeInteraction from "@curi/route-active";

// @ts-ignore (resolved by jest)
import { curiProvider, Active } from "@curi/react-universal";

// TODO: Determine which tests can be removed because the behavior
// is already tested in the useActive tests.

describe("<Active>", () => {
  let node;
  let history;
  let router, Router;
  const routes = prepareRoutes([
    { name: "Home", path: "" },
    {
      name: "Contact",
      path: "contact",
      children: [{ name: "Method", path: ":method" }]
    }
  ]);

  beforeEach(() => {
    node = document.createElement("div");
    history = InMemory();
    router = curi(history, routes, {
      route: [activeInteraction()]
    });
    Router = curiProvider(router);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  describe("no route.active()", () => {
    it('throws if attempting to use in a Curi router without the "active" route interaction', () => {
      const router = curi(history, routes);

      const realError = console.error;
      console.error = jest.fn();

      const Router = curiProvider(router);

      expect(() => {
        ReactDOM.render(
          <Router>
            <Active name="Home">{active => null}</Active>
          </Router>,
          node
        );
      }).toThrow(
        `You are attempting to use the "active" route interaction, but have not included it in your Curi router.

import curi from "@curi/router";
import active from "@curi/route-active";

const router = curi(history, routes, {
  route: [active()]
});`
      );
      console.error = realError;
    });
  });

  describe("name", () => {
    it('uses the "name" to determine if it is active', () => {
      ReactDOM.render(
        <Router>
          <Active name="Home">
            {active => {
              expect(active).toBe(true);
              return null;
            }}
          </Active>
        </Router>,
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
      const Router = curiProvider(router);
      ReactDOM.render(
        <Router>
          <Active name="Method" params={{ method: "email" }}>
            {active => {
              expect(active).toBe(true);
              return null;
            }}
          </Active>
        </Router>,
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
        <Router>
          <Active name="Home">{childrenMock}</Active>
        </Router>,
        node,
        () => {
          expect(childrenMock.mock.calls.length).toBe(1);
        }
      );
    });

    it("children(true) if the specified route is active", () => {
      ReactDOM.render(
        <Router>
          <Active name="Home">
            {active => {
              expect(active).toBe(true);
              return null;
            }}
          </Active>
        </Router>,
        node
      );
    });

    it("children(false) if the specified route is NOT active", () => {
      ReactDOM.render(
        <Router>
          <Active name="Contact">
            {active => {
              expect(active).toBe(false);
              return null;
            }}
          </Active>
        </Router>,
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
      const Router = curiProvider(router);
      ReactDOM.render(
        <Router>
          <Active name="Contact" partial={true}>
            {active => {
              expect(active).toBe(true);
              return null;
            }}
          </Active>
        </Router>,
        node
      );
    });
  });

  describe("locationCheck", () => {
    it("uses the function to check against the response when route is active", () => {
      const history = InMemory({ locations: ["/"] });
      const router = curi(history, routes, {
        route: [activeInteraction()]
      });
      const Router = curiProvider(router);
      const locationCheck = jest.fn(() => true);
      ReactDOM.render(
        <Router>
          <Active name="Home" checkLocation={locationCheck}>
            {active => {
              expect(active).toBe(true);
              return null;
            }}
          </Active>
        </Router>,
        node
      );
      expect(locationCheck.mock.calls.length).toBe(1);
    });

    it("will set active to false if it returns false", () => {
      const history = InMemory({ locations: ["/"] });
      const router = curi(history, routes, {
        route: [activeInteraction()]
      });
      const Router = curiProvider(router);
      const locationCheck = jest.fn(() => false);
      ReactDOM.render(
        <Router>
          <Active name="Home" checkLocation={locationCheck}>
            {active => {
              expect(active).toBe(false);
              return null;
            }}
          </Active>
        </Router>,
        node
      );
      expect(locationCheck.mock.calls.length).toBe(1);
    });
  });
});
