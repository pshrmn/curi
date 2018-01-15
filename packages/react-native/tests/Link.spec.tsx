import "jest";
import React from "react";
import "react-native";
import { shallow, mount } from "enzyme";

import InMemory from "@hickory/in-memory";
import curi, { Response } from "@curi/core";
import createActiveAddon from "@curi/addon-active";
import { TouchableHighlight } from "react-native";
import Link from "../src/Link";

function press(el) {
  // click the <Link> to see where it goes
  const pressEvent = {
    defaultPrevented: false,
    preventDefault() {
      this.defaultPrevented = true;
    }
  };
  el.simulate("press", pressEvent);
}

describe("<Link>", () => {
  describe("router and response", () => {
    it("can get them from the props", () => {
      const history = InMemory();
      const router = curi(history, [{ name: "Test", path: "" }], {
        addons: [createActiveAddon()]
      });
      const fakeResponse = { name: "Test", params: {} } as Response;
      function merge(props) {
        props.style = Object.assign(props.style || {}, { borderColor: "red" });
        return props;
      }
      const wrapper = shallow(
        <Link
          to="Test"
          router={router}
          active={{ merge }}
          response={fakeResponse}
        >
          Test
        </Link>
      );
      const a = wrapper.find(TouchableHighlight);
      expect(a.prop("style")).toMatchObject({ borderColor: "red" });
    });

    it("can get them from the context", () => {
      const history = InMemory();
      const router = curi(history, [{ name: "Test", path: "" }], {
        addons: [createActiveAddon()]
      });
      const fakeResponse = { name: "Test", params: {} } as Response;
      function merge(props) {
        props.style = Object.assign(props.style || {}, { borderColor: "red" });
        return props;
      }
      const wrapper = shallow(
        <Link to="Test" active={{ merge }}>
          Test
        </Link>,
        { context: { curi: { router, response: fakeResponse } } }
      );
      const a = wrapper.find(TouchableHighlight);
      expect(a.prop("style")).toMatchObject({ borderColor: "red" });
    });

    it("prefers props over context", () => {
      const history = InMemory();
      const router = curi(history, [{ name: "Test", path: "" }], {
        addons: [createActiveAddon()]
      });
      const propResponse = { name: "Test", params: {} } as Response;
      const contextResponse = { name: "Not a Test", params: {} } as Response;
      function merge(props) {
        props.style = Object.assign(props.style || {}, { borderColor: "red" });
        return props;
      }
      const wrapper = shallow(
        <Link
          to="Test"
          router={router}
          active={{ merge }}
          response={propResponse}
        >
          Test
        </Link>,
        { context: { curi: { router, response: contextResponse } } }
      );
      const a = wrapper.find(TouchableHighlight);
      expect(a.prop("style")).toMatchObject({ borderColor: "red" });
    });

    it("errors if it cannot access a curi router", () => {
      const err = console.error;
      console.error = () => {};

      expect(() => {
        shallow(<Link to="Test">Test</Link>);
      }).toThrow();

      console.error = err;
    });
  });

  describe("anchor", () => {
    it("renders a <TouchableHighlight> by default", () => {
      const history = InMemory();
      const router = curi(history, [{ name: "Test", path: "" }]);
      const wrapper = shallow(<Link to="Test">Test</Link>, {
        context: { curi: { router } }
      });
      const a = wrapper.find(TouchableHighlight);
      expect(a.exists()).toBe(true);
    });

    it.skip("when provided, it renders the component instead of an anchor", () => {
      // skipping until I figure out React Native + enzyme mount
      const history = InMemory();
      const router = curi(history, [{ name: "Test", path: "" }]);
      const StyledAnchor = props => (
        <TouchableHighlight style={{ borderColor: "orange" }} {...props} />
      );
      // need to mount here so that the styled anchor also renders
      const wrapper = mount(
        <Link anchor={StyledAnchor} to="Test">
          Test
        </Link>,
        {
          context: { curi: { router } }
        }
      );
      const a = wrapper.find(TouchableHighlight);
      expect(a.exists()).toBe(true);
      expect(a.prop("style")).toEqual({ borderColor: "orange" });
    });
  });

  describe("to", () => {
    it("uses the pathname from current response's location if 'to' is not provided", () => {
      const history = InMemory({
        locations: ["/the-initial-location"]
      });
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;

      const router = curi(history, []);
      const wrapper = shallow(<Link to={null}>Test</Link>, {
        context: { curi: { router, response: { location: history.location } } }
      });

      const a = wrapper.find(TouchableHighlight);
      press(a);
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
      const wrapper = shallow(
        <Link to="Park" params={params}>
          Test
        </Link>,
        {
          context: { curi: { router } }
        }
      );
      const a = wrapper.find(TouchableHighlight);
      press(a);
      expect(mockNavigate.mock.calls[0][0].pathname).toBe("/park/Glacier");
    });

    it("updates location to navigate to when props change", () => {
      const history = InMemory();
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;

      const router = curi(history, [{ name: "Park", path: "/park/:name" }]);
      const params = { name: "Glacier" };
      const wrapper = shallow(
        <Link to="Park" params={params}>
          Test
        </Link>,
        {
          context: { curi: { router } }
        }
      );
      let a = wrapper.find(TouchableHighlight);
      press(a);
      expect(mockNavigate.mock.calls[0][0].pathname).toBe("/park/Glacier");

      wrapper.setProps({ params: { name: "Yellowstone" } });
      a = wrapper.find(TouchableHighlight);
      press(a);
      expect(mockNavigate.mock.calls[1][0].pathname).toBe("/park/Yellowstone");
    });
  });

  describe("details", () => {
    it("merges the details prop with the generated pathname when navigating", () => {
      const history = InMemory();
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;

      const router = curi(history, [{ name: "Test", path: "test" }]);
      const wrapper = shallow(
        <Link to="Test" details={{ query: "one=two", hash: "hashtag" }}>
          Test
        </Link>,
        { context: { curi: { router } } }
      );
      const a = wrapper.find(TouchableHighlight);
      press(a);
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
      const wrapper = shallow(
        <Link to="Test" details={{ pathname: "/not-a-test" }}>
          Test
        </Link>,
        { context: { curi: { router } } }
      );
      const a = wrapper.find(TouchableHighlight);
      press(a);
      expect(mockNavigate.mock.calls[0][0].pathname).toBe("/test");
    });
  });

  describe("active", () => {
    describe("without @curi/addon-active", () => {
      it("throws on mount", () => {
        const history = InMemory();
        const router = curi(history, [{ name: "Test", path: "test" }]);
        const fakeResponse = {};
        function merge(props) {
          props.style = Object.assign(props.style || {}, {
            borderColor: "red"
          });
          return props;
        }

        expect(() => {
          const wrapper = shallow(
            <Link to="Test" active={{ merge }}>
              Test
            </Link>,
            { context: { curi: { router, response: fakeResponse } } }
          );
        }).toThrow(
          'You are attempting to use the "active" prop, but have not included the "active" ' +
            "addon (@curi/addon-active) in your Curi router."
        );
      });

      it("throws if adding active prop on re-render", () => {
        const history = InMemory();
        const router = curi(history, [{ name: "Test", path: "test" }]);
        const fakeResponse = {};
        function merge(props) {
          props.style = Object.assign(props.style || {}, {
            borderColor: "red"
          });
          return props;
        }

        const wrapper = shallow(<Link to="Test">Test</Link>, {
          context: { curi: { router, response: fakeResponse } }
        });

        expect(() => {
          wrapper.setProps({ active: { merge } });
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
        const fakeResponse = { name: "Other" };
        function merge(props) {
          props.style = Object.assign(props.style || {}, {
            borderColor: "red"
          });
          return props;
        }

        const wrapper = shallow(
          <Link to="Test" style={{ borderColor: "blue" }} active={{ merge }}>
            Test
          </Link>,
          { context: { curi: { router, response: fakeResponse } } }
        );
        const link = wrapper.find(TouchableHighlight);
        expect(link.prop("style")).toMatchObject({ borderColor: "blue" });
      });

      it("calls merge function when <Link>'s props match the current response's", () => {
        const history = InMemory();
        const router = curi(history, [{ name: "Test", path: "test" }], {
          addons: [createActiveAddon()]
        });
        const fakeResponse = { name: "Test", params: {} };
        function merge(props) {
          props.style = Object.assign(props.style || {}, {
            borderColor: "red"
          });
          return props;
        }

        const wrapper = shallow(
          <Link to="Test" style={{ borderColor: "blue" }} active={{ merge }}>
            Test
          </Link>,
          { context: { curi: { router, response: fakeResponse } } }
        );
        const link = wrapper.find(TouchableHighlight);
        expect(link.prop("style")).toMatchObject({ borderColor: "red" });
      });
    });

    describe("partial", () => {
      it("works with partial matches", () => {
        const history = InMemory();
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
        const fakeResponse = { name: "Nested", partials: ["Test"], params: {} };
        function merge(props) {
          props.style = Object.assign(props.style || {}, {
            borderColor: "red"
          });
          return props;
        }

        const wrapper = shallow(
          <Link
            to="Test"
            style={{ backgroundColor: "green" }}
            active={{ partial: true, merge }}
          >
            Test
          </Link>,
          { context: { curi: { router, response: fakeResponse } } }
        );
        const link = wrapper.find(TouchableHighlight);
        expect(link.prop("style")).toMatchObject({
          backgroundColor: "green",
          borderColor: "red"
        });
      });
    });

    describe("extra", () => {
      it("uses extra function to run additional active checks", () => {
        const history = InMemory();
        const router = curi(history, [{ name: "Test", path: "test" }], {
          addons: [createActiveAddon()]
        });
        const fakeResponse = {
          name: "Test",
          params: {},
          location: { query: "test=ing" }
        };
        function merge(props) {
          props.style = Object.assign(props.style || {}, {
            borderColor: "red"
          });
          return props;
        }

        function extra(location, details = {}) {
          return location.query === details["query"];
        }

        const wrapper = shallow(
          <Link
            to="Test"
            details={{ query: "test=ing" }}
            active={{ merge, extra }}
          >
            Test
          </Link>,
          { context: { curi: { router, response: fakeResponse } } }
        );
        const link = wrapper.find(TouchableHighlight);
        expect(link.prop("style")).toMatchObject({ borderColor: "red" });
      });

      it("active is false when pathname matches, but extra returns false", () => {
        const history = InMemory();
        const router = curi(history, [{ name: "Test", path: "test" }], {
          addons: [createActiveAddon()]
        });
        const fakeResponse = {
          name: "Test",
          params: {},
          location: { query: "test=ing" }
        };
        function merge(props) {
          props.style = Object.assign(props.style || {}, {
            borderColor: "red"
          });
          return props;
        }

        function extra(location, details = {}) {
          return location.query === details["query"];
        }

        const wrapper = shallow(
          <Link to="Test" active={{ merge, extra }}>
            Test
          </Link>,
          { context: { curi: { router, response: fakeResponse } } }
        );
        const link = wrapper.find(TouchableHighlight);
        expect(link.prop("style")).toBeUndefined();
      });
    });
  });

  describe("pressing a link", () => {
    it("calls history.navigate", () => {
      const history = InMemory();
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;

      const router = curi(history, [{ name: "Test", path: "" }]);
      const wrapper = shallow(<Link to="Test">Test</Link>, {
        context: { curi: { router } }
      });
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
      wrapper.find(TouchableHighlight).simulate("press", leftClickEvent);
      expect(mockNavigate.mock.calls.length).toBe(1);
    });

    it("includes details in location passed to history.navigate", () => {
      const history = InMemory();
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;

      const router = curi(history, [{ name: "Test", path: "" }]);
      const wrapper = shallow(
        <Link to="Test" details={{ hash: "thing" }}>
          Test
        </Link>,
        {
          context: { curi: { router } }
        }
      );
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
      wrapper.find(TouchableHighlight).simulate("press", leftClickEvent);
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
        const wrapper = shallow(
          <Link to="Test" onPress={onPress}>
            Test
          </Link>,
          {
            context: { curi: { router } }
          }
        );
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
        wrapper.find(TouchableHighlight).simulate("press", leftClickEvent);
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
        const wrapper = shallow(
          <Link to="Test" onPress={onPress}>
            Test
          </Link>,
          {
            context: { curi: { router } }
          }
        );
        const a = wrapper.find(TouchableHighlight);
        press(a);
        expect(onPress.mock.calls.length).toBe(1);
        expect(mockNavigate.mock.calls.length).toBe(0);
      });
    });

    it("doesn't call history.navigate if event.preventDefault has been called", () => {
      const history = InMemory();
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;

      const router = curi(history, [{ name: "Test", path: "" }]);
      const wrapper = shallow(<Link to="Test">Test</Link>, {
        context: { curi: { router } }
      });
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
      wrapper.find(TouchableHighlight).simulate("press", preventedEvent);
      expect(mockNavigate.mock.calls.length).toBe(0);
    });
  });
});
