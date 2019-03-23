import "jest";
import React from "react";
import "react-native";
import renderer from "react-test-renderer";
import { InMemory } from "@hickory/in-memory";
import { create_router, prepare_routes } from "@curi/router";
import { TouchableHighlight, Text } from "react-native";

import { create_router_component, AsyncLink } from "@curi/react-native";

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
      const routes = prepare_routes([
        { name: "Test", path: "" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = create_router(InMemory, routes);
      const Router = create_router_component(router);
      const tree = renderer.create(
        <Router>
          <AsyncLink name="Test">
            {navigating => <Text>{navigating}</Text>}
          </AsyncLink>
        </Router>
      );
      const anchor = tree.root.findByType(TouchableHighlight);
      expect(anchor).toBeDefined();
    });

    it("when provided, it renders the component instead of an anchor", () => {
      const routes = prepare_routes([
        { name: "Test", path: "" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = create_router(InMemory, routes);
      const Router = create_router_component(router);

      const StyledAnchor = props => (
        <TouchableHighlight style={{ borderColor: "orange" }} {...props} />
      );

      const tree = renderer.create(
        <Router>
          <AsyncLink name="Test" anchor={StyledAnchor}>
            {navigating => <Text>{navigating}</Text>}
          </AsyncLink>
        </Router>
      );
      const anchor = tree.root.find(StyledAnchor);
      expect(anchor).toBeDefined();
    });
  });

  describe("navigation location", () => {
    describe("name", () => {
      it("uses the pathname from current response's location if 'name' is not provided", () => {
        const mockNavigate = jest.fn();
        const routes = prepare_routes([{ name: "Catch All", path: "(.*)" }]);
        const router = create_router(InMemory, routes, {
          history: {
            locations: ["/the-initial-location"]
          }
        });
        router.history.navigate = mockNavigate;
        const Router = create_router_component(router);

        const tree = renderer.create(
          <Router>
            <AsyncLink name={null}>
              {navigating => <Text>{navigating}</Text>}
            </AsyncLink>
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
      const routes = prepare_routes([
        { name: "Park", path: "park/:name" },
        { name: "Catch All", path: "(.*)" }
      ]);

      it("uses params to generate the location to navigate to", () => {
        const mockNavigate = jest.fn();
        const router = create_router(InMemory, routes);
        router.history.navigate = mockNavigate;
        const Router = create_router_component(router);

        const params = { name: "Glacier" };
        const tree = renderer.create(
          <Router>
            <AsyncLink name="Park" params={params}>
              {navigating => <Text>{navigating}</Text>}
            </AsyncLink>
          </Router>
        );
        const anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(mockNavigate.mock.calls[0][0].pathname).toBe("/park/Glacier");
      });

      it("updates location to navigate to when props change", () => {
        const mockNavigate = jest.fn();
        const router = create_router(InMemory, routes);
        router.history.navigate = mockNavigate;
        const Router = create_router_component(router);

        const params = { name: "Glacier" };
        const tree = renderer.create(
          <Router>
            <AsyncLink name="Park" params={params}>
              {navigating => <Text>{navigating}</Text>}
            </AsyncLink>
          </Router>
        );
        const anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(mockNavigate.mock.calls[0][0].pathname).toBe("/park/Glacier");

        const newParams = { name: "Yellowstone" };
        tree.update(
          <Router>
            <AsyncLink name="Park" params={newParams}>
              {navigating => <Text>{navigating}</Text>}
            </AsyncLink>
          </Router>
        );
        anchor.props.onPress(fakeEvent());
        expect(mockNavigate.mock.calls[1][0].pathname).toBe(
          "/park/Yellowstone"
        );
      });
    });

    describe("hash & query", () => {
      it("merges hash & query props with the pathname when creating href", () => {
        const mockNavigate = jest.fn();
        const routes = prepare_routes([
          { name: "Test", path: "test" },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = create_router(InMemory, routes);
        router.history.navigate = mockNavigate;
        const Router = create_router_component(router);

        const tree = renderer.create(
          <Router>
            <AsyncLink name="Test" query="one=two" hash="hashtag">
              {navigating => <Text>{navigating}</Text>}
            </AsyncLink>
          </Router>
        );

        const anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(mockNavigate.mock.calls[0][0]).toMatchObject({
          pathname: "/test",
          query: "one=two",
          hash: "hashtag"
        });
      });
    });
  });

  describe("forward", () => {
    it("passes forward to the rendered anchor", () => {
      const mockNavigate = jest.fn();
      const routes = prepare_routes([
        { name: "Test", path: "" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = create_router(InMemory, routes, {
        history: {
          locations: ["/the-initial-location"]
        }
      });
      router.history.navigate = mockNavigate;
      const Router = create_router_component(router);

      const style = { backgroundColor: "red" };
      const tree = renderer.create(
        <Router>
          <AsyncLink name="Test" forward={{ style }}>
            {navigating => <Text>{navigating}</Text>}
          </AsyncLink>
        </Router>
      );
      const anchor = tree.root.findByType(TouchableHighlight);
      expect(anchor.props.style).toMatchObject(style);
    });
  });

  describe("ref", () => {
    it("returns the anchor's ref, not the link's", () => {
      const mockNavigate = jest.fn();
      const routes = prepare_routes([
        { name: "Parks", path: "parks" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = create_router(InMemory, routes, {
        history: {
          locations: ["/the-initial-location"]
        }
      });
      router.history.navigate = mockNavigate;
      const Router = create_router_component(router);

      const ref = React.createRef();
      const tree = renderer.create(
        <Router>
          <AsyncLink name="Parks" ref={ref}>
            {navigating => <Text>{navigating}</Text>}
          </AsyncLink>
        </Router>
      );
      const anchor = tree.root.findByType(TouchableHighlight);
      expect(anchor.instance).toBe(ref.current);
    });
  });

  describe("children", () => {
    it("is called with the <AsyncLink>'s current navigating state (false on mount)", () => {
      const routes = prepare_routes([
        { name: "Test", path: "" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = create_router(InMemory, routes);
      const Router = create_router_component(router);

      const tree = renderer.create(
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
      it('method="anchor"', () => {
        const mockNavigate = jest.fn();
        const routes = prepare_routes([
          { name: "Test", path: "" },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = create_router(InMemory, routes);
        router.history.navigate = mockNavigate;
        const Router = create_router_component(router);

        const tree = renderer.create(
          <Router>
            <AsyncLink name="Test" method={"anchor"}>
              {navigating => <Text>{navigating}</Text>}
            </AsyncLink>
          </Router>
        );
        const anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(mockNavigate.mock.calls[0][1]).toBe("anchor");
      });

      it('method="push"', () => {
        const mockNavigate = jest.fn();
        const routes = prepare_routes([
          { name: "Test", path: "" },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = create_router(InMemory, routes);
        router.history.navigate = mockNavigate;
        const Router = create_router_component(router);

        const tree = renderer.create(
          <Router>
            <AsyncLink name="Test" method={"push"}>
              {navigating => <Text>{navigating}</Text>}
            </AsyncLink>
          </Router>
        );
        const anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(mockNavigate.mock.calls[0][1]).toBe("push");
      });

      it('method="replace"', () => {
        const mockNavigate = jest.fn();
        const routes = prepare_routes([
          { name: "Test", path: "" },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = create_router(InMemory, routes);
        router.history.navigate = mockNavigate;
        const Router = create_router_component(router);

        const tree = renderer.create(
          <Router>
            <AsyncLink name="Test" method={"replace"}>
              {navigating => <Text>{navigating}</Text>}
            </AsyncLink>
          </Router>
        );
        const anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(mockNavigate.mock.calls[0][1]).toBe("replace");
      });
    });

    describe("children(navigating)", () => {
      it("children(true) after clicking", () => {
        // if a link has no on methods, finished will be called almost
        // immediately (although this style should only be used for routes
        // with resolve methods)
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
        const router = create_router(InMemory, routes);
        const Router = create_router_component(router);

        const tree = renderer.create(
          <Router>
            <AsyncLink name="Test">
              {navigating => {
                return <Text>{navigating.toString()}</Text>;
              }}
            </AsyncLink>
          </Router>
        );
        const anchor = tree.root.findByType(TouchableHighlight);
        const text = anchor.findByType(Text);
        expect(text.instance.props.children).toBe("false");

        anchor.props.onPress(fakeEvent());

        expect(text.instance.props.children).toBe("true");
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
        const router = create_router(InMemory, routes);
        const Router = create_router_component(router);

        const tree = renderer.create(
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
        const routes = prepare_routes([
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
        const router = create_router(InMemory, routes);
        const Router = create_router_component(router);

        const tree = renderer.create(
          <Router>
            <AsyncLink name="Loader">
              {navigating => {
                return <Text>{navigating.toString()}</Text>;
              }}
            </AsyncLink>
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

      // TODO: run this once act() fix is out (act causes error calls);
      it.skip("does not call setState if component has unmounted", done => {
        const realError = console.error;
        const mockError = jest.fn();
        console.error = mockError;

        const routes = prepare_routes([
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
        const router = create_router(InMemory, routes);
        const Router = create_router_component(router);

        const tree = renderer.create(
          <Router>
            <AsyncLink name="Blork">
              {navigating => {
                return <Text>{navigating.toString()}</Text>;
              }}
            </AsyncLink>
          </Router>
        );
        const anchor = tree.root.findByType(TouchableHighlight);

        anchor.props.onPress(fakeEvent());

        tree.unmount();
      });
    });

    describe("onNav", () => {
      it("calls onNav prop func if provided", () => {
        const mockNavigate = jest.fn();
        const onNav = jest.fn();
        const routes = prepare_routes([
          { name: "Test", path: "" },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = create_router(InMemory, routes);
        router.history.navigate = mockNavigate;
        const Router = create_router_component(router);

        const tree = renderer.create(
          <Router>
            <AsyncLink name="Test" onNav={onNav}>
              {navigating => <Text>{navigating}</Text>}
            </AsyncLink>
          </Router>
        );
        const anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(mockNavigate.mock.calls.length).toBe(1);
        expect(onNav.mock.calls.length).toBe(1);
        expect(mockNavigate.mock.calls.length).toBe(1);
      });

      it("does not call history.navigate if onNav prevents default", () => {
        const mockNavigate = jest.fn();
        const onNav = jest.fn(event => {
          event.preventDefault();
        });
        const routes = prepare_routes([
          { name: "Test", path: "" },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = create_router(InMemory, routes);
        router.history.navigate = mockNavigate;
        const Router = create_router_component(router);

        const tree = renderer.create(
          <Router>
            <AsyncLink name="Test" onNav={onNav}>
              {navigating => <Text>{navigating}</Text>}
            </AsyncLink>
          </Router>
        );
        const anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(onNav.mock.calls.length).toBe(1);
        expect(mockNavigate.mock.calls.length).toBe(0);
      });
    });

    it("doesn't call history.navigate if event.preventDefault has been called", () => {
      const mockNavigate = jest.fn();
      const routes = prepare_routes([
        { name: "Test", path: "" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = create_router(InMemory, routes);
      router.history.navigate = mockNavigate;
      const Router = create_router_component(router);

      const tree = renderer.create(
        <Router>
          <AsyncLink name="Test">
            {navigating => <Text>{navigating}</Text>}
          </AsyncLink>
        </Router>
      );
      const anchor = tree.root.findByType(TouchableHighlight);
      anchor.props.onPress(fakeEvent({ defaultPrevented: true }));
      expect(mockNavigate.mock.calls.length).toBe(0);
    });
  });
});
