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
      const routes = prepareRoutes({
        routes: [
          { name: "Test", path: "" },
          { name: "Catch All", path: "(.*)" }
        ]
      });
      const router = createRouter(inMemory, routes);
      const Router = createRouterComponent(router);
      const tree = renderer.create(
        <Router>
          <Link name="Test">
            <Text>Test</Text>
          </Link>
        </Router>
      );
      const anchor = tree.root.findByType(TouchableHighlight);
      expect(anchor).toBeDefined();
    });

    it("when provided, it renders the component instead of an anchor", () => {
      const routes = prepareRoutes({
        routes: [
          { name: "Test", path: "" },
          { name: "Catch All", path: "(.*)" }
        ]
      });
      const router = createRouter(inMemory, routes);
      const Router = createRouterComponent(router);

      const StyledAnchor = props => (
        <TouchableHighlight style={{ borderColor: "orange" }} {...props} />
      );

      const tree = renderer.create(
        <Router>
          <Link name="Test" anchor={StyledAnchor}>
            <Text>Test</Text>
          </Link>
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
        const routes = prepareRoutes({
          routes: [{ name: "Catch All", path: "(.*)" }]
        });
        const router = createRouter(inMemory, routes, {
          history: {
            locations: ["/the-initial-location"]
          }
        });
        router.history.navigate = mockNavigate;
        const Router = createRouterComponent(router);

        const tree = renderer.create(
          <Router>
            <Link name={null}>
              <Text>Test</Text>
            </Link>
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
      const routes = prepareRoutes({
        routes: [
          { name: "Park", path: "park/:name" },
          { name: "Catch All", path: "(.*)" }
        ]
      });

      it("uses params to generate the location to navigate to", () => {
        const mockNavigate = jest.fn();
        const router = createRouter(inMemory, routes);
        router.history.navigate = mockNavigate;
        const Router = createRouterComponent(router);

        const params = { name: "Glacier" };
        const tree = renderer.create(
          <Router>
            <Link name="Park" params={params}>
              <Text>Test</Text>
            </Link>
          </Router>
        );
        const anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(mockNavigate.mock.calls[0][0].pathname).toBe("/park/Glacier");
      });

      it("updates location to navigate to when props change", () => {
        const mockNavigate = jest.fn();
        const router = createRouter(inMemory, routes);
        router.history.navigate = mockNavigate;
        const Router = createRouterComponent(router);

        const params = { name: "Glacier" };
        const tree = renderer.create(
          <Router>
            <Link name="Park" params={params}>
              <Text>Test</Text>
            </Link>
          </Router>
        );
        const anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(mockNavigate.mock.calls[0][0].pathname).toBe("/park/Glacier");

        const newParams = { name: "Yellowstone" };
        tree.update(
          <Router>
            <Link name="Park" params={newParams}>
              <Text>Test</Text>
            </Link>
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
        const routes = prepareRoutes({
          routes: [
            { name: "Test", path: "test" },
            { name: "Catch All", path: "(.*)" }
          ]
        });
        const router = createRouter(inMemory, routes);
        router.history.navigate = mockNavigate;
        const Router = createRouterComponent(router);

        const tree = renderer.create(
          <Router>
            <Link name="Test" query="one=two" hash="hashtag">
              <Text>Test</Text>
            </Link>
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
      const routes = prepareRoutes({
        routes: [
          { name: "Test", path: "" },
          { name: "Catch All", path: "(.*)" }
        ]
      });
      const router = createRouter(inMemory, routes, {
        history: {
          locations: ["/the-initial-location"]
        }
      });
      router.history.navigate = mockNavigate;
      const Router = createRouterComponent(router);

      const style = { backgroundColor: "red" };
      const tree = renderer.create(
        <Router>
          <Link name="Test" forward={{ style }}>
            <Text>Test</Text>
          </Link>
        </Router>
      );
      const anchor = tree.root.findByType(TouchableHighlight);
      expect(anchor.props.style).toMatchObject(style);
    });

    it('does not overwrite "native" props set on the rendered element', () => {
      const onPress = jest.fn();

      const routes = prepareRoutes({
        routes: [
          { name: "Test", path: "" },
          { name: "Catch All", path: "(.*)" }
        ]
      });
      const router = createRouter(inMemory, routes, {
        history: {
          locations: ["/the-initial-location"]
        }
      });
      const Router = createRouterComponent(router);

      const tree = renderer.create(
        <Router>
          <Link name="Test" forward={{ onPress }}>
            <Text>Test</Text>
          </Link>
        </Router>
      );

      const anchor = tree.root.findByType(TouchableHighlight);
      expect(anchor.props.onPress).not.toBe(onPress);
    });
  });

  describe("ref", () => {
    it("returns the anchor's ref, not the link's", () => {
      const mockNavigate = jest.fn();
      const routes = prepareRoutes({
        routes: [
          { name: "Parks", path: "parks" },
          { name: "Catch All", path: "(.*)" }
        ]
      });
      const router = createRouter(inMemory, routes, {
        history: {
          locations: ["/the-initial-location"]
        }
      });
      router.history.navigate = mockNavigate;
      const Router = createRouterComponent(router);

      const ref = React.createRef();
      const tree = renderer.create(
        <Router>
          <Link name="Parks" ref={ref}>
            <Text>Test</Text>
          </Link>
        </Router>
      );
      const anchor = tree.root.findByType(TouchableHighlight);
      expect(anchor.instance).toBe(ref.current);
    });
  });

  describe("children", () => {
    it("renders the provided children value(s)", () => {
      const routes = prepareRoutes({
        routes: [
          { name: "Test", path: "" },
          { name: "Catch All", path: "(.*)" }
        ]
      });
      const router = createRouter(inMemory, routes);
      const Router = createRouterComponent(router);

      const children = "Test Value";
      const tree = renderer.create(
        <Router>
          <Link name="Test">
            <Text>{children}</Text>
          </Link>
        </Router>
      );
      const anchor = tree.root.findByType(TouchableHighlight);
      const text = anchor.findByType(Text);
      expect(anchor).toBeDefined();
      expect(text.instance.props.children).toBe(children);
    });
  });

  describe("pressing a link", () => {
    describe("navigation method", () => {
      it('method="anchor"', () => {
        const routes = prepareRoutes({
          routes: [
            { name: "Test", path: "" },
            { name: "Catch All", path: "(.*)" }
          ]
        });
        const router = createRouter(inMemory, routes);
        const mockNavigate = jest.fn();
        router.history.navigate = mockNavigate;
        const Router = createRouterComponent(router);

        const tree = renderer.create(
          <Router>
            <Link name="Test" method="anchor">
              <Text>Test</Text>
            </Link>
          </Router>
        );
        const anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(mockNavigate.mock.calls[0][1]).toBe("anchor");
      });

      it('method="push"', () => {
        const mockNavigate = jest.fn();
        const routes = prepareRoutes({
          routes: [
            { name: "Test", path: "" },
            { name: "Catch All", path: "(.*)" }
          ]
        });
        const router = createRouter(inMemory, routes);
        router.history.navigate = mockNavigate;
        const Router = createRouterComponent(router);

        const tree = renderer.create(
          <Router>
            <Link name="Test" method="push">
              <Text>Test</Text>
            </Link>
          </Router>
        );
        const anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(mockNavigate.mock.calls[0][1]).toBe("push");
      });

      it('method="replace"', () => {
        const mockNavigate = jest.fn();
        const routes = prepareRoutes({
          routes: [
            { name: "Test", path: "" },
            { name: "Catch All", path: "(.*)" }
          ]
        });
        const router = createRouter(inMemory, routes);
        router.history.navigate = mockNavigate;
        const Router = createRouterComponent(router);

        const tree = renderer.create(
          <Router>
            <Link name="Test" method={"replace"}>
              <Text>Test</Text>
            </Link>
          </Router>
        );
        const anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(mockNavigate.mock.calls[0][1]).toBe("replace");
      });
    });

    describe("onNav", () => {
      it("calls onNav prop func if provided", () => {
        const mockNavigate = jest.fn();
        const onNav = jest.fn();
        const routes = prepareRoutes({
          routes: [
            { name: "Test", path: "" },
            { name: "Catch All", path: "(.*)" }
          ]
        });
        const router = createRouter(inMemory, routes);
        router.history.navigate = mockNavigate;
        const Router = createRouterComponent(router);

        const tree = renderer.create(
          <Router>
            <Link name="Test" onNav={onNav}>
              <Text>Test</Text>
            </Link>
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
        const routes = prepareRoutes({
          routes: [
            { name: "Test", path: "" },
            { name: "Catch All", path: "(.*)" }
          ]
        });
        const router = createRouter(inMemory, routes);
        router.history.navigate = mockNavigate;
        const Router = createRouterComponent(router);

        const tree = renderer.create(
          <Router>
            <Link name="Test" onNav={onNav}>
              <Text>Test</Text>
            </Link>
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
      const routes = prepareRoutes({
        routes: [
          { name: "Test", path: "" },
          { name: "Catch All", path: "(.*)" }
        ]
      });
      const router = createRouter(inMemory, routes);
      router.history.navigate = mockNavigate;
      const Router = createRouterComponent(router);

      const tree = renderer.create(
        <Router>
          <Link name="Test">
            <Text>Test</Text>
          </Link>
        </Router>
      );
      const anchor = tree.root.findByType(TouchableHighlight);
      anchor.props.onPress(fakeEvent({ defaultPrevented: true }));
      expect(mockNavigate.mock.calls.length).toBe(0);
    });
  });
});
