import "jest";
import React from "react";
import "react-native";
import renderer from "react-test-renderer";

import InMemory from "@hickory/in-memory";
import curi, { Response } from "@curi/core";
import { CuriProvider } from "@curi/react";
import createActiveAddon from "@curi/addon-active";
import { TouchableHighlight, Text } from "react-native";
import Link from "../src/Link";

import { LinkMethod } from "../src/Link";
import { LocationDetails } from "@hickory/root";

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
      const router = curi(history, [{ name: "Test", path: "" }]);

      const tree = renderer.create(
        <CuriProvider router={router}>
          {() => (
            <Link to="Test">
              <Text>Test</Text>
            </Link>
          )}
        </CuriProvider>
      );
      const anchor = tree.root.findByType(TouchableHighlight);
      expect(anchor).toBeDefined();
    });

    it("when provided, it renders the component instead of an anchor", () => {
      const history = InMemory();
      const router = curi(history, [{ name: "Test", path: "" }]);
      const StyledAnchor = props => (
        <TouchableHighlight style={{ borderColor: "orange" }} {...props} />
      );

      const tree = renderer.create(
        <CuriProvider router={router}>
          {() => (
            <Link to="Test" anchor={StyledAnchor}>
              <Text>Test</Text>
            </Link>
          )}
        </CuriProvider>
      );
      const anchor = tree.root.find(StyledAnchor);
      expect(anchor).toBeDefined();
    });
  });

  describe("to", () => {
    it("uses the pathname from current response's location if 'to' is not provided", () => {
      const history = InMemory({ locations: ["/the-initial-location"] });
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;
      const routes = [];
      const router = curi(history, routes);
      const tree = renderer.create(
        <CuriProvider router={router}>
          {() => (
            <Link to={null}>
              <Text>Test</Text>
            </Link>
          )}
        </CuriProvider>
      );
      const anchor = tree.root.findByType(TouchableHighlight);
      anchor.props.onPress(fakeEvent());
      expect(mockNavigate.mock.calls[0][0].pathname).toBe(
        "/the-initial-location"
      );
    });
  });

  describe("params", () => {
    it("uses params to generate the location to navigate to", () => {
      const history = InMemory();
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;

      const router = curi(history, [{ name: "Park", path: "/park/:name" }]);
      const params = { name: "Glacier" };
      const tree = renderer.create(
        <CuriProvider router={router}>
          {() => (
            <Link to="Park" params={params}>
              <Text>Test</Text>
            </Link>
          )}
        </CuriProvider>
      );
      const anchor = tree.root.findByType(TouchableHighlight);
      anchor.props.onPress(fakeEvent());
      expect(mockNavigate.mock.calls[0][0].pathname).toBe("/park/Glacier");
    });

    it("updates location to navigate to when props change", () => {
      const history = InMemory();
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;

      const router = curi(history, [{ name: "Park", path: "/park/:name" }]);

      const params = { name: "Glacier" };
      const tree = renderer.create(
        <CuriProvider router={router}>
          {() => (
            <Link to="Park" params={params}>
              <Text>Test</Text>
            </Link>
          )}
        </CuriProvider>
      );
      const anchor = tree.root.findByType(TouchableHighlight);
      anchor.props.onPress(fakeEvent());
      expect(mockNavigate.mock.calls[0][0].pathname).toBe("/park/Glacier");

      const newParams = { name: "Yellowstone" };
      tree.update(
        <CuriProvider router={router}>
          {() => (
            <Link to="Park" params={newParams}>
              <Text>Test</Text>
            </Link>
          )}
        </CuriProvider>
      );
      anchor.props.onPress(fakeEvent());
      expect(mockNavigate.mock.calls[1][0].pathname).toBe("/park/Yellowstone");
    });
  });

  describe("details", () => {
    it("merges the details prop with the generated pathname when navigating", () => {
      const history = InMemory();
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;

      const router = curi(history, [{ name: "Test", path: "test" }]);
      const tree = renderer.create(
        <CuriProvider router={router}>
          {() => (
            <Link to="Test" details={{ query: "one=two", hash: "hashtag" }}>
              <Text>Test</Text>
            </Link>
          )}
        </CuriProvider>
      );
      const anchor = tree.root.findByType(TouchableHighlight);
      anchor.props.onPress(fakeEvent());
      expect(mockNavigate.mock.calls[0][0]).toMatchObject({
        pathname: "/test",
        query: "one=two",
        hash: "hashtag"
      });
    });

    it("providing a pathname in details does not overwrite the generated pathname", () => {
      const history = InMemory();
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;

      const router = curi(history, [{ name: "Test", path: "test" }]);
      const tree = renderer.create(
        <CuriProvider router={router}>
          {() => (
            <Link
              to="Test"
              details={{ pathname: "/not-a-test" } as LocationDetails}
            >
              <Text>Test</Text>
            </Link>
          )}
        </CuriProvider>
      );
      const anchor = tree.root.findByType(TouchableHighlight);
      anchor.props.onPress(fakeEvent());
      expect(mockNavigate.mock.calls[0][0].pathname).toBe("/test");
    });
  });

  describe("active", () => {
    function merge(props) {
      props.style = Object.assign(props.style || {}, {
        borderColor: "red"
      });
      return props;
    }

    describe("without @curi/addon-active", () => {
      const realError = console.error;
      console.error = jest.fn();

      afterAll(() => {
        console.error = realError;
      });

      it("throws on mount", () => {
        const history = InMemory();
        const router = curi(history, [{ name: "Test", path: "test" }]);
        expect(() => {
          const tree = renderer.create(
            <CuriProvider router={router}>
              {() => (
                <Link to="Test" active={{ merge }}>
                  <Text>Test</Text>
                </Link>
              )}
            </CuriProvider>
          );
        }).toThrow(
          'You are attempting to use the "active" prop, but have not included the "active" ' +
            "addon (@curi/addon-active) in your Curi router."
        );
      });

      it("throws if adding active prop on re-render", () => {
        const history = InMemory();
        const router = curi(history, [{ name: "Test", path: "test" }]);
        const tree = renderer.create(
          <CuriProvider router={router}>
            {() => (
              <Link to="Test">
                <Text>Test</Text>
              </Link>
            )}
          </CuriProvider>
        );
        expect(() => {
          tree.update(
            <CuriProvider router={router}>
              {() => (
                <Link to="Test" active={{ merge }}>
                  <Text>Test</Text>
                </Link>
              )}
            </CuriProvider>
          );
        }).toThrow(
          'You are attempting to use the "active" prop, but have not included the "active" ' +
            "addon (@curi/addon-active) in your Curi router."
        );
      });
    });

    describe("merge", () => {
      it("does not call merge if the <Link>'s props do not match the current response's", () => {
        const history = InMemory();
        const router = curi(history, [{ name: "Test", path: "test" }], {
          addons: [createActiveAddon()]
        });
        const tree = renderer.create(
          <CuriProvider router={router}>
            {() => (
              <Link
                to="Test"
                style={{ borderColor: "blue" }}
                active={{ merge }}
              >
                <Text>Test</Text>
              </Link>
            )}
          </CuriProvider>
        );
        const anchor = tree.root.findByType(TouchableHighlight);
        expect(anchor.props.style).toMatchObject({ borderColor: "blue" });
      });

      it("calls merge function when <Link>'s props match the current response's", () => {
        const history = InMemory({ locations: ["/test"] });
        const router = curi(history, [{ name: "Test", path: "test" }], {
          addons: [createActiveAddon()]
        });
        const tree = renderer.create(
          <CuriProvider router={router}>
            {() => (
              <Link
                to="Test"
                style={{ borderColor: "blue" }}
                active={{ merge }}
              >
                <Text>Test</Text>
              </Link>
            )}
          </CuriProvider>
        );

        const anchor = tree.root.findByType(TouchableHighlight);
        expect(anchor.props.style).toMatchObject({ borderColor: "red" });
      });
    });

    describe("partial", () => {
      it("works with partial matches", () => {
        const history = InMemory({ locations: ["/test"] });
        const router = curi(
          history,
          [
            {
              name: "Test",
              path: "test",
              children: [{ name: "Nested", path: "nested" }]
            }
          ],
          {
            addons: [createActiveAddon()]
          }
        );
        const tree = renderer.create(
          <CuriProvider router={router}>
            {() => (
              <Link
                to="Test"
                style={{ backgroundColor: "green" }}
                active={{ partial: true, merge }}
              >
                <Text>Test</Text>
              </Link>
            )}
          </CuriProvider>
        );

        const anchor = tree.root.findByType(TouchableHighlight);
        expect(anchor.props.style).toMatchObject({
          backgroundColor: "green",
          borderColor: "red"
        });
      });
    });

    describe("extra", () => {
      function extra(location, details = {}) {
        return location.query === details["query"];
      }

      it("uses extra function to run additional active checks", () => {
        const history = InMemory({ locations: ["/test?test=ing"] });
        const router = curi(history, [{ name: "Test", path: "test" }], {
          addons: [createActiveAddon()]
        });
        const tree = renderer.create(
          <CuriProvider router={router}>
            {() => (
              <Link
                to="Test"
                details={{ query: "test=ing" }}
                active={{ merge, extra }}
              >
                <Text>Test</Text>
              </Link>
            )}
          </CuriProvider>
        );

        const anchor = tree.root.findByType(TouchableHighlight);
        expect(anchor.props.style).toMatchObject({ borderColor: "red" });
      });

      it("active is false when pathname matches, but extra returns false", () => {
        const history = InMemory({ locations: ["/test?test=ing"] });
        const router = curi(history, [{ name: "Test", path: "test" }], {
          addons: [createActiveAddon()]
        });
        const tree = renderer.create(
          <CuriProvider router={router}>
            {() => (
              <Link to="Test" active={{ merge, extra }}>
                <Text>Test</Text>
              </Link>
            )}
          </CuriProvider>
        );

        const anchor = tree.root.findByType(TouchableHighlight);
        expect(anchor.props.style).toBeUndefined();
      });
    });
  });

  describe("pressing a link", () => {
    describe("navigation method", () => {
      let history, mockNavigate, mockPush, mockReplace;

      beforeEach(() => {
        history = InMemory();
        history.navigate = mockNavigate = jest.fn();
        history.push = mockPush = jest.fn();
        history.replace = mockReplace = jest.fn();
      });

      it("[default] calls history.navigate", () => {
        const router = curi(history, [{ name: "Test", path: "" }]);
        const tree = renderer.create(
          <CuriProvider router={router}>
            {() => (
              <Link to="Test">
                <Text>Test</Text>
              </Link>
            )}
          </CuriProvider>
        );
        const anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(mockNavigate.mock.calls.length).toBe(1);
        expect(mockPush.mock.calls.length).toBe(0);
        expect(mockReplace.mock.calls.length).toBe(0);
      });

      it("[navigate] calls history.navigate", () => {
        const router = curi(history, [{ name: "Test", path: "" }]);
        const tree = renderer.create(
          <CuriProvider router={router}>
            {() => (
              <Link to="Test" method="navigate">
                <Text>Test</Text>
              </Link>
            )}
          </CuriProvider>
        );
        const anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(mockNavigate.mock.calls.length).toBe(1);
        expect(mockPush.mock.calls.length).toBe(0);
        expect(mockReplace.mock.calls.length).toBe(0);
      });

      it("[push] calls history.push", () => {
        const router = curi(history, [{ name: "Test", path: "" }]);
        const tree = renderer.create(
          <CuriProvider router={router}>
            {() => (
              <Link to="Test" method="push">
                <Text>Test</Text>
              </Link>
            )}
          </CuriProvider>
        );
        const anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(mockNavigate.mock.calls.length).toBe(0);
        expect(mockPush.mock.calls.length).toBe(1);
        expect(mockReplace.mock.calls.length).toBe(0);
      });

      it("[replace] calls history.replace", () => {
        const router = curi(history, [{ name: "Test", path: "" }]);
        const tree = renderer.create(
          <CuriProvider router={router}>
            {() => (
              <Link to="Test" method="replace">
                <Text>Test</Text>
              </Link>
            )}
          </CuriProvider>
        );
        const anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(mockNavigate.mock.calls.length).toBe(0);
        expect(mockPush.mock.calls.length).toBe(0);
        expect(mockReplace.mock.calls.length).toBe(1);
      });

      it("[unknown] calls history.navigate", () => {
        const router = curi(history, [{ name: "Test", path: "" }]);
        const tree = renderer.create(
          <CuriProvider router={router}>
            {() => (
              <Link to="Test" method={"whatchamacallit" as LinkMethod}>
                <Text>Test</Text>
              </Link>
            )}
          </CuriProvider>
        );
        const anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(mockNavigate.mock.calls.length).toBe(1);
        expect(mockPush.mock.calls.length).toBe(0);
        expect(mockReplace.mock.calls.length).toBe(0);
      });
    });

    it("includes details in location passed to history.navigate", () => {
      const history = InMemory();
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;

      const router = curi(history, [{ name: "Test", path: "" }]);
      const tree = renderer.create(
        <CuriProvider router={router}>
          {() => (
            <Link to="Test" details={{ hash: "thing" }}>
              <Text>Test</Text>
            </Link>
          )}
        </CuriProvider>
      );
      const anchor = tree.root.findByType(TouchableHighlight);
      anchor.props.onPress(fakeEvent());
      const mockLocation = mockNavigate.mock.calls[0][0];
      expect(mockLocation).toMatchObject({
        pathname: "/",
        hash: "thing"
      });
    });

    describe("onPress", () => {
      it("calls onPress prop func if provided", () => {
        const history = InMemory();
        const mockNavigate = jest.fn();
        history.navigate = mockNavigate;
        const onPress = jest.fn();
        const router = curi(history, [{ name: "Test", path: "" }]);
        const tree = renderer.create(
          <CuriProvider router={router}>
            {() => (
              <Link to="Test" onPress={onPress}>
                <Text>Test</Text>
              </Link>
            )}
          </CuriProvider>
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
        const router = curi(history, [{ name: "Test", path: "" }]);
        const tree = renderer.create(
          <CuriProvider router={router}>
            {() => (
              <Link to="Test" onPress={onPress}>
                <Text>Test</Text>
              </Link>
            )}
          </CuriProvider>
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

      const router = curi(history, [{ name: "Test", path: "" }]);
      const tree = renderer.create(
        <CuriProvider router={router}>
          {() => (
            <Link to="Test">
              <Text>Test</Text>
            </Link>
          )}
        </CuriProvider>
      );
      const anchor = tree.root.findByType(TouchableHighlight);
      anchor.props.onPress(fakeEvent({ defaultPrevented: true }));
      expect(mockNavigate.mock.calls.length).toBe(0);
    });
  });
});
