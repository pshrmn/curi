import "jest";
import React from "react";
import "react-native";
import renderer from "react-test-renderer";
import { inMemory } from "@hickory/in-memory";
import { createRouter, prepareRoutes } from "@curi/router";
import { TouchableHighlight, Text } from "react-native";

import { createRouterComponent, Link } from "@curi/react-native";

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
          <Link name="Test">
            <Text>Test</Text>
          </Link>
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
          <Link name="Test" anchor={StyledAnchor}>
            <Text>Test</Text>
          </Link>
        </Router>
      );
      let anchor = tree.root.find(StyledAnchor);
      expect(anchor).toBeDefined();
    });
  });

  describe("navigation location", () => {
    describe("name", () => {
      it("has no pathname component if name is not provided", () => {
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
            <Link name={null} hash="test">
              <Text>Test</Text>
            </Link>
          </Router>
        );
        let anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
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

      it("uses params to generate the location to navigate to", () => {
        let mockNavigate = jest.fn();
        let router = createRouter(inMemory, routes);
        router.history.navigate = mockNavigate;
        let Router = createRouterComponent(router);

        let params = { name: "Glacier" };
        let tree = renderer.create(
          <Router>
            <Link name="Park" params={params}>
              <Text>Test</Text>
            </Link>
          </Router>
        );
        let anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(mockNavigate.mock.calls[0][0]).toMatchObject({
          url: "/park/Glacier"
        });
      });

      it("updates location to navigate to when props change", () => {
        let mockNavigate = jest.fn();
        let router = createRouter(inMemory, routes);
        router.history.navigate = mockNavigate;
        let Router = createRouterComponent(router);

        let params = { name: "Glacier" };
        let tree = renderer.create(
          <Router>
            <Link name="Park" params={params}>
              <Text>Test</Text>
            </Link>
          </Router>
        );
        let anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(mockNavigate.mock.calls[0][0]).toMatchObject({
          url: "/park/Glacier"
        });

        let newParams = { name: "Yellowstone" };
        tree.update(
          <Router>
            <Link name="Park" params={newParams}>
              <Text>Test</Text>
            </Link>
          </Router>
        );
        anchor.props.onPress(fakeEvent());
        expect(mockNavigate.mock.calls[1][0]).toMatchObject({
          url: "/park/Yellowstone"
        });
      });
    });

    describe("hash & query", () => {
      it("merges hash & query props with the pathname when creating href", () => {
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
            <Link name="Test" query="one=two" hash="hashtag">
              <Text>Test</Text>
            </Link>
          </Router>
        );

        let anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
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
          <Link name="Test" style={style}>
            <Text>Test</Text>
          </Link>
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
          <Link name="Test" onPress={onPress}>
            <Text>Test</Text>
          </Link>
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
          <Link name="Parks" ref={ref}>
            <Text>Test</Text>
          </Link>
        </Router>
      );
      let anchor = tree.root.findByType(TouchableHighlight);
      expect(anchor.instance).toBe(ref.current);
    });
  });

  describe("children", () => {
    it("renders the provided children value(s)", () => {
      let routes = prepareRoutes([
        { name: "Test", path: "" },
        { name: "Catch All", path: "(.*)" }
      ]);
      let router = createRouter(inMemory, routes);
      let Router = createRouterComponent(router);

      let children = "Test Value";
      let tree = renderer.create(
        <Router>
          <Link name="Test">
            <Text>{children}</Text>
          </Link>
        </Router>
      );
      let anchor = tree.root.findByType(TouchableHighlight);
      let text = anchor.findByType(Text);
      expect(anchor).toBeDefined();
      expect(text.instance.props.children).toBe(children);
    });
  });

  describe("pressing a link", () => {
    describe("navigation method", () => {
      it('method="anchor"', () => {
        let routes = prepareRoutes([
          { name: "Test", path: "" },
          { name: "Catch All", path: "(.*)" }
        ]);
        let router = createRouter(inMemory, routes);
        let mockNavigate = jest.fn();
        router.history.navigate = mockNavigate;
        let Router = createRouterComponent(router);

        let tree = renderer.create(
          <Router>
            <Link name="Test" method="anchor">
              <Text>Test</Text>
            </Link>
          </Router>
        );
        let anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(mockNavigate.mock.calls[0][1]).toBe("anchor");
      });

      it('method="push"', () => {
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
            <Link name="Test" method="push">
              <Text>Test</Text>
            </Link>
          </Router>
        );
        let anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(mockNavigate.mock.calls[0][1]).toBe("push");
      });

      it('method="replace"', () => {
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
            <Link name="Test" method={"replace"}>
              <Text>Test</Text>
            </Link>
          </Router>
        );
        let anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(mockNavigate.mock.calls[0][1]).toBe("replace");
      });
    });

    describe("onNav", () => {
      it("calls onNav prop func if provided", () => {
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
            <Link name="Test" onNav={onNav}>
              <Text>Test</Text>
            </Link>
          </Router>
        );
        let anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
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
            <Link name="Test" onNav={onNav}>
              <Text>Test</Text>
            </Link>
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
          <Link name="Test">
            <Text>Test</Text>
          </Link>
        </Router>
      );
      let anchor = tree.root.findByType(TouchableHighlight);
      anchor.props.onPress(fakeEvent({ defaultPrevented: true }));
      expect(mockNavigate.mock.calls.length).toBe(0);
    });
  });
});
