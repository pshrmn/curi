import "jest";
import React from "react";
import ReactDOM from "react-dom";
import InMemory from "@hickory/in-memory";
import curi from "@curi/core";
import prefetchInteraction from "@curi/route-prefetch";

import Prefetch from "../src/Prefetch";
import Link from "../src/Link";
import CuriProvider from "../src/CuriProvider";

// global...
const entries = {
  entries: [],
  callbacks: [],
  intersectionRatio: 1,
  observe(fn) {
    this.callbacks.push(fn);
  },
  push(target) {
    this.entries.push({
      target,
      intersectionRatio: this.intersectionRatio
    });
    this.callbacks.forEach(fn => {
      fn(this.entries);
    });
  },
  update(target, ratio) {
    this.entries = this.entries.map(e => {
      if (e.target !== target) {
        return e;
      }
      return {
        target,
        intersectionRatio: ratio
      };
    });
    this.callbacks.forEach(fn => {
      fn(this.entries);
    });
  },
  reset() {
    this.entries = [];
    this.callbacks = [];
    this.intersectionRatio = 1;
  }
};

function FakeIntersectionObserver(callback) {
  entries.observe(callback);
  return {
    observe: jest.fn(target => {
      entries.push(target);
    }),
    disconnect: jest.fn(),
    unobserve: jest.fn()
  };
}

function childrenResponse({ response }) {
  const { body: Body } = response;
  return <Body response={response} />;
}

describe("prefetch", () => {
  global.IntersectionObserver = FakeIntersectionObserver;
  let node;

  beforeEach(() => {
    node = document.createElement("div");
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
    entries.reset();
  });

  describe("calling callback", () => {
    let linkRef;

    const history = InMemory();
    const routes = [
      {
        name: "Home",
        path: "",
        response() {
          return {
            body: () => (
              <Prefetch match={{ name: "Prefetch" }}>
                {ref => {
                  linkRef = ref;
                  return (
                    <Link to="Prefetch" ref={ref}>
                      Prefetch
                    </Link>
                  );
                }}
              </Prefetch>
            )
          };
        }
      },
      {
        name: "Prefetch",
        path: "prefetch",
        on: {
          // use on.every instead of on.initial so that the routes
          // can be re-used (on.initial() is only called once)
          every: jest.fn()
        }
      },
      { name: "Not Found", path: "(.*)" }
    ];
    const router = curi(history, routes, {
      route: [prefetchInteraction()]
    });

    afterEach(() => {
      routes[1].on.every.mockReset();
    });

    it('calls "on" fns immediately if the element is immediately visible', () => {
      ReactDOM.render(
        <CuriProvider router={router}>{childrenResponse}</CuriProvider>,
        node
      );
      expect(routes[1].on.every.mock.calls.length).toBe(1);
    });

    it('does not call "on" fns immediately if the element is not visible', () => {
      entries.intersectionRatio = 0;
      ReactDOM.render(
        <CuriProvider router={router}>{childrenResponse}</CuriProvider>,
        node
      );
      expect(routes[1].on.every.mock.calls.length).toBe(0);
    });

    it('calls "on" fns when element becomes visible', () => {
      entries.intersectionRatio = 0;
      ReactDOM.render(
        <CuriProvider router={router}>{childrenResponse}</CuriProvider>,
        node
      );
      expect(routes[1].on.every.mock.calls.length).toBe(0);
      entries.update(linkRef.current, 1);
      expect(routes[1].on.every.mock.calls.length).toBe(1);
    });
  });

  describe("match", () => {
    it('passes match object to "on" fns', () => {
      const history = InMemory();
      const match = { name: "Prefetch" };
      const prefetchRoute = {
        name: "Prefetch",
        path: "prefetch",
        on: {
          initial: jest.fn(),
          every: jest.fn()
        }
      };
      const routes = [
        {
          name: "Home",
          path: "",
          response() {
            return {
              body: () => (
                <Prefetch match={match}>
                  {ref => (
                    <Link to="Prefetch" ref={ref}>
                      Prefetch
                    </Link>
                  )}
                </Prefetch>
              )
            };
          }
        },
        prefetchRoute,
        { name: "Not Found", path: "(.*)" }
      ];
      const router = curi(history, routes, {
        route: [prefetchInteraction()]
      });

      ReactDOM.render(
        <CuriProvider router={router}>{childrenResponse}</CuriProvider>,
        node
      );
      expect(prefetchRoute.on.initial.mock.calls[0][0]).toBe(match);
      expect(prefetchRoute.on.every.mock.calls[0][0]).toBe(match);
    });
  });

  describe("which", () => {
    it("calls both on.initial() and on.every() by default", () => {
      const history = InMemory();
      const match = { name: "Prefetch" };
      const prefetchRoute = {
        name: "Prefetch",
        path: "prefetch",
        on: {
          initial: jest.fn(),
          every: jest.fn()
        }
      };
      const routes = [
        {
          name: "Home",
          path: "",
          response() {
            return {
              body: () => (
                <Prefetch match={match}>
                  {ref => (
                    <Link to="Prefetch" ref={ref}>
                      Prefetch
                    </Link>
                  )}
                </Prefetch>
              )
            };
          }
        },
        prefetchRoute,
        { name: "Not Found", path: "(.*)" }
      ];
      const router = curi(history, routes, {
        route: [prefetchInteraction()]
      });

      ReactDOM.render(
        <CuriProvider router={router}>{childrenResponse}</CuriProvider>,
        node
      );
      expect(prefetchRoute.on.initial.mock.calls.length).toBe(1);
      expect(prefetchRoute.on.every.mock.calls.length).toBe(1);
    });

    describe("{ initial: true } (implicit every=false)", () => {
      let node = document.createElement("div");
      const history = InMemory();
      const match = { name: "Prefetch" };
      const prefetchRoute = {
        name: "Prefetch",
        path: "prefetch",
        on: {
          initial: jest.fn(),
          every: jest.fn()
        }
      };
      const routes = [
        {
          name: "Home",
          path: "",
          response() {
            return {
              body: () => (
                <Prefetch match={match} which={{ initial: true }}>
                  {ref => (
                    <Link to="Prefetch" ref={ref}>
                      Prefetch
                    </Link>
                  )}
                </Prefetch>
              )
            };
          }
        },
        prefetchRoute,
        { name: "Not Found", path: "(.*)" }
      ];
      const router = curi(history, routes, {
        route: [prefetchInteraction()]
      });

      ReactDOM.render(
        <CuriProvider router={router}>{childrenResponse}</CuriProvider>,
        node
      );

      it("calls on.initial()", () => {
        expect(prefetchRoute.on.initial.mock.calls.length).toBe(1);
      });

      it("does not call on.every()", () => {
        expect(prefetchRoute.on.every.mock.calls.length).toBe(0);
      });

      ReactDOM.unmountComponentAtNode(node);
    });

    describe("{ every: true } (implicit initial=false)", () => {
      let node = document.createElement("div");
      const history = InMemory();
      const match = { name: "Prefetch" };
      const prefetchRoute = {
        name: "Prefetch",
        path: "prefetch",
        on: {
          initial: jest.fn(),
          every: jest.fn()
        }
      };
      const routes = [
        {
          name: "Home",
          path: "",
          response() {
            return {
              body: () => (
                <Prefetch match={match} which={{ every: true }}>
                  {ref => (
                    <Link to="Prefetch" ref={ref}>
                      Prefetch
                    </Link>
                  )}
                </Prefetch>
              )
            };
          }
        },
        prefetchRoute,
        { name: "Not Found", path: "(.*)" }
      ];
      const router = curi(history, routes, {
        route: [prefetchInteraction()]
      });

      ReactDOM.render(
        <CuriProvider router={router}>{childrenResponse}</CuriProvider>,
        node
      );

      it("does not call on.initial()", () => {
        expect(prefetchRoute.on.initial.mock.calls.length).toBe(0);
      });

      it("calls on.every()", () => {
        expect(prefetchRoute.on.every.mock.calls.length).toBe(1);
      });

      ReactDOM.unmountComponentAtNode(node);
    });
  });

  describe("children() render-invoked prop", () => {
    it("is called with a ref object to pass to a component that it renders", () => {
      const history = InMemory();
      const match = { name: "Prefetch" };
      const prefetchRoute = {
        name: "Prefetch",
        path: "prefetch",
        on: {
          initial: jest.fn(),
          every: jest.fn()
        }
      };
      const routes = [
        {
          name: "Home",
          path: "",
          response() {
            return {
              body: () => (
                <Prefetch match={match}>
                  {ref => {
                    // verify that ref is an object with a current property
                    // (this is what React.createRef() creates)
                    expect(ref).toHaveProperty("current");
                    return (
                      <Link to="Prefetch" ref={ref}>
                        Prefetch
                      </Link>
                    );
                  }}
                </Prefetch>
              )
            };
          }
        },
        prefetchRoute,
        { name: "Not Found", path: "(.*)" }
      ];
      const router = curi(history, routes, {
        route: [prefetchInteraction()]
      });

      ReactDOM.render(
        <CuriProvider router={router}>{childrenResponse}</CuriProvider>,
        node
      );
    });
  });

  describe("ref", () => {
    it("re-uses the provided ref", () => {
      const history = InMemory();
      const match = { name: "Prefetch" };
      const ref = React.createRef();
      let linkRef;
      const prefetchRoute = {
        name: "Prefetch",
        path: "prefetch",
        on: {
          initial: jest.fn(),
          every: jest.fn()
        }
      };
      const routes = [
        {
          name: "Home",
          path: "",
          response() {
            return {
              body: () => (
                <Prefetch ref={ref} match={match}>
                  {ref => {
                    linkRef = ref;
                    return (
                      <Link to="Prefetch" ref={ref}>
                        Prefetch
                      </Link>
                    );
                  }}
                </Prefetch>
              )
            };
          }
        },
        prefetchRoute,
        { name: "Not Found", path: "(.*)" }
      ];
      const router = curi(history, routes, {
        route: [prefetchInteraction()]
      });

      ReactDOM.render(
        <CuriProvider router={router}>{childrenResponse}</CuriProvider>,
        node
      );
      expect(linkRef).toBe(ref);
    });
  });
});
