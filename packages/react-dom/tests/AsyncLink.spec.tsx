import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { inMemory } from "@hickory/in-memory";
import { createRouter, prepareRoutes } from "@curi/router";

import { sleep } from "../../../utils/tests";

import { createRouterComponent, AsyncLink } from "@curi/react-dom";

describe("<AsyncLink>", () => {
  let node;
  let router, Router: React.FunctionComponent;
  let routes = prepareRoutes([
    { name: "Test", path: "" },
    { name: "Best", path: "best" },
    { name: "Catch All", path: "(.*)" }
  ]);

  beforeEach(() => {
    node = document.createElement("div");
    router = createRouter(inMemory, routes);
    Router = createRouterComponent(router);
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
      let a = node.querySelector("a");
      expect(a).toBeDefined();
    });

    it("renders the provided component instead of an anchor", () => {
      let StyledAnchor = props => <a style={{ color: "orange" }} {...props} />;
      ReactDOM.render(
        <Router>
          <AsyncLink anchor={StyledAnchor} name="Test">
            {() => null}
          </AsyncLink>
        </Router>,
        node
      );
      let a = node.querySelector("a");
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
        let a = node.querySelector("a");
        expect(a.getAttribute("href")).toBe("/");
      });

      it("has no pathname component if name is not provided", () => {
        let routes = prepareRoutes([{ name: "Catch All", path: "(.*)" }]);
        let router = createRouter(inMemory, routes, {
          history: {
            locations: [{ url: "/the-initial-location" }]
          }
        });
        let Router = createRouterComponent(router);
        ReactDOM.render(
          <Router>
            <AsyncLink hash="test">{() => null}</AsyncLink>
          </Router>,
          node
        );
        let a = node.querySelector("a");
        expect(a.getAttribute("href")).toBe("#test");
      });
    });

    describe("params", () => {
      let router, Router;
      let routes = prepareRoutes([
        { name: "Park", path: "park/:name" },
        { name: "Catch All", path: "(.*)" }
      ]);

      beforeEach(() => {
        router = createRouter(inMemory, routes);
        Router = createRouterComponent(router);
      });

      it("uses params to generate the href", () => {
        let params = { name: "Glacier" };
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
      });

      it("updates href when props change", () => {
        let params = { name: "Glacier" };
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

        let newParams = { name: "Yellowstone" };
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
        let routes = prepareRoutes([
          { name: "Test", path: "test" },
          { name: "Catch All", path: "(.*)" }
        ]);
        let router = createRouter(inMemory, routes);
        let Router = createRouterComponent(router);
        ReactDOM.render(
          <Router>
            <AsyncLink name="Test" query="one=two" hash="hashtag">
              {() => null}
            </AsyncLink>
          </Router>,
          node
        );
        let a = node.querySelector("a");
        expect(a.getAttribute("href")).toBe("/test?one=two#hashtag");
      });
    });
  });

  describe("additional props", () => {
    it("passes additional props to the rendered anchor", () => {
      ReactDOM.render(
        <Router>
          <AsyncLink name="Test" className="hi">
            {() => null}
          </AsyncLink>
        </Router>,
        node
      );

      let a = node.querySelector("a");
      expect(a.classList.contains("hi")).toBe(true);
    });

    it('does not overwrite "native" props set on the rendered element', () => {
      ReactDOM.render(
        <Router>
          <AsyncLink name="Test" href="/oh-no">
            {() => <p>Test</p>}
          </AsyncLink>
        </Router>,
        node
      );

      let a = node.querySelector("a");
      expect(a.getAttribute("href")).toBe("/");
    });
  });

  describe("ref", () => {
    it("returns the anchor's ref, not the link's", () => {
      let routes = prepareRoutes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      let router = createRouter(inMemory, routes);
      let Router = createRouterComponent(router);
      let ref = React.createRef();
      ReactDOM.render(
        <Router>
          <AsyncLink name="Test" ref={ref}>
            {() => null}
          </AsyncLink>
        </Router>,
        node
      );
      let a = node.querySelector("a");
      expect(a).toBe(ref.current);
    });
  });

  describe("children", () => {
    it("is called with the <AsyncLink>'s current navigating state (false on mount)", () => {
      let routes = prepareRoutes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      let router = createRouter(inMemory, routes);
      let Router = createRouterComponent(router);
      let children = jest.fn((a: boolean) => null);
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
      let routes = prepareRoutes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      let router = createRouter(inMemory, routes);
      let mockNavigate = jest.fn();
      router.history.navigate = mockNavigate;
      let Router = createRouterComponent(router);
      ReactDOM.render(
        <Router>
          <AsyncLink name="Test">{() => null}</AsyncLink>
        </Router>,
        node
      );
      let a = node.querySelector("a");
      let leftClickEvent = {
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
        let routes = prepareRoutes([
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
        let router = createRouter(inMemory, routes);
        let Router = createRouterComponent(router);

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
        let a = node.querySelector("a");
        expect(a.textContent).toBe("false");
        let leftClickEvent = {
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
        let routes = prepareRoutes([
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
        let router = createRouter(inMemory, routes);
        let Router = createRouterComponent(router);

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
        let [slowLink, fastLink] = node.querySelectorAll("a");
        expect(slowLink.textContent).toBe("Slow false");
        let leftClickEvent = {
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

      it("children(false) when navigation is finished", async () => {
        let routes = prepareRoutes([
          { name: "Test", path: "test" },
          {
            name: "Loader",
            path: "load",
            resolve() {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve("done");
                }, 25);
              });
            }
          },
          { name: "Catch All", path: "(.*)" }
        ]);
        let router = createRouter(inMemory, routes);
        let Router = createRouterComponent(router);

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
        let a = node.querySelector("a");
        expect(a.textContent).toBe("false");
        let leftClickEvent = {
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

        await act(async () => {
          Simulate.click(a, leftClickEvent);
        });

        // text is changed to true after clicking the link
        expect(a.textContent).toBe("true");

        // wait for the navigation to finish
        await act(async () => {
          await sleep(50);
        });

        let { response } = router.current();
        expect(response.name).toBe("Loader");
        // text has reverted to false
        expect(a.textContent).toBe("false");
      });

      it("does not try to update state if component has unmounted", done => {
        let realError = console.error;
        let mockError = jest.fn();
        console.error = mockError;

        let routes = prepareRoutes([
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
        let router = createRouter(inMemory, routes);
        let Router = createRouterComponent(router);

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
        let a = node.querySelector("a");
        expect(a.textContent).toBe("false");
        let leftClickEvent = {
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
      let mockNavigate = jest.fn();
      let routes = prepareRoutes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      let router = createRouter(inMemory, routes);
      router.history.navigate = mockNavigate;
      let Router = createRouterComponent(router);

      ReactDOM.render(
        <Router>
          <AsyncLink name="Test" hash="thing" query="one=1" state="yo">
            {() => null}
          </AsyncLink>
        </Router>,
        node
      );
      let a = node.querySelector("a");
      let leftClickEvent = {
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
      let mockURL = mockNavigate.mock.calls[0][0];
      expect(mockURL).toMatchObject({
        url: "/test?one=1#thing",
        state: "yo"
      });
    });

    describe("onNav", () => {
      it("calls onNav prop func if provided", () => {
        let mockNavigate = jest.fn();
        let onNav = jest.fn();
        let routes = prepareRoutes([
          { name: "Test", path: "test" },
          { name: "Catch All", path: "(.*)" }
        ]);
        let router = createRouter(inMemory, routes);
        router.history.navigate = mockNavigate;
        let Router = createRouterComponent(router);

        ReactDOM.render(
          <Router>
            <AsyncLink name="Test" onNav={onNav}>
              {() => null}
            </AsyncLink>
          </Router>,
          node
        );
        let a = node.querySelector("a");
        let leftClickEvent = {
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
        let mockNavigate = jest.fn();
        let onNav = jest.fn(event => {
          event.preventDefault();
        });
        let routes = prepareRoutes([
          { name: "Test", path: "test" },
          { name: "Catch All", path: "(.*)" }
        ]);
        let router = createRouter(inMemory, routes);
        router.history.navigate = mockNavigate;
        let Router = createRouterComponent(router);

        ReactDOM.render(
          <Router>
            <AsyncLink name="Test" onNav={onNav}>
              {() => null}
            </AsyncLink>
          </Router>,
          node
        );
        let a = node.querySelector("a");
        let leftClickEvent = {
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
      let mockNavigate = jest.fn();
      let routes = prepareRoutes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      let router = createRouter(inMemory, routes);
      router.history.navigate = mockNavigate;
      let Router = createRouterComponent(router);

      ReactDOM.render(
        <Router>
          <AsyncLink name="Test">{() => null}</AsyncLink>
        </Router>,
        node
      );
      let a = node.querySelector("a");
      let modifiedClickEvent = {
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
      let modifiers = ["metaKey", "altKey", "ctrlKey", "shiftKey"];
      modifiers.forEach(m => {
        let eventCopy = Object.assign({}, modifiedClickEvent);
        eventCopy[m] = true;
        Simulate.click(a, eventCopy);
        expect(mockNavigate.mock.calls.length).toBe(0);
      });
    });

    it("doesn't call history.navigate if event.preventDefault has been called", () => {
      let mockNavigate = jest.fn();
      let routes = prepareRoutes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      let router = createRouter(inMemory, routes);
      router.history.navigate = mockNavigate;
      let Router = createRouterComponent(router);

      ReactDOM.render(
        <Router>
          <AsyncLink name="Test">{() => null}</AsyncLink>
        </Router>,
        node
      );
      let a = node.querySelector("a");
      let preventedEvent = {
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

    describe("target", () => {
      it("calls history.navigate if target is not defined", () => {
        let mockNavigate = jest.fn();
        let routes = prepareRoutes([
          { name: "Test", path: "test" },
          { name: "Catch All", path: "(.*)" }
        ]);
        let router = createRouter(inMemory, routes);
        router.history.navigate = mockNavigate;
        let Router = createRouterComponent(router);

        ReactDOM.render(
          <Router>
            <AsyncLink name="Test">{() => null}</AsyncLink>
          </Router>,
          node
        );
        let a = node.querySelector("a");
        let event = {
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
        act(() => {
          Simulate.click(a, event);
        });
        expect(mockNavigate.mock.calls.length).toBe(1);
      });

      it("doesn't call history.navigate if target is defined", () => {
        let mockNavigate = jest.fn();
        let routes = prepareRoutes([
          { name: "Test", path: "test" },
          { name: "Catch All", path: "(.*)" }
        ]);
        let router = createRouter(inMemory, routes);
        router.history.navigate = mockNavigate;
        let Router = createRouterComponent(router);

        ReactDOM.render(
          <Router>
            <AsyncLink name="Test" target="_blank">
              {() => null}
            </AsyncLink>
          </Router>,
          node
        );
        let a = node.querySelector("a");
        let event = {
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
        act(() => {
          Simulate.click(a, event);
        });
        expect(mockNavigate.mock.calls.length).toBe(0);
      });
    });
  });
});
