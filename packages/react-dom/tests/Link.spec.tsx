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
  let history, router, Router;
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

  describe("to", () => {
    it('warns about using "to" instead of "name"', () => {
      // this test needs to be called first in order to catch the warning
      const realWarn = console.warn;
      const fakeWarn = jest.fn();
      console.warn = fakeWarn;

      ReactDOM.render(
        <Router>{() => <Link to="Test">Test</Link>}</Router>,
        node
      );

      expect(fakeWarn.mock.calls.length).toBe(1);
      expect(fakeWarn.mock.calls[0][0]).toBe(`Deprecation warning:
The "to" prop should be replaced with the "name" prop. The "to" prop will be removed in @curi/react-dom v2.

<Link name="Route Name">...</Link>`);

      console.warn = realWarn;
    });

    it("sets the href attribute using the named route's path", () => {
      ReactDOM.render(
        <Router>{() => <Link to="Test">Test</Link>}</Router>,
        node
      );
      const a = node.querySelector("a");
      expect(a.getAttribute("href")).toBe("/");
    });
  });

  describe("anchor", () => {
    it("renders an <a> by default", () => {
      ReactDOM.render(
        <Router>{() => <Link name="Test">Test</Link>}</Router>,
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
          {() => (
            <Link anchor={StyledAnchor} name="Test">
              Test
            </Link>
          )}
        </Router>,
        node
      );
      const a = node.querySelector("a");
      expect(a).toBeDefined();
      expect(getComputedStyle(a).color).toBe("orange");
    });

    it("re-renders if the anchor changes", () => {
      let count = 0;
      function renderCounter() {
        return <div>{count++}</div>;
      }
      const StyledAnchor = props => (
        <a style={{ color: "orange" }} {...props} />
      );
      ReactDOM.render(
        <Router>
          {() => (
            <Link anchor={StyledAnchor} name="Test">
              {renderCounter}
            </Link>
          )}
        </Router>,
        node
      );
      const a0 = node.querySelector("a");
      expect(a0.textContent).toBe("0");

      ReactDOM.render(
        <Router>
          {() => (
            <Link anchor={StyledAnchor} name="Test">
              {renderCounter}
            </Link>
          )}
        </Router>,
        node
      );
      const a1 = node.querySelector("a");
      expect(a1.textContent).toBe("0");

      ReactDOM.render(
        <Router>
          {() => (
            <Link anchor="a" name="Test">
              {renderCounter}
            </Link>
          )}
        </Router>,
        node
      );
      const a2 = node.querySelector("a");
      expect(a2.textContent).toBe("1");
    });
  });

  describe("name", () => {
    it("sets the href attribute using the named route's path", () => {
      ReactDOM.render(
        <Router>{() => <Link name="Test">Test</Link>}</Router>,
        node
      );
      const a = node.querySelector("a");
      expect(a.getAttribute("href")).toBe("/");
    });

    it("creates a relative link if 'to' is undefined", () => {
      const history = InMemory({
        locations: ["/the-initial-location"]
      });
      const routes = prepareRoutes([{ name: "Catch All", path: "(.*)" }]);
      const router = curi(history, routes);
      const Router = curiProvider(router);
      ReactDOM.render(
        <Router>{() => <Link name={null}>Test</Link>}</Router>,
        node
      );
      const a = node.querySelector("a");
      expect(a.getAttribute("href")).toBe("");
    });

    it("re-renders if to changes", () => {
      let count = 0;
      function renderCounter() {
        return <div>{count++}</div>;
      }
      ReactDOM.render(
        <Router>{() => <Link name="Test">{renderCounter}</Link>}</Router>,
        node
      );
      const a0 = node.querySelector("a");
      expect(a0.textContent).toBe("0");

      ReactDOM.render(
        <Router>{() => <Link name="Test">{renderCounter}</Link>}</Router>,
        node
      );
      const a1 = node.querySelector("a");
      expect(a1.textContent).toBe("0");

      ReactDOM.render(
        <Router>{() => <Link name="Best">{renderCounter}</Link>}</Router>,
        node
      );
      const a2 = node.querySelector("a");
      expect(a2.textContent).toBe("1");
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
          {() => (
            <Link name="Park" params={params}>
              Test
            </Link>
          )}
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
          {() => (
            <Link name="Park" params={params}>
              Test
            </Link>
          )}
        </Router>,
        node
      );
      let a = node.querySelector("a");
      expect(a.getAttribute("href")).toBe("/park/Glacier");

      const newParams = { name: "Yellowstone" };
      ReactDOM.render(
        <Router>
          {() => (
            <Link name="Park" params={newParams}>
              Test
            </Link>
          )}
        </Router>,
        node
      );
      a = node.querySelector("a");
      expect(a.getAttribute("href")).toBe("/park/Yellowstone");
    });

    it("does not re-render if new params object is shallowly equal to current", () => {
      let count = 0;
      function renderCounter() {
        return <div>{count++}</div>;
      }
      ReactDOM.render(
        <Router>
          {() => (
            <Link name="Park" params={{ name: "Yosemite" }}>
              {renderCounter}
            </Link>
          )}
        </Router>,
        node
      );
      const a0 = node.querySelector("a");
      expect(a0.textContent).toBe("0");

      // same params, but new object
      ReactDOM.render(
        <Router>
          {() => (
            <Link name="Park" params={{ name: "Yosemite" }}>
              {renderCounter}
            </Link>
          )}
        </Router>,
        node
      );
      const a1 = node.querySelector("a");
      expect(a1.textContent).toBe("0");
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
          {() => (
            <Link name="Test" query="one=two" hash="hashtag">
              Test
            </Link>
          )}
        </Router>,
        node
      );
      const a = node.querySelector("a");
      expect(a.getAttribute("href")).toBe("/test?one=two#hashtag");
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
          {() => (
            <Link name="Test" ref={ref}>
              Test
            </Link>
          )}
        </Router>,
        node
      );
      const a = node.querySelector("a");
      expect(a).toBe(ref.current);
    });
  });

  describe("children", () => {
    describe("React Node", () => {
      it("renders the provided children value(s)", () => {
        const history = InMemory();
        const routes = prepareRoutes([
          { name: "Test", path: "test" },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(history, routes);
        const Router = curiProvider(router);
        const children = "Test Value";
        ReactDOM.render(
          <Router>{() => <Link name="Test">{children}</Link>}</Router>,
          node
        );
        const a = node.querySelector("a");
        expect(a.textContent).toBe(children);
      });
    });

    describe("render-invoked function", () => {
      it("calls the function with the component's navigating state (initial navigating=false)", () => {
        const history = InMemory();
        const routes = prepareRoutes([
          { name: "Test", path: "test" },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(history, routes);
        const Router = curiProvider(router);
        ReactDOM.render(
          <Router>
            {() => (
              <Link name="Test">
                {navigating => {
                  expect(navigating).toBe(false);
                  return null;
                }}
              </Link>
            )}
          </Router>,
          node
        );
        const a = node.querySelector("a");
      });
    });
  });

  describe("clicking a link", () => {
    it("calls history.navigate", () => {
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
        <Router>{() => <Link name="Test">Test</Link>}</Router>,
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

    describe("children(navigating)", () => {
      it("children(true) after clicking", () => {
        // if a link has no on methods, finished will be called almost
        // immediately (although this style should only be used for routes
        // with on methods)
        const history = InMemory();
        const routes = prepareRoutes([
          {
            name: "Test",
            path: "test",
            resolve: {
              test: () => {
                return new Promise(resolve => {
                  setTimeout(() => {
                    resolve("done");
                  }, 100);
                });
              }
            }
          },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(history, routes);
        const Router = curiProvider(router);

        ReactDOM.render(
          <Router>
            {() => (
              <Link name="Test">
                {navigating => {
                  return <div>{navigating.toString()}</div>;
                }}
              </Link>
            )}
          </Router>,
          node
        );
        const a = node.querySelector("a");
        expect(a.textContent).toBe("false");
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
        expect(a.textContent).toBe("true");
      });

      it("children(false) when navigation is cancelled", () => {
        const history = InMemory();
        const routes = prepareRoutes([
          { name: "Test", path: "test" },
          {
            name: "Slow",
            path: "slow",
            resolve: {
              test: () => {
                // takes 500ms to resolve
                return new Promise(resolve => {
                  setTimeout(() => {
                    resolve("slow");
                  }, 500);
                });
              }
            }
          },
          {
            name: "Fast",
            path: "fast"
          },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(history, routes);
        const Router = curiProvider(router);

        ReactDOM.render(
          <Router>
            {() => (
              <React.Fragment>
                <Link name="Slow">
                  {navigating => {
                    return <div>Slow {navigating.toString()}</div>;
                  }}
                </Link>
                <Link name="Fast">
                  {navigating => {
                    return <div>Fast {navigating.toString()}</div>;
                  }}
                </Link>
              </React.Fragment>
            )}
          </Router>,
          node
        );
        const [slowLink, fastLink] = node.querySelectorAll("a");
        expect(slowLink.textContent).toBe("Slow false");
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
        Simulate.click(slowLink, leftClickEvent);
        expect(slowLink.textContent).toBe("Slow true");

        Simulate.click(fastLink, leftClickEvent);
        expect(slowLink.textContent).toBe("Slow false");
      });

      it("children(false) when navigation is finished", done => {
        const history = InMemory();
        const routes = prepareRoutes([
          { name: "Test", path: "test" },
          {
            name: "Loader",
            path: "load",
            resolve: {
              test: () => Promise.resolve("done")
            }
          },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(history, routes);
        const Router = curiProvider(router);

        ReactDOM.render(
          <Router>
            {() => (
              <Link name="Loader">
                {navigating => {
                  return <div>{navigating.toString()}</div>;
                }}
              </Link>
            )}
          </Router>,
          node
        );
        const a = node.querySelector("a");
        expect(a.textContent).toBe("false");
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
        expect(a.textContent).toBe("true");
        router.once(
          ({ response }) => {
            expect(response.name).toBe("Loader");
            expect(a.textContent).toBe("false");
            done();
          },
          { initial: false }
        );
      });

      it("does not call setState if component has unmounted", done => {
        const realError = console.error;
        const mockError = jest.fn();
        console.error = mockError;

        const history = InMemory();
        const routes = prepareRoutes([
          { name: "Test", path: "test" },
          {
            name: "Slow",
            path: "slow",
            resolve: {
              test: () => {
                return new Promise(resolve => {
                  setTimeout(() => {
                    resolve("Finally finished");
                    setTimeout(() => {
                      expect(mockError.mock.calls.length).toBe(0);
                      console.error = realError;
                      done();
                    });
                  }, 100);
                });
              }
            }
          },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(history, routes);
        const Router = curiProvider(router);

        ReactDOM.render(
          <Router>
            {() => (
              <Link name="Slow">
                {navigating => {
                  return <div>{navigating.toString()}</div>;
                }}
              </Link>
            )}
          </Router>,
          node
        );
        const a = node.querySelector("a");
        expect(a.textContent).toBe("false");
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

        // unmount the Link to verify that it doesn't call setState()
        ReactDOM.unmountComponentAtNode(node);
      });
    });

    it("includes hash, query, and state in location passed to history.navigate", () => {
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
          {() => (
            <Link name="Test" hash="thing" query="one=1" state="yo">
              Test
            </Link>
          )}
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
      const mockLocation = mockNavigate.mock.calls[0][0];
      expect(mockLocation).toMatchObject({
        pathname: "/test",
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
        const routes = prepareRoutes([
          { name: "Test", path: "test" },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(history, routes);
        const Router = curiProvider(router);

        ReactDOM.render(
          <Router>
            {() => (
              <Link name="Test" onClick={onClick}>
                Test
              </Link>
            )}
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
        const routes = prepareRoutes([
          { name: "Test", path: "test" },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(history, routes);
        const Router = curiProvider(router);

        ReactDOM.render(
          <Router>
            {() => (
              <Link name="Test" onClick={onClick}>
                Test
              </Link>
            )}
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
        expect(onClick.mock.calls.length).toBe(1);
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
        <Router>{() => <Link name="Test">Test</Link>}</Router>,
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
        <Router>{() => <Link name="Test">Test</Link>}</Router>,
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
