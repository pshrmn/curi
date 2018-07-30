import "jest";
import React from "react";
import ReactDOM from "react-dom";
import InMemory from "@hickory/in-memory";
import { curi } from "@curi/router";
import prefetchInteraction from "@curi/route-prefetch";

import Prefetch from "../src/Prefetch";
import Link from "../src/Link";
import CuriProvider from "../src/CuriProvider";

// simulate IntersectionObserver
// https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
function createIntersectionObserver() {
  let entries = [];
  // noop
  let callback: (...any: Array<any>) => void = () => {};
  let intersectionRatio = 1;
  function flush() {
    callback(entries);
  }
  const observe = jest.fn(target => {
    entries.push({
      target,
      intersectionRatio
    });
    flush();
  });
  function update(target, ratio) {
    entries = entries.map(
      e =>
        e.target !== target
          ? e
          : {
              target,
              intersectionRatio: ratio
            }
    );
    flush();
  }
  const disconnect = jest.fn();
  const unobserve = jest.fn();

  return {
    entries,
    observe,
    disconnect,
    unobserve,
    update,
    setRatio(ratio) {
      intersectionRatio = ratio;
    },
    io(fn) {
      callback = fn;
      return {
        observe,
        disconnect,
        unobserve
      };
    }
  };
}

function childrenResponse({ response }) {
  const { body: Body } = response;
  return <Body response={response} />;
}

describe("prefetch", () => {
  let node, intersection;

  beforeEach(() => {
    node = document.createElement("div");
    intersection = createIntersectionObserver();
    global.IntersectionObserver = intersection.io;
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
    jest.resetAllMocks();
  });

  describe("no prefetch interaction", () => {
    it("throws if @curi/route-prefetch is not present", () => {
      const realError = console.error;
      console.error = jest.fn();

      const history = InMemory();
      const match = { name: "Prefetch" };
      const prefetchRoute = {
        name: "Prefetch",
        path: "prefetch",
        match: {
          one: jest.fn(),
          two: jest.fn()
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
      const router = curi(history, routes);
      expect(() => {
        ReactDOM.render(
          <CuriProvider router={router}>{childrenResponse}</CuriProvider>,
          node
        );
      }).toThrow(
        `You are attempting to use the "prefetch" route interaction, but have not included it in your Curi router.

import curi from "@curi/router";
import prefetch from "@curi/route-prefetch";

const router = curi(history, routes, {
  route: [prefetch()]
});`
      );

      console.error = realError;
    });
  });

  describe("calling callback", () => {
    let linkRef;

    const history = InMemory();
    const prefetchRoute = {
      name: "Prefetch",
      path: "prefetch",
      match: {
        // use match.two instead of match.one so that the routes
        // can be re-used (match.one() is only called once)
        two: jest.fn()
      }
    };
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
      prefetchRoute,
      { name: "Not Found", path: "(.*)" }
    ];
    const router = curi(history, routes, {
      route: [prefetchInteraction()]
    });

    afterEach(() => {
      prefetchRoute.match.two.mockReset();
    });

    it('calls "on" fns immediately if the element is immediately visible', () => {
      ReactDOM.render(
        <CuriProvider router={router}>{childrenResponse}</CuriProvider>,
        node
      );
      expect(prefetchRoute.match.two.mock.calls.length).toBe(1);
    });

    it('does not call "on" fns immediately if the element is not visible', () => {
      intersection.setRatio(0);
      ReactDOM.render(
        <CuriProvider router={router}>{childrenResponse}</CuriProvider>,
        node
      );
      expect(prefetchRoute.match.two.mock.calls.length).toBe(0);
    });

    it('calls "on" fns when element becomes visible', () => {
      intersection.setRatio(0);
      ReactDOM.render(
        <CuriProvider router={router}>{childrenResponse}</CuriProvider>,
        node
      );
      expect(prefetchRoute.match.two.mock.calls.length).toBe(0);
      intersection.update(linkRef.current, 1);
      expect(prefetchRoute.match.two.mock.calls.length).toBe(1);
    });

    it("stops observing ref and disconnects observer after calling callback", () => {
      expect(intersection.unobserve.mock.calls.length).toBe(0);
      expect(intersection.disconnect.mock.calls.length).toBe(0);
      ReactDOM.render(
        <CuriProvider router={router}>{childrenResponse}</CuriProvider>,
        node
      );
      expect(prefetchRoute.match.two.mock.calls.length).toBe(1);
      expect(intersection.unobserve.mock.calls.length).toBe(1);
      expect(intersection.disconnect.mock.calls.length).toBe(1);
      expect(intersection.unobserve.mock.calls[0][0]).toBe(linkRef.current);
    });
  });

  describe("match", () => {
    it('passes match object to "on" fns', () => {
      const history = InMemory();
      const match = { name: "Prefetch" };
      const prefetchRoute = {
        name: "Prefetch",
        path: "prefetch",
        match: {
          one: jest.fn(),
          two: jest.fn()
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
      expect(prefetchRoute.match.one.mock.calls[0][0]).toBe(match);
      expect(prefetchRoute.match.two.mock.calls[0][0]).toBe(match);
    });
  });

  describe("which", () => {
    it("calls all route.match functions by default", () => {
      const history = InMemory();
      const match = { name: "Prefetch" };
      const prefetchRoute = {
        name: "Prefetch",
        path: "prefetch",
        match: {
          one: jest.fn(),
          two: jest.fn()
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
      expect(prefetchRoute.match.one.mock.calls.length).toBe(1);
      expect(prefetchRoute.match.two.mock.calls.length).toBe(1);
    });

    it("calls match.one() when which=['one'], does not call match.two()", () => {
      const history = InMemory();
      const match = { name: "Prefetch" };
      const prefetchRoute = {
        name: "Prefetch",
        path: "prefetch",
        match: {
          one: jest.fn(),
          two: jest.fn()
        }
      };
      const routes = [
        {
          name: "Home",
          path: "",
          response() {
            return {
              body: () => (
                <Prefetch match={match} which={["one"]}>
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

      expect(prefetchRoute.match.one.mock.calls.length).toBe(1);
      expect(prefetchRoute.match.two.mock.calls.length).toBe(0);
    });
  });

  describe("children() render-invoked prop", () => {
    describe("ref (first argument)", () => {
      it("is a ref object", () => {
        const history = InMemory();
        const match = { name: "Prefetch" };
        const prefetchRoute = {
          name: "Prefetch",
          path: "prefetch",
          match: {
            one: jest.fn(),
            two: jest.fn()
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

      it("warns if ref if null after mounting", () => {
        const realWarn = console.warn;
        const mockWarn = (console.warn = jest.fn());

        const history = InMemory();
        const match = { name: "Prefetch" };
        const prefetchRoute = {
          name: "Prefetch",
          path: "prefetch",
          match: {
            one: jest.fn(),
            two: jest.fn()
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
                    {ref => <Link to="Prefetch">Prefetch</Link>}
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
        expect(mockWarn.mock.calls.length).toBe(1);
        expect(mockWarn.mock.calls[0][0]).toBe(
          "The ref provided to the children function is null. Did you forget to pass it to a component?"
        );

        console.warn = realWarn;
      });
    });

    describe("resolved (second argument)", () => {
      it("starts out null", () => {
        intersection.setRatio(0);
        const history = InMemory();
        const match = { name: "Prefetch" };
        const prefetchRoute = {
          name: "Prefetch",
          path: "prefetch",
          match: {
            one: jest.fn(),
            two: jest.fn()
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
                    {(ref, resolved) => {
                      expect(resolved).toBe(null);
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

      it("is the prefetch results once prefetched", done => {
        const history = InMemory();
        const match = { name: "Prefetch" };
        const prefetchRoute = {
          name: "Prefetch",
          path: "prefetch",
          match: {
            one: () => Promise.resolve("initial"),
            two: () => Promise.resolve("every")
          }
        };
        let renderCount = 0;
        const routes = [
          {
            name: "Home",
            path: "",
            response() {
              return {
                body: () => (
                  <Prefetch match={match}>
                    {(ref, resolved) => {
                      if (renderCount === 0) {
                        expect(resolved).toBe(null);
                        renderCount++;
                      } else {
                        expect(resolved).toMatchObject({
                          one: "initial",
                          two: "every"
                        });
                        done();
                      }
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

    describe("error (third argument)", () => {
      it("starts out null", () => {
        intersection.setRatio(0);
        const history = InMemory();
        const match = { name: "Prefetch" };
        const prefetchRoute = {
          name: "Prefetch",
          path: "prefetch",
          match: {
            one: jest.fn(),
            two: jest.fn()
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
                    {(ref, _, error) => {
                      expect(error).toBe(null);
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

      it("is the prefetch error (if one happens) once prefetched", done => {
        const history = InMemory();
        const match = { name: "Prefetch" };
        const prefetchRoute = {
          name: "Prefetch",
          path: "prefetch",
          match: {
            one: () => Promise.reject("woops!")
          }
        };
        let renderCount = 0;
        const routes = [
          {
            name: "Home",
            path: "",
            response() {
              return {
                body: () => (
                  <Prefetch match={match}>
                    {(ref, _, error) => {
                      if (renderCount === 0) {
                        expect(error).toBe(null);
                        renderCount++;
                      } else {
                        expect(error).toBe("woops!");
                        done();
                      }
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
        match: {
          one: jest.fn(),
          two: jest.fn()
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