import "jest";
import React from "react";
import "react-native";
import renderer from "react-test-renderer";
import InMemory from "@hickory/in-memory";
import { curi, prepareRoutes } from "@curi/router";
import { TouchableHighlight, Text } from "react-native";

// @ts-ignore (resolved by jest)
import { curiProvider, Link } from "@curi/react-native";

import { NavType } from "@hickory/root";

// play nice
function fakeEvent(props = {}) {
  return {
    defaultPrevented: false,
    preventDefault() {
      this.defaultPrevented = true;
    },
    ...props
  };
}

describe("<Link>", () => {
  describe("to", () => {
    it('warns when using "to" instead of "name"', () => {
      // this test needs to be called first in order to catch the warning
      const realWarn = console.warn;
      const fakeWarn = jest.fn();
      console.warn = fakeWarn;

      const history = InMemory();
      const routes = prepareRoutes([
        { name: "Test", path: "" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(history, routes);
      const Router = curiProvider(router);

      const tree = renderer.create(
        <Router>
          {() => (
            <Link to="Test">
              <Text>Test</Text>
            </Link>
          )}
        </Router>
      );

      expect(fakeWarn.mock.calls.length).toBe(1);
      expect(fakeWarn.mock.calls[0][0]).toBe(`Deprecation warning:
The "to" prop should be replaced with the "name" prop. The "to" prop will be removed in @curi/react-dom v2.

<Link name="Route Name">...</Link>`);

      console.warn = realWarn;
    });

    it('works the same as "name"', () => {
      const history = InMemory();
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;
      const routes = prepareRoutes([
        { name: "Test", path: "" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(history, routes);
      const Router = curiProvider(router);

      const tree = renderer.create(
        <Router>
          {() => (
            <Link to="Test">
              <Text>Test</Text>
            </Link>
          )}
        </Router>
      );

      const anchor = tree.root.findByType(TouchableHighlight);
      anchor.props.onPress(fakeEvent());
      expect(mockNavigate.mock.calls[0][0].pathname).toBe("/");
    });
  });

  describe("anchor", () => {
    it("renders a <TouchableHighlight> by default", () => {
      const history = InMemory();
      const routes = prepareRoutes([
        { name: "Test", path: "" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(history, routes);
      const Router = curiProvider(router);
      const tree = renderer.create(
        <Router>
          {() => (
            <Link name="Test">
              <Text>Test</Text>
            </Link>
          )}
        </Router>
      );
      const anchor = tree.root.findByType(TouchableHighlight);
      expect(anchor).toBeDefined();
    });

    it("when provided, it renders the component instead of an anchor", () => {
      const history = InMemory();
      const routes = prepareRoutes([
        { name: "Test", path: "" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(history, routes);
      const Router = curiProvider(router);

      const StyledAnchor = props => (
        <TouchableHighlight style={{ borderColor: "orange" }} {...props} />
      );

      const tree = renderer.create(
        <Router>
          {() => (
            <Link name="Test" anchor={StyledAnchor}>
              <Text>Test</Text>
            </Link>
          )}
        </Router>
      );
      const anchor = tree.root.find(StyledAnchor);
      expect(anchor).toBeDefined();
    });
  });

  describe("name", () => {
    it("uses the pathname from current response's location if 'name' is not provided", () => {
      const history = InMemory({ locations: ["/the-initial-location"] });
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;
      const routes = prepareRoutes([{ name: "Catch All", path: "(.*)" }]);
      const router = curi(history, routes);
      const Router = curiProvider(router);

      const tree = renderer.create(
        <Router>
          {() => (
            <Link name={null}>
              <Text>Test</Text>
            </Link>
          )}
        </Router>
      );
      const anchor = tree.root.findByType(TouchableHighlight);
      anchor.props.onPress(fakeEvent());
      expect(mockNavigate.mock.calls[0][0].pathname).toBe(
        "/the-initial-location"
      );
    });
  });

  describe("params", () => {
    const routes = prepareRoutes([
      { name: "Park", path: "park/:name" },
      { name: "Catch All", path: "(.*)" }
    ]);

    it("uses params to generate the location to navigate to", () => {
      const history = InMemory();
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;

      const router = curi(history, routes);
      const Router = curiProvider(router);

      const params = { name: "Glacier" };
      const tree = renderer.create(
        <Router>
          {() => (
            <Link name="Park" params={params}>
              <Text>Test</Text>
            </Link>
          )}
        </Router>
      );
      const anchor = tree.root.findByType(TouchableHighlight);
      anchor.props.onPress(fakeEvent());
      expect(mockNavigate.mock.calls[0][0].pathname).toBe("/park/Glacier");
    });

    it("updates location to navigate to when props change", () => {
      const history = InMemory();
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;

      const router = curi(history, routes);
      const Router = curiProvider(router);

      const params = { name: "Glacier" };
      const tree = renderer.create(
        <Router>
          {() => (
            <Link name="Park" params={params}>
              <Text>Test</Text>
            </Link>
          )}
        </Router>
      );
      const anchor = tree.root.findByType(TouchableHighlight);
      anchor.props.onPress(fakeEvent());
      expect(mockNavigate.mock.calls[0][0].pathname).toBe("/park/Glacier");

      const newParams = { name: "Yellowstone" };
      tree.update(
        <Router>
          {() => (
            <Link name="Park" params={newParams}>
              <Text>Test</Text>
            </Link>
          )}
        </Router>
      );
      anchor.props.onPress(fakeEvent());
      expect(mockNavigate.mock.calls[1][0].pathname).toBe("/park/Yellowstone");
    });
  });

  describe("anchorProps", () => {
    describe("additional props (deprecated)", () => {
      it("warns when passing additional props to the <Link>", () => {
        const realWarn = console.warn;
        const fakeWarn = jest.fn();
        console.warn = fakeWarn;

        const history = InMemory({ locations: ["/the-initial-location"] });
        const mockNavigate = jest.fn();
        history.navigate = mockNavigate;
        const routes = prepareRoutes([
          { name: "Test", path: "" },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(history, routes);
        const Router = curiProvider(router);

        const style = { backgroundColor: "red" };
        const tree = renderer.create(
          <Router>
            {() => (
              <Link to="Test" style={style}>
                <Text>Test</Text>
              </Link>
            )}
          </Router>
        );

        expect(fakeWarn.mock.calls.length).toBe(1);
        expect(fakeWarn.mock.calls[0][0]).toBe(`Deprecation warning:
Passing additional props to a <Link> will no longer be forwarded to the rendered component in v2.

Instead, please use the "anchorProps" prop to pass an object of props to be attached to the component.

<Link to="Route Name" anchorProps={{ className: "test" }}>`);

        console.warn = realWarn;
      });

      it("passes additional props to the anchor", () => {
        const history = InMemory({ locations: ["/the-initial-location"] });
        const mockNavigate = jest.fn();
        history.navigate = mockNavigate;
        const routes = prepareRoutes([
          { name: "Test", path: "" },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(history, routes);
        const Router = curiProvider(router);

        const style = { backgroundColor: "red" };
        const tree = renderer.create(
          <Router>
            {() => (
              <Link to="Test" style={style}>
                <Text>Test</Text>
              </Link>
            )}
          </Router>
        );
        const anchor = tree.root.findByType(TouchableHighlight);
        expect(anchor.props.style).toMatchObject(style);
      });
    });

    it("passes anchorProps to the rendered anchor", () => {
      const history = InMemory({ locations: ["/the-initial-location"] });
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;
      const routes = prepareRoutes([
        { name: "Test", path: "" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(history, routes);
      const Router = curiProvider(router);

      const style = { backgroundColor: "red" };
      const tree = renderer.create(
        <Router>
          {() => (
            <Link to="Test" anchorProps={{ style }}>
              <Text>Test</Text>
            </Link>
          )}
        </Router>
      );
      const anchor = tree.root.findByType(TouchableHighlight);
      expect(anchor.props.style).toMatchObject(style);
    });
  });

  describe("ref", () => {
    it("returns the anchor's ref, not the link's", () => {
      const history = InMemory({ locations: ["/the-initial-location"] });
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;
      const routes = prepareRoutes([
        { name: "Parks", path: "parks" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(history, routes);
      const Router = curiProvider(router);

      const ref = React.createRef();
      const tree = renderer.create(
        <Router>
          {() => (
            <Link name="Parks" ref={ref}>
              <Text>Test</Text>
            </Link>
          )}
        </Router>
      );
      const anchor = tree.root.findByType(TouchableHighlight);
      expect(anchor.instance).toBe(ref.current);
    });
  });

  describe("children", () => {
    describe("React Node", () => {
      it("renders the provided children value(s)", () => {
        const history = InMemory();
        const routes = prepareRoutes([
          { name: "Test", path: "" },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(history, routes);
        const Router = curiProvider(router);

        const children = "Test Value";
        const tree = renderer.create(
          <Router>
            {() => (
              <Link name="Test">
                <Text>{children}</Text>
              </Link>
            )}
          </Router>
        );
        const anchor = tree.root.findByType(TouchableHighlight);
        const text = anchor.findByType(Text);
        expect(anchor).toBeDefined();
        expect(text.instance.props.children).toBe(children);
      });
    });

    describe("render-invoked function", () => {
      it("calls the function with the component's navigating state (initial navigating=false)", () => {
        const history = InMemory();
        const routes = prepareRoutes([
          { name: "Test", path: "" },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(history, routes);
        const Router = curiProvider(router);

        const tree = renderer.create(
          <Router>
            {() => (
              <Link name="Test">
                {navigating => {
                  expect(navigating).toBe(false);
                  return <Text>Test</Text>;
                }}
              </Link>
            )}
          </Router>
        );
      });
    });
  });

  describe("pressing a link", () => {
    describe("navigation method", () => {
      let history, mockNavigate, mockPush, mockReplace;

      beforeEach(() => {
        history = InMemory();
        history.navigate = mockNavigate = jest.fn();
      });

      it("[default] navigates as ANCHOR", () => {
        const routes = prepareRoutes([
          { name: "Test", path: "" },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(history, routes);
        const Router = curiProvider(router);

        const tree = renderer.create(
          <Router>
            {() => (
              <Link name="Test">
                <Text>Test</Text>
              </Link>
            )}
          </Router>
        );
        const anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(mockNavigate.mock.calls[0][1]).toBe("ANCHOR");
      });

      it("method='ANCHOR'", () => {
        const routes = prepareRoutes([
          { name: "Test", path: "" },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(history, routes);
        const Router = curiProvider(router);

        const tree = renderer.create(
          <Router>
            {() => (
              <Link name="Test" method="ANCHOR">
                <Text>Test</Text>
              </Link>
            )}
          </Router>
        );
        const anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(mockNavigate.mock.calls[0][1]).toBe("ANCHOR");
      });

      it("method='PUSH'", () => {
        const routes = prepareRoutes([
          { name: "Test", path: "" },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(history, routes);
        const Router = curiProvider(router);

        const tree = renderer.create(
          <Router>
            {() => (
              <Link name="Test" method="PUSH">
                <Text>Test</Text>
              </Link>
            )}
          </Router>
        );
        const anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(mockNavigate.mock.calls[0][1]).toBe("PUSH");
      });

      it("method='REPLACE'", () => {
        const routes = prepareRoutes([
          { name: "Test", path: "" },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(history, routes);
        const Router = curiProvider(router);

        const tree = renderer.create(
          <Router>
            {() => (
              <Link name="Test" method="REPLACE">
                <Text>Test</Text>
              </Link>
            )}
          </Router>
        );
        const anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(mockNavigate.mock.calls[0][1]).toBe("REPLACE");
      });

      it("[unknown] uses ANCHOR", () => {
        const routes = prepareRoutes([
          { name: "Test", path: "" },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(history, routes);
        const Router = curiProvider(router);

        const tree = renderer.create(
          <Router>
            {() => (
              <Link name="Test" method={"whatchamacallit" as NavType}>
                <Text>Test</Text>
              </Link>
            )}
          </Router>
        );
        const anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(mockNavigate.mock.calls[0][1]).toBe("ANCHOR");
      });
    });

    describe("children(navigating)", () => {
      it("children(true) after clicking", () => {
        // if a link has no on methods, finished will be called almost
        // immediately (although this style should only be used for routes
        // with resolve methods)
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

        const tree = renderer.create(
          <Router>
            {() => (
              <Link name="Test">
                {navigating => {
                  return <Text>{navigating.toString()}</Text>;
                }}
              </Link>
            )}
          </Router>
        );
        const anchor = tree.root.findByType(TouchableHighlight);
        const text = anchor.findByType(Text);
        expect(text.instance.props.children).toBe("false");

        anchor.props.onPress(fakeEvent());

        expect(text.instance.props.children).toBe("true");
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

        const tree = renderer.create(
          <Router>
            {() => (
              <React.Fragment>
                <Link name="Slow">
                  {navigating => {
                    return <Text>{`Slow ${navigating.toString()}`}</Text>;
                  }}
                </Link>
                <Link name="Fast">
                  {navigating => {
                    return <Text>{`Fast ${navigating.toString()}`}</Text>;
                  }}
                </Link>
              </React.Fragment>
            )}
          </Router>
        );
        const [slowLink, fastLink] = tree.root.findAllByType(
          TouchableHighlight
        );

        const text = slowLink.findByType(Text);

        expect(text.instance.props.children).toBe("Slow false");

        slowLink.props.onPress(fakeEvent());
        expect(text.instance.props.children).toBe("Slow true");

        fastLink.props.onPress(fakeEvent());
        expect(text.instance.props.children).toBe("Slow false");
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

        const tree = renderer.create(
          <Router>
            {() => (
              <Link name="Loader">
                {navigating => {
                  return <Text>{navigating.toString()}</Text>;
                }}
              </Link>
            )}
          </Router>
        );
        const anchor = tree.root.findByType(TouchableHighlight);
        const text = anchor.findByType(Text);
        expect(text.instance.props.children).toBe("false");

        anchor.props.onPress(fakeEvent());
        expect(text.instance.props.children).toBe("true");

        router.once(
          ({ response }) => {
            expect(response.name).toBe("Loader");
            expect(text.instance.props.children).toBe("false");
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
            name: "Blork",
            path: "blork",
            resolve: {
              test: () => {
                return new Promise(resolve => {
                  setTimeout(() => {
                    resolve("Finally finished");
                    // need to verify error in another timeout
                    setTimeout(() => {
                      expect(mockError.mock.calls.length).toBe(0);
                      console.error = realError;
                      done();
                    });
                  }, 500);
                });
              }
            }
          },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(history, routes);
        const Router = curiProvider(router);

        const tree = renderer.create(
          <Router>
            {() => (
              <Link name="Blork">
                {navigating => {
                  return <Text>{navigating.toString()}</Text>;
                }}
              </Link>
            )}
          </Router>
        );
        const anchor = tree.root.findByType(TouchableHighlight);

        anchor.props.onPress(fakeEvent());

        tree.unmount();
      });
    });

    it("includes hash, query, and state in location passed to history.navigate", () => {
      const history = InMemory();
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;

      const routes = prepareRoutes([
        { name: "Test", path: "" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(history, routes);
      const Router = curiProvider(router);

      const tree = renderer.create(
        <Router>
          {() => (
            <Link name="Test" hash="thing" query="one=1" state="yo">
              <Text>Test</Text>
            </Link>
          )}
        </Router>
      );
      const anchor = tree.root.findByType(TouchableHighlight);
      anchor.props.onPress(fakeEvent());
      const mockLocation = mockNavigate.mock.calls[0][0];
      expect(mockLocation).toMatchObject({
        pathname: "/",
        hash: "thing",
        query: "one=1",
        state: "yo"
      });
    });

    describe("onPress", () => {
      it("calls onPress prop func if provided", () => {
        const history = InMemory();
        const mockNavigate = jest.fn();
        history.navigate = mockNavigate;
        const onPress = jest.fn();

        const routes = prepareRoutes([
          { name: "Test", path: "" },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(history, routes);
        const Router = curiProvider(router);

        const tree = renderer.create(
          <Router>
            {() => (
              <Link name="Test" onPress={onPress}>
                <Text>Test</Text>
              </Link>
            )}
          </Router>
        );
        const anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(mockNavigate.mock.calls.length).toBe(1);
        expect(onPress.mock.calls.length).toBe(1);
        expect(mockNavigate.mock.calls.length).toBe(1);
      });

      it("does not call history.navigate if onPress prevents default", () => {
        const history = InMemory();
        const mockNavigate = jest.fn();
        history.navigate = mockNavigate;
        const onPress = jest.fn(event => {
          event.preventDefault();
        });

        const routes = prepareRoutes([
          { name: "Test", path: "" },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(history, routes);
        const Router = curiProvider(router);

        const tree = renderer.create(
          <Router>
            {() => (
              <Link name="Test" onPress={onPress}>
                <Text>Test</Text>
              </Link>
            )}
          </Router>
        );
        const anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(onPress.mock.calls.length).toBe(1);
        expect(mockNavigate.mock.calls.length).toBe(0);
      });
    });

    it("doesn't call history.navigate if event.preventDefault has been called", () => {
      const history = InMemory();
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;

      const routes = prepareRoutes([
        { name: "Test", path: "" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(history, routes);
      const Router = curiProvider(router);

      const tree = renderer.create(
        <Router>
          {() => (
            <Link name="Test">
              <Text>Test</Text>
            </Link>
          )}
        </Router>
      );
      const anchor = tree.root.findByType(TouchableHighlight);
      anchor.props.onPress(fakeEvent({ defaultPrevented: true }));
      expect(mockNavigate.mock.calls.length).toBe(0);
    });
  });
});
