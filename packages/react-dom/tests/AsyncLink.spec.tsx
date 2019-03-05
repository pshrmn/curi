import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { Simulate } from "react-dom/test-utils";
import { InMemory } from "@hickory/in-memory";
import { curi, prepareRoutes } from "@curi/router";

import { curiProvider, AsyncLink } from "@curi/react-dom";

describe("<AsyncLink>", () => {
  let node;
  let router, Router: React.FunctionComponent;
  const routes = prepareRoutes([
    { name: "Test", path: "" },
    { name: "Best", path: "best" },
    { name: "Catch All", path: "(.*)" }
  ]);

  beforeEach(() => {
    node = document.createElement("div");
    router = curi(InMemory, routes);
    Router = curiProvider(router);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  describe("anchor", () => {
    it("renders an <a> by default", () => {
      ReactDOM.render(
        <Router>
          <AsyncLink name="Test">{() => null}</AsyncLink>}
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
          <AsyncLink anchor={StyledAnchor} name="Test">
            {() => null}
          </AsyncLink>
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
            <AsyncLink name="Test">{() => null}</AsyncLink>}
          </Router>,
          node
        );
        const a = node.querySelector("a");
        expect(a.getAttribute("href")).toBe("/");
      });

      it("creates a relative link if 'to' is undefined", () => {
        const routes = prepareRoutes([{ name: "Catch All", path: "(.*)" }]);
        const router = curi(InMemory, routes, {
          history: {
            locations: ["/the-initial-location"]
          }
        });
        const Router = curiProvider(router);
        ReactDOM.render(
          <Router>
            <AsyncLink name={null}>{() => null}</AsyncLink>
          </Router>,
          node
        );
        const a = node.querySelector("a");
        expect(a.getAttribute("href")).toBe("");
      });
    });

    describe("params", () => {
      let router, Router;
      const routes = prepareRoutes([
        { name: "Park", path: "park/:name" },
        { name: "Catch All", path: "(.*)" }
      ]);

      beforeEach(() => {
        router = curi(InMemory, routes);
        Router = curiProvider(router);
      });

      it("uses params to generate the href", () => {
        const params = { name: "Glacier" };
        ReactDOM.render(
          <Router>
            <AsyncLink name="Park" params={params}>
              {() => null}
            </AsyncLink>
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
            <AsyncLink name="Park" params={params}>
              {() => null}
            </AsyncLink>
          </Router>,
          node
        );
        let a = node.querySelector("a");
        expect(a.getAttribute("href")).toBe("/park/Glacier");

        const newParams = { name: "Yellowstone" };
        ReactDOM.render(
          <Router>
            <AsyncLink name="Park" params={newParams}>
              {() => null}
            </AsyncLink>
          </Router>,
          node
        );
        a = node.querySelector("a");
        expect(a.getAttribute("href")).toBe("/park/Yellowstone");
      });
    });

    describe("hash & query", () => {
      it("merges hash & query props with the pathname when creating href", () => {
        const routes = prepareRoutes([
          { name: "Test", path: "test" },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(InMemory, routes);
        const Router = curiProvider(router);
        ReactDOM.render(
          <Router>
            <AsyncLink name="Test" query="one=two" hash="hashtag">
              {() => null}
            </AsyncLink>
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
          <AsyncLink name="Test" forward={{ className: "hi" }}>
            {() => null}
          </AsyncLink>
        </Router>,
        node
      );

      const a = node.querySelector("a");
      expect(a.classList.contains("hi")).toBe(true);
    });
  });

  describe("ref", () => {
    it("returns the anchor's ref, not the link's", () => {
      const routes = prepareRoutes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(InMemory, routes);
      const Router = curiProvider(router);
      const ref = React.createRef();
      ReactDOM.render(
        <Router>
          <AsyncLink name="Test" ref={ref}>
            {() => null}
          </AsyncLink>
        </Router>,
        node
      );
      const a = node.querySelector("a");
      expect(a).toBe(ref.current);
    });
  });

  describe("children", () => {
    it("is called with the <AsyncLink>'s current navigating state (false on mount)", () => {
      const routes = prepareRoutes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(InMemory, routes);
      const Router = curiProvider(router);
      const children = jest.fn((a: boolean) => null);
      ReactDOM.render(
        <Router>
          <AsyncLink name="Test">{children}</AsyncLink>
        </Router>,
        node
      );
      expect(children.mock.calls.length).toBe(1);
      expect(children.mock.calls[0][0]).toBe(false);
    });
  });

  describe("clicking a link", () => {
    it("calls history.navigate", () => {
      const routes = prepareRoutes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(InMemory, routes);
      const mockNavigate = jest.fn();
      router.history.navigate = mockNavigate;
      const Router = curiProvider(router);
      ReactDOM.render(
        <Router>
          <AsyncLink name="Test">{() => null}</AsyncLink>
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
      expect(mockNavigate.mock.calls.length).toBe(1);
    });

    describe("children(navigating)", () => {
      it("children(true) after clicking", () => {
        // if a link has no on methods, finished will be called almost
        // immediately (although this style should only be used for routes
        // with on methods)
        const routes = prepareRoutes([
          {
            name: "Test",
            path: "test",
            resolve() {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve("done");
                }, 100);
              });
            }
          },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(InMemory, routes);
        const Router = curiProvider(router);

        ReactDOM.render(
          <Router>
            <AsyncLink name="Test">
              {navigating => {
                return <div>{navigating.toString()}</div>;
              }}
            </AsyncLink>
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
        const routes = prepareRoutes([
          { name: "Test", path: "test" },
          {
            name: "Slow",
            path: "slow",
            resolve() {
              // takes 500ms to resolve
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve("slow");
                }, 500);
              });
            }
          },
          {
            name: "Fast",
            path: "fast"
          },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(InMemory, routes);
        const Router = curiProvider(router);

        ReactDOM.render(
          <Router>
            <React.Fragment>
              <AsyncLink name="Slow">
                {navigating => {
                  return <div>Slow {navigating.toString()}</div>;
                }}
              </AsyncLink>
              <AsyncLink name="Fast">
                {navigating => {
                  return <div>Fast {navigating.toString()}</div>;
                }}
              </AsyncLink>
            </React.Fragment>
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
        const routes = prepareRoutes([
          { name: "Test", path: "test" },
          {
            name: "Loader",
            path: "load",
            resolve() {
              return Promise.resolve("done");
            }
          },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(InMemory, routes);
        const Router = curiProvider(router);

        ReactDOM.render(
          <Router>
            <AsyncLink name="Loader">
              {navigating => {
                return <div>{navigating.toString()}</div>;
              }}
            </AsyncLink>
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

      it("does not try to update state if component has unmounted", done => {
        const realError = console.error;
        const mockError = jest.fn();
        console.error = mockError;

        const routes = prepareRoutes([
          { name: "Test", path: "test" },
          {
            name: "Slow",
            path: "slow",
            resolve() {
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
          },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(InMemory, routes);
        const Router = curiProvider(router);

        ReactDOM.render(
          <Router>
            <AsyncLink name="Slow">
              {navigating => {
                return <div>{navigating.toString()}</div>;
              }}
            </AsyncLink>
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
      const mockNavigate = jest.fn();
      const routes = prepareRoutes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(InMemory, routes);
      router.history.navigate = mockNavigate;
      const Router = curiProvider(router);

      ReactDOM.render(
        <Router>
          <AsyncLink name="Test" hash="thing" query="one=1" state="yo">
            {() => null}
          </AsyncLink>
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

    describe("onNav", () => {
      it("calls onNav prop func if provided", () => {
        const mockNavigate = jest.fn();
        const onNav = jest.fn();
        const routes = prepareRoutes([
          { name: "Test", path: "test" },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(InMemory, routes);
        router.history.navigate = mockNavigate;
        const Router = curiProvider(router);

        ReactDOM.render(
          <Router>
            <AsyncLink name="Test" onNav={onNav}>
              {() => null}
            </AsyncLink>
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
        const routes = prepareRoutes([
          { name: "Test", path: "test" },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(InMemory, routes);
        router.history.navigate = mockNavigate;
        const Router = curiProvider(router);

        ReactDOM.render(
          <Router>
            <AsyncLink name="Test" onNav={onNav}>
              {() => null}
            </AsyncLink>
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
      const routes = prepareRoutes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(InMemory, routes);
      router.history.navigate = mockNavigate;
      const Router = curiProvider(router);

      ReactDOM.render(
        <Router>
          <AsyncLink name="Test">{() => null}</AsyncLink>
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
      const routes = prepareRoutes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(InMemory, routes);
      router.history.navigate = mockNavigate;
      const Router = curiProvider(router);

      ReactDOM.render(
        <Router>
          <AsyncLink name="Test">{() => null}</AsyncLink>
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
