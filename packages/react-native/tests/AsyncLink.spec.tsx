import "jest";
import React from "react";
import "react-native";
import renderer from "react-test-renderer";
import { inMemory } from "@hickory/in-memory";
import { createRouter, prepareRoutes } from "@curi/router";
import { TouchableHighlight, Text } from "react-native";

import { sleep } from "../../../utils/tests";

import { createRouterComponent, AsyncLink } from "@curi/react-native";

let { act } = renderer;

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

describe("<AsyncLink>", () => {
  describe("anchor", () => {
    it("renders a <TouchableHighlight> by default", () => {
      let routes = prepareRoutes([
        { name: "Test", path: "" },
        { name: "Catch All", path: "(.*)" }
      ]);
      let router = createRouter(inMemory, routes);
      let Router = createRouterComponent(router);
      let tree = renderer.create(
        <Router>
          <AsyncLink name="Test">
            {navigating => <Text>{navigating}</Text>}
          </AsyncLink>
        </Router>
      );
      let anchor = tree.root.findByType(TouchableHighlight);
      expect(anchor).toBeDefined();
    });

    it("when provided, it renders the component instead of an anchor", () => {
      let routes = prepareRoutes([
        { name: "Test", path: "" },
        { name: "Catch All", path: "(.*)" }
      ]);
      let router = createRouter(inMemory, routes);
      let Router = createRouterComponent(router);

      let StyledAnchor = props => (
        <TouchableHighlight style={{ borderColor: "orange" }} {...props} />
      );

      let tree = renderer.create(
        <Router>
          <AsyncLink name="Test" anchor={StyledAnchor}>
            {navigating => <Text>{navigating}</Text>}
          </AsyncLink>
        </Router>
      );
      let anchor = tree.root.find(StyledAnchor);
      expect(anchor).toBeDefined();
    });
  });

  describe("navigation location", () => {
    describe("name", () => {
      it("has no pathname component if name is not provided", async () => {
        let mockNavigate = jest.fn();
        let routes = prepareRoutes([{ name: "Catch All", path: "(.*)" }]);
        let router = createRouter(inMemory, routes, {
          history: {
            locations: [{ url: "/the-initial-location" }]
          }
        });
        router.history.navigate = mockNavigate;
        let Router = createRouterComponent(router);

        let tree = renderer.create(
          <Router>
            <AsyncLink name={null} hash="test">
              {navigating => <Text>{navigating}</Text>}
            </AsyncLink>
          </Router>
        );
        let anchor = tree.root.findByType(TouchableHighlight);
        await act(async () => {
          anchor.props.onPress(fakeEvent());
        });
        expect(mockNavigate.mock.calls[0][0]).toMatchObject({
          url: "#test"
        });
      });
    });

    describe("params", () => {
      let routes = prepareRoutes([
        { name: "Park", path: "park/:name" },
        { name: "Catch All", path: "(.*)" }
      ]);

      it("uses params to generate the location to navigate to", async () => {
        let mockNavigate = jest.fn();
        let router = createRouter(inMemory, routes);
        router.history.navigate = mockNavigate;
        let Router = createRouterComponent(router);

        let params = { name: "Glacier" };
        let tree = renderer.create(
          <Router>
            <AsyncLink name="Park" params={params}>
              {navigating => <Text>{navigating}</Text>}
            </AsyncLink>
          </Router>
        );
        let anchor = tree.root.findByType(TouchableHighlight);
        await act(async () => {
          anchor.props.onPress(fakeEvent());
        });
        expect(mockNavigate.mock.calls[0][0]).toMatchObject({
          url: "/park/Glacier"
        });
      });

      it("updates location to navigate to when props change", async () => {
        let mockNavigate = jest.fn();
        let router = createRouter(inMemory, routes);
        router.history.navigate = mockNavigate;
        let Router = createRouterComponent(router);

        let params = { name: "Glacier" };
        let tree = renderer.create(
          <Router>
            <AsyncLink name="Park" params={params}>
              {navigating => <Text>{navigating}</Text>}
            </AsyncLink>
          </Router>
        );
        let anchor = tree.root.findByType(TouchableHighlight);
        await act(async () => {
          anchor.props.onPress(fakeEvent());
        });
        expect(mockNavigate.mock.calls[0][0]).toMatchObject({
          url: "/park/Glacier"
        });

        let newParams = { name: "Yellowstone" };
        await act(async () => {
          tree.update(
            <Router>
              <AsyncLink name="Park" params={newParams}>
                {navigating => <Text>{navigating}</Text>}
              </AsyncLink>
            </Router>
          );
        });

        await act(async () => {
          anchor.props.onPress(fakeEvent());
        });

        expect(mockNavigate.mock.calls[1][0]).toMatchObject({
          url: "/park/Yellowstone"
        });
      });
    });

    describe("hash & query", () => {
      it("merges hash & query props with the pathname when creating href", async () => {
        let mockNavigate = jest.fn();
        let routes = prepareRoutes([
          { name: "Test", path: "test" },
          { name: "Catch All", path: "(.*)" }
        ]);
        let router = createRouter(inMemory, routes);
        router.history.navigate = mockNavigate;
        let Router = createRouterComponent(router);

        let tree = renderer.create(
          <Router>
            <AsyncLink name="Test" query="one=two" hash="hashtag">
              {navigating => <Text>{navigating}</Text>}
            </AsyncLink>
          </Router>
        );

        let anchor = tree.root.findByType(TouchableHighlight);

        await act(async () => {
          anchor.props.onPress(fakeEvent());
        });

        expect(mockNavigate.mock.calls[0][0]).toMatchObject({
          url: "/test?one=two#hashtag"
        });
      });
    });
  });

  describe("additional props", () => {
    it("passes additional props to the rendered anchor", () => {
      let mockNavigate = jest.fn();
      let routes = prepareRoutes([
        { name: "Test", path: "" },
        { name: "Catch All", path: "(.*)" }
      ]);
      let router = createRouter(inMemory, routes, {
        history: {
          locations: [{ url: "/the-initial-location" }]
        }
      });
      router.history.navigate = mockNavigate;
      let Router = createRouterComponent(router);

      let style = { backgroundColor: "red" };
      let tree = renderer.create(
        <Router>
          <AsyncLink name="Test" style={style}>
            {navigating => <Text>{navigating}</Text>}
          </AsyncLink>
        </Router>
      );
      let anchor = tree.root.findByType(TouchableHighlight);
      expect(anchor.props.style).toMatchObject(style);
    });

    it('does not overwrite "native" props set on the rendered element', () => {
      let onPress = jest.fn();

      let routes = prepareRoutes([
        { name: "Test", path: "" },
        { name: "Catch All", path: "(.*)" }
      ]);
      let router = createRouter(inMemory, routes, {
        history: {
          locations: [{ url: "/the-initial-location" }]
        }
      });
      let Router = createRouterComponent(router);

      let tree = renderer.create(
        <Router>
          <AsyncLink name="Test" onPress={onPress}>
            {navigating => <Text>{navigating}</Text>}
          </AsyncLink>
        </Router>
      );

      let anchor = tree.root.findByType(TouchableHighlight);
      expect(anchor.props.onPress).not.toBe(onPress);
    });
  });

  describe("ref", () => {
    it("returns the anchor's ref, not the link's", () => {
      let mockNavigate = jest.fn();
      let routes = prepareRoutes([
        { name: "Parks", path: "parks" },
        { name: "Catch All", path: "(.*)" }
      ]);
      let router = createRouter(inMemory, routes, {
        history: {
          locations: [{ url: "/the-initial-location" }]
        }
      });
      router.history.navigate = mockNavigate;
      let Router = createRouterComponent(router);

      let ref = React.createRef();
      let tree = renderer.create(
        <Router>
          <AsyncLink name="Parks" ref={ref}>
            {navigating => <Text>{navigating}</Text>}
          </AsyncLink>
        </Router>
      );
      let anchor = tree.root.findByType(TouchableHighlight);
      expect(anchor.instance).toBe(ref.current);
    });
  });

  describe("children", () => {
    it("is called with the <AsyncLink>'s current navigating state (false on mount)", () => {
      let routes = prepareRoutes([
        { name: "Test", path: "" },
        { name: "Catch All", path: "(.*)" }
      ]);
      let router = createRouter(inMemory, routes);
      let Router = createRouterComponent(router);

      let tree = renderer.create(
        <Router>
          <AsyncLink name="Test">
            {navigating => {
              expect(navigating).toBe(false);
              return <Text>Test</Text>;
            }}
          </AsyncLink>
        </Router>
      );
    });
  });

  describe("pressing a link", () => {
    describe("navigation method", () => {
      it('method="anchor"', async () => {
        let mockNavigate = jest.fn();
        let routes = prepareRoutes([
          { name: "Test", path: "" },
          { name: "Catch All", path: "(.*)" }
        ]);
        let router = createRouter(inMemory, routes);
        router.history.navigate = mockNavigate;
        let Router = createRouterComponent(router);

        let tree = renderer.create(
          <Router>
            <AsyncLink name="Test" method={"anchor"}>
              {navigating => <Text>{navigating}</Text>}
            </AsyncLink>
          </Router>
        );
        let anchor = tree.root.findByType(TouchableHighlight);
        await act(async () => {
          anchor.props.onPress(fakeEvent());
        });
        expect(mockNavigate.mock.calls[0][1]).toBe("anchor");
      });

      it('method="push"', async () => {
        let mockNavigate = jest.fn();
        let routes = prepareRoutes([
          { name: "Test", path: "" },
          { name: "Catch All", path: "(.*)" }
        ]);
        let router = createRouter(inMemory, routes);
        router.history.navigate = mockNavigate;
        let Router = createRouterComponent(router);

        let tree = renderer.create(
          <Router>
            <AsyncLink name="Test" method={"push"}>
              {navigating => <Text>{navigating}</Text>}
            </AsyncLink>
          </Router>
        );
        let anchor = tree.root.findByType(TouchableHighlight);
        await act(async () => {
          anchor.props.onPress(fakeEvent());
        });
        expect(mockNavigate.mock.calls[0][1]).toBe("push");
      });

      it('method="replace"', async () => {
        let mockNavigate = jest.fn();
        let routes = prepareRoutes([
          { name: "Test", path: "" },
          { name: "Catch All", path: "(.*)" }
        ]);
        let router = createRouter(inMemory, routes);
        router.history.navigate = mockNavigate;
        let Router = createRouterComponent(router);

        let tree = renderer.create(
          <Router>
            <AsyncLink name="Test" method={"replace"}>
              {navigating => <Text>{navigating}</Text>}
            </AsyncLink>
          </Router>
        );
        let anchor = tree.root.findByType(TouchableHighlight);
        await act(async () => {
          anchor.props.onPress(fakeEvent());
        });
        expect(mockNavigate.mock.calls[0][1]).toBe("replace");
      });
    });

    describe("children(navigating)", () => {
      it("children(true) after clicking", async () => {
        // if a link has no on methods, finished will be called almost
        // immediately (although this style should only be used for routes
        // with resolve methods)
        let routes = prepareRoutes([
          {
            name: "Test",
            path: "test",
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

        let tree = renderer.create(
          <Router>
            <AsyncLink name="Test">
              {navigating => {
                return <Text>{navigating.toString()}</Text>;
              }}
            </AsyncLink>
          </Router>
        );
        let anchor = tree.root.findByType(TouchableHighlight);
        let text = anchor.findByType(Text);
        expect(text.instance.props.children).toBe("false");

        await act(async () => {
          anchor.props.onPress(fakeEvent());
        });

        expect(text.instance.props.children).toBe("true");
      });

      it("children(false) when navigation is cancelled", async () => {
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

        let tree = renderer.create(
          <Router>
            <React.Fragment>
              <AsyncLink name="Slow">
                {navigating => {
                  return <Text>{`Slow ${navigating.toString()}`}</Text>;
                }}
              </AsyncLink>
              <AsyncLink name="Fast">
                {navigating => {
                  return <Text>{`Fast ${navigating.toString()}`}</Text>;
                }}
              </AsyncLink>
            </React.Fragment>
          </Router>
        );
        let [slowLink, fastLink] = tree.root.findAllByType(TouchableHighlight);

        let text = slowLink.findByType(Text);

        expect(text.instance.props.children).toBe("Slow false");

        await act(async () => {
          slowLink.props.onPress(fakeEvent());
        });
        expect(text.instance.props.children).toBe("Slow true");

        await act(async () => {
          fastLink.props.onPress(fakeEvent());
        });
        expect(text.instance.props.children).toBe("Slow false");
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

        let tree = renderer.create(
          <Router>
            <AsyncLink name="Loader">
              {navigating => {
                return <Text>{navigating.toString()}</Text>;
              }}
            </AsyncLink>
          </Router>
        );
        let anchor = tree.root.findByType(TouchableHighlight);
        let text = anchor.findByType(Text);
        expect(text.instance.props.children).toBe("false");

        await act(async () => {
          anchor.props.onPress(fakeEvent());
        });
        expect(text.instance.props.children).toBe("true");

        await act(async () => {
          await sleep(50);
        });

        let { response } = router.current();
        expect(response.name).toBe("Loader");
        expect(text.instance.props.children).toBe("false");
      });

      // TODO: run this once act() fix is out (act causes error calls);
      it("does not call setState if component has unmounted", async done => {
        let realError = console.error;
        let mockError = jest.fn();
        console.error = mockError;

        let routes = prepareRoutes([
          { name: "Test", path: "test" },
          {
            name: "Blork",
            path: "blork",
            resolve() {
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
          },
          { name: "Catch All", path: "(.*)" }
        ]);
        let router = createRouter(inMemory, routes);
        let Router = createRouterComponent(router);

        let tree = renderer.create(
          <Router>
            <AsyncLink name="Blork">
              {navigating => {
                return <Text>{navigating.toString()}</Text>;
              }}
            </AsyncLink>
          </Router>
        );
        let anchor = tree.root.findByType(TouchableHighlight);

        await act(async () => {
          anchor.props.onPress(fakeEvent());
        });

        tree.unmount();
      });
    });

    describe("onNav", () => {
      it("calls onNav prop func if provided", async () => {
        let mockNavigate = jest.fn();
        let onNav = jest.fn();
        let routes = prepareRoutes([
          { name: "Test", path: "" },
          { name: "Catch All", path: "(.*)" }
        ]);
        let router = createRouter(inMemory, routes);
        router.history.navigate = mockNavigate;
        let Router = createRouterComponent(router);

        let tree = renderer.create(
          <Router>
            <AsyncLink name="Test" onNav={onNav}>
              {navigating => <Text>{navigating}</Text>}
            </AsyncLink>
          </Router>
        );
        let anchor = tree.root.findByType(TouchableHighlight);

        await act(async () => {
          anchor.props.onPress(fakeEvent());
        });

        expect(mockNavigate.mock.calls.length).toBe(1);
        expect(onNav.mock.calls.length).toBe(1);
        expect(mockNavigate.mock.calls.length).toBe(1);
      });

      it("does not call history.navigate if onNav prevents default", () => {
        let mockNavigate = jest.fn();
        let onNav = jest.fn(event => {
          event.preventDefault();
        });
        let routes = prepareRoutes([
          { name: "Test", path: "" },
          { name: "Catch All", path: "(.*)" }
        ]);
        let router = createRouter(inMemory, routes);
        router.history.navigate = mockNavigate;
        let Router = createRouterComponent(router);

        let tree = renderer.create(
          <Router>
            <AsyncLink name="Test" onNav={onNav}>
              {navigating => <Text>{navigating}</Text>}
            </AsyncLink>
          </Router>
        );
        let anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(onNav.mock.calls.length).toBe(1);
        expect(mockNavigate.mock.calls.length).toBe(0);
      });
    });

    it("doesn't call history.navigate if event.preventDefault has been called", () => {
      let mockNavigate = jest.fn();
      let routes = prepareRoutes([
        { name: "Test", path: "" },
        { name: "Catch All", path: "(.*)" }
      ]);
      let router = createRouter(inMemory, routes);
      router.history.navigate = mockNavigate;
      let Router = createRouterComponent(router);

      let tree = renderer.create(
        <Router>
          <AsyncLink name="Test">
            {navigating => <Text>{navigating}</Text>}
          </AsyncLink>
        </Router>
      );
      let anchor = tree.root.findByType(TouchableHighlight);
      anchor.props.onPress(fakeEvent({ defaultPrevented: true }));
      expect(mockNavigate.mock.calls.length).toBe(0);
    });
  });
});
