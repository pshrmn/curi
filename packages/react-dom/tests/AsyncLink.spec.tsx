import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { in_memory } from "@hickory/in-memory";
import { create_router, prepare_routes } from "@curi/router";

import { create_router_component, AsyncLink } from "@curi/react-dom";

function sleep(period) {
  return new Promise(resolve => setTimeout(resolve, period));
}

describe("<AsyncLink>", () => {
  let node;
  let router, Router: React.FunctionComponent;
  const routes = prepare_routes([
    { name: "Test", path: "" },
    { name: "Best", path: "best" },
    { name: "Catch All", path: "(.*)" }
  ]);

  beforeEach(() => {
    node = document.createElement("div");
    router = create_router(in_memory, routes);
    Router = create_router_component(router);
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
        const routes = prepare_routes([{ name: "Catch All", path: "(.*)" }]);
        const router = create_router(in_memory, routes, {
          history: {
            locations: ["/the-initial-location"]
          }
        });
        const Router = create_router_component(router);
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
      const routes = prepare_routes([
        { name: "Park", path: "park/:name" },
        { name: "Catch All", path: "(.*)" }
      ]);

      beforeEach(() => {
        router = create_router(in_memory, routes);
        Router = create_router_component(router);
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

        const new_params = { name: "Yellowstone" };
        ReactDOM.render(
          <Router>
            <AsyncLink name="Park" params={new_params}>
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
        const routes = prepare_routes([
          { name: "Test", path: "test" },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = create_router(in_memory, routes);
        const Router = create_router_component(router);
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
      const routes = prepare_routes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = create_router(in_memory, routes);
      const Router = create_router_component(router);
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
      const routes = prepare_routes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = create_router(in_memory, routes);
      const Router = create_router_component(router);
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
      const routes = prepare_routes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = create_router(in_memory, routes);
      const mock_navigate = jest.fn();
      router.history.navigate = mock_navigate;
      const Router = create_router_component(router);
      ReactDOM.render(
        <Router>
          <AsyncLink name="Test">{() => null}</AsyncLink>
        </Router>,
        node
      );
      const a = node.querySelector("a");
      const left_click_event = {
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
      Simulate.click(a, left_click_event);
      expect(mock_navigate.mock.calls.length).toBe(1);
    });

    describe("children(navigating)", () => {
      it("children(true) after clicking", () => {
        // if a link has no on methods, finished will be called almost
        // immediately (although this style should only be used for routes
        // with on methods)
        const routes = prepare_routes([
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
        const router = create_router(in_memory, routes);
        const Router = create_router_component(router);

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
        const left_click_event = {
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
        Simulate.click(a, left_click_event);
        expect(a.textContent).toBe("true");
      });

      it("children(false) when navigation is cancelled", () => {
        const routes = prepare_routes([
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
        const router = create_router(in_memory, routes);
        const Router = create_router_component(router);

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
        const left_click_event = {
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
        Simulate.click(slowLink, left_click_event);
        expect(slowLink.textContent).toBe("Slow true");

        Simulate.click(fastLink, left_click_event);
        expect(slowLink.textContent).toBe("Slow false");
      });

      it("children(false) when navigation is finished", async () => {
        const routes = prepare_routes([
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
        const router = create_router(in_memory, routes);
        const Router = create_router_component(router);

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
        const left_click_event = {
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
          Simulate.click(a, left_click_event);
        });

        // text is changed to true after clicking the link
        expect(a.textContent).toBe("true");

        // wait for the navigation to finish
        await act(async () => {
          await sleep(50);
        });

        const { response } = router.current();
        expect(response.name).toBe("Loader");
        // text has reverted to false
        expect(a.textContent).toBe("false");
      });

      it("does not try to update state if component has unmounted", done => {
        const realError = console.error;
        const mockError = jest.fn();
        console.error = mockError;

        const routes = prepare_routes([
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
        const router = create_router(in_memory, routes);
        const Router = create_router_component(router);

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
        const left_click_event = {
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
        Simulate.click(a, left_click_event);

        // unmount the Link to verify that it doesn't call setState()
        ReactDOM.unmountComponentAtNode(node);
      });
    });

    it("includes hash, query, and state in location passed to history.navigate", () => {
      const mock_navigate = jest.fn();
      const routes = prepare_routes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = create_router(in_memory, routes);
      router.history.navigate = mock_navigate;
      const Router = create_router_component(router);

      ReactDOM.render(
        <Router>
          <AsyncLink name="Test" hash="thing" query="one=1" state="yo">
            {() => null}
          </AsyncLink>
        </Router>,
        node
      );
      const a = node.querySelector("a");
      const left_click_event = {
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
      Simulate.click(a, left_click_event);
      const mockLocation = mock_navigate.mock.calls[0][0];
      expect(mockLocation).toMatchObject({
        pathname: "/test",
        hash: "thing",
        query: "one=1",
        state: "yo"
      });
    });

    describe("onNav", () => {
      it("calls onNav prop func if provided", () => {
        const mock_navigate = jest.fn();
        const onNav = jest.fn();
        const routes = prepare_routes([
          { name: "Test", path: "test" },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = create_router(in_memory, routes);
        router.history.navigate = mock_navigate;
        const Router = create_router_component(router);

        ReactDOM.render(
          <Router>
            <AsyncLink name="Test" onNav={onNav}>
              {() => null}
            </AsyncLink>
          </Router>,
          node
        );
        const a = node.querySelector("a");
        const left_click_event = {
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
        Simulate.click(a, left_click_event);
        expect(onNav.mock.calls.length).toBe(1);
        expect(mock_navigate.mock.calls.length).toBe(1);
      });

      it("does not call history.navigate if onNav prevents default", () => {
        const mock_navigate = jest.fn();
        const onNav = jest.fn(event => {
          event.preventDefault();
        });
        const routes = prepare_routes([
          { name: "Test", path: "test" },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = create_router(in_memory, routes);
        router.history.navigate = mock_navigate;
        const Router = create_router_component(router);

        ReactDOM.render(
          <Router>
            <AsyncLink name="Test" onNav={onNav}>
              {() => null}
            </AsyncLink>
          </Router>,
          node
        );
        const a = node.querySelector("a");
        const left_click_event = {
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
        Simulate.click(a, left_click_event);
        expect(onNav.mock.calls.length).toBe(1);
        expect(mock_navigate.mock.calls.length).toBe(0);
      });
    });

    it("doesn't call history.navigate for modified clicks", () => {
      const mock_navigate = jest.fn();
      const routes = prepare_routes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = create_router(in_memory, routes);
      router.history.navigate = mock_navigate;
      const Router = create_router_component(router);

      ReactDOM.render(
        <Router>
          <AsyncLink name="Test">{() => null}</AsyncLink>
        </Router>,
        node
      );
      const a = node.querySelector("a");
      const modified_click_event = {
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
        const event_copy = Object.assign({}, modified_click_event);
        event_copy[m] = true;
        Simulate.click(a, event_copy);
        expect(mock_navigate.mock.calls.length).toBe(0);
      });
    });

    it("doesn't call history.navigate if event.preventDefault has been called", () => {
      const mock_navigate = jest.fn();
      const routes = prepare_routes([
        { name: "Test", path: "test" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = create_router(in_memory, routes);
      router.history.navigate = mock_navigate;
      const Router = create_router_component(router);

      ReactDOM.render(
        <Router>
          <AsyncLink name="Test">{() => null}</AsyncLink>
        </Router>,
        node
      );
      const a = node.querySelector("a");
      const prevented_event = {
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
      Simulate.click(a, prevented_event);
      expect(mock_navigate.mock.calls.length).toBe(0);
    });
  });
});
