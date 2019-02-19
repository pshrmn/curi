import "jest";
import React from "react";
import "react-native";
import renderer from "react-test-renderer";
import InMemory from "@hickory/in-memory";
import { curi, prepareRoutes } from "@curi/router";
import { TouchableHighlight, Text } from "react-native";

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
          <Link name="Test">
            <Text>Test</Text>
          </Link>
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
        const history = InMemory({ locations: ["/the-initial-location"] });
        const mockNavigate = jest.fn();
        history.navigate = mockNavigate;
        const routes = prepareRoutes([{ name: "Catch All", path: "(.*)" }]);
        const router = curi(history, routes);
        const Router = curiProvider(router);

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
        const history = InMemory();
        const mockNavigate = jest.fn();
        history.navigate = mockNavigate;

        const router = curi(history, routes);
        const Router = curiProvider(router);

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
        const history = InMemory();
        const mockNavigate = jest.fn();
        history.navigate = mockNavigate;

        const routes = prepareRoutes([
          { name: "Test", path: "test" },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(history, routes);
        const Router = curiProvider(router);

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
          <Link name="Test" forward={{ style }}>
            <Text>Test</Text>
          </Link>
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
            <Link name="Test">
              <Text>Test</Text>
            </Link>
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
            <Link name="Test" method="ANCHOR">
              <Text>Test</Text>
            </Link>
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
            <Link name="Test" method="PUSH">
              <Text>Test</Text>
            </Link>
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
            <Link name="Test" method="REPLACE">
              <Text>Test</Text>
            </Link>
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
            <Link name="Test" method={"whatchamacallit" as NavType}>
              <Text>Test</Text>
            </Link>
          </Router>
        );
        const anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(mockNavigate.mock.calls[0][1]).toBe("ANCHOR");
      });
    });

    describe("onNav", () => {
      it("calls onNav prop func if provided", () => {
        const history = InMemory();
        const mockNavigate = jest.fn();
        history.navigate = mockNavigate;
        const onNav = jest.fn();

        const routes = prepareRoutes([
          { name: "Test", path: "" },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(history, routes);
        const Router = curiProvider(router);

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
        const history = InMemory();
        const mockNavigate = jest.fn();
        history.navigate = mockNavigate;
        const onNav = jest.fn(event => {
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
