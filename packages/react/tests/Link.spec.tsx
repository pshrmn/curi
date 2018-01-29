import "jest";
import React from "react";
import { shallow, mount } from "enzyme";
import InMemory from "@hickory/in-memory";
import curi, { Response } from "@curi/core";
import createActiveAddon from "@curi/addon-active";
import Link from "../src/Link";
import CuriProvider from "../src/CuriProvider";

function render(router, fn) {
  return mount(<CuriProvider router={router} render={fn} />);
}

describe("<Link>", () => {
  let history, router;
  const routes = [{ name: "Test", path: "" }];

  beforeEach(() => {
    history = InMemory();
    router = curi(history, routes);
  });

  describe("anchor", () => {
    it("renders an <a> by default", () => {
      const wrapper = render(router, () => <Link to="Test">Test</Link>);
      const a = wrapper.find("a");
      expect(a.exists()).toBe(true);
    });

    it("renders the provided component instead of an anchor", () => {
      const StyledAnchor = props => (
        <a style={{ color: "orange" }} {...props} />
      );
      // need to mount here so that the styled anchor also renders
      const wrapper = render(router, () => (
        <Link anchor={StyledAnchor} to="Test">
          Test
        </Link>
      ));
      const a = wrapper.find("a");
      expect(a.exists()).toBe(true);
      expect(a.prop("style")).toEqual({ color: "orange" });
    });
  });

  describe("to", () => {
    it("sets the href attribute using the named route's path", () => {
      const wrapper = render(router, () => <Link to="Test">Test</Link>);
      const a = wrapper.find("a");
      expect(a.prop("href")).toBe("/");
    });

    it("uses the pathname from current response's location if 'to' is not provided", done => {
      const history = InMemory({
        locations: ["/the-initial-location"]
      });
      const router = curi(history, []);
      router.respond(
        () => {
          const wrapper = render(router, () => <Link to={null}>Test</Link>);
          const a = wrapper.find("a");
          expect(a.prop("href")).toBe("/the-initial-location");
          done();
        },
        { once: true }
      );
    });
  });

  describe("params", () => {
    let history, router;
    const routes = [{ name: "Park", path: "/park/:name" }];

    beforeEach(() => {
      history = InMemory();
      router = curi(history, routes);
    });

    it("uses params to generate the href", () => {
      const params = { name: "Glacier" };
      const wrapper = render(router, () => (
        <Link to="Park" params={params}>
          Test
        </Link>
      ));
      const a = wrapper.find("a");
      expect(a.prop("href")).toBe("/park/Glacier");
    });

    it.skip("updates href when props change", () => {
      // figure out how to update these props
      const params = { name: "Glacier" };
      const wrapper = render(router, () => (
        <Link to="Park" params={params}>
          Test
        </Link>
      ));
      let a = wrapper.find("a");
      expect(a.prop("href")).toBe("/park/Glacier");

      wrapper.setProps({ params: { name: "Yellowstone" } });
      a = wrapper.find("a");
      expect(a.prop("href")).toBe("/park/Yellowstone");
    });
  });

  describe("details", () => {
    it("merges the details prop with the generated pathname when navigating", done => {
      const history = InMemory();
      const router = curi(history, [{ name: "Test", path: "test" }]);
      router.respond(
        () => {
          const wrapper = render(router, () => (
            <Link to="Test" details={{ query: "one=two", hash: "#hashtag" }}>
              Test
            </Link>
          ));
          const a = wrapper.find("a");
          expect(a.prop("href")).toBe("/test?one=two#hashtag");
          done();
        },
        { once: true }
      );
    });

    it("providing a pathname in details does not overwrite the generated pathname", done => {
      const history = InMemory();
      const router = curi(history, [{ name: "Test", path: "test" }]);
      router.respond(
        () => {
          const wrapper = render(router, () => (
            <Link to="Test" details={{ pathname: "/not-a-test" }}>
              Test
            </Link>
          ));
          const a = wrapper.find("a");
          expect(a.prop("href")).toBe("/test");
          done();
        },
        { once: true }
      );
    });
  });

  describe("active", () => {
    function merge(props) {
      if (props.className) {
        props.className += " active";
      } else {
        props.className = "active";
      }
      return props;
    }

    describe("without @curi/addon-active", () => {
      it("throws on mount", done => {
        const history = InMemory();
        const router = curi(history, [{ name: "Test", path: "test" }]);

        const realError = console.error;
        console.error = jest.fn();

        router.respond(
          () => {
            expect(() => {
              const wrapper = render(router, () => (
                <Link to="Test" active={{ merge }}>
                  Test
                </Link>
              ));
            }).toThrow(
              'You are attempting to use the "active" prop, but have not included the "active" ' +
                "addon (@curi/addon-active) in your Curi router."
            );
            console.error = realError;
            done();
          },
          { once: true }
        );
      });

      it.skip("throws if adding active prop on re-render", () => {
        // another test to figure out updating props
        const history = InMemory();
        const router = curi(history, [{ name: "Test", path: "test" }]);

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
      it("does not call merge if the <Link>'s props do not match the current response's", done => {
        const history = InMemory();
        const router = curi(history, [{ name: "Test", path: "test" }], {
          addons: [createActiveAddon()]
        });

        router.respond(
          () => {
            const wrapper = render(router, () => (
              <Link to="Test" className="test" active={{ merge }}>
                Test
              </Link>
            ));
            const link = wrapper.find("a");
            expect(link.prop("className")).toBe("test");
            done();
          },
          { once: true }
        );
      });

      it("calls merge function when <Link>'s props match the current response's", done => {
        const history = InMemory({ locations: ["/test"] });
        const router = curi(history, [{ name: "Test", path: "test" }], {
          addons: [createActiveAddon()]
        });

        router.respond(
          () => {
            const wrapper = render(router, () => (
              <Link to="Test" className="test" active={{ merge }}>
                Test
              </Link>
            ));
            const link = wrapper.find("a");
            expect(link.prop("className")).toBe("test active");
            done();
          },
          { once: true }
        );
      });
    });

    describe("partial", () => {
      it("works with partial matches", done => {
        const history = InMemory({ locations: ["/test/nested"] });
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
        router.respond(
          () => {
            const wrapper = render(router, () => (
              <Link
                to="Test"
                className="test"
                active={{ partial: true, merge }}
              >
                Test
              </Link>
            ));
            const link = wrapper.find("a");
            expect(link.prop("className")).toBe("test active");
            done();
          },
          { once: true }
        );
      });
    });

    describe("extra", () => {
      it("uses extra function to run additional active checks", done => {
        const history = InMemory({ locations: ["/test?test=ing"] });
        const router = curi(history, [{ name: "Test", path: "test" }], {
          addons: [createActiveAddon()]
        });

        function extra(location, details = {}) {
          return location.query === details["query"];
        }

        router.respond(
          () => {
            const wrapper = render(router, () => (
              <Link
                to="Test"
                details={{ query: "test=ing" }}
                active={{ merge, extra }}
              >
                Test
              </Link>
            ));
            const link = wrapper.find("a");
            expect(link.prop("className")).toBe("active");
            done();
          },
          { once: true }
        );
      });

      it("active is false when pathname matches, but extra returns false", done => {
        const history = InMemory();
        const router = curi(history, [{ name: "Test", path: "test" }], {
          addons: [createActiveAddon()]
        });

        function extra(location, details = {}) {
          return location.query === details["query"];
        }

        router.respond(
          () => {
            const wrapper = render(router, () => (
              <Link to="Test" active={{ merge, extra }}>
                Test
              </Link>
            ));
            const link = wrapper.find("a");
            expect(link.prop("className")).toBeUndefined();
            done();
          },
          { once: true }
        );
      });
    });
  });

  describe("clicking a link", () => {
    it("calls history.navigate", done => {
      const history = InMemory();
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;

      const router = curi(history, [{ name: "Test", path: "" }]);
      router.respond(
        () => {
          const wrapper = render(router, () => <Link to="Test">Test</Link>);
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
          wrapper.find("a").simulate("click", leftClickEvent);
          expect(mockNavigate.mock.calls.length).toBe(1);
          done();
        },
        { once: true }
      );
    });

    it("includes details in location passed to history.navigate", done => {
      const history = InMemory();
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;

      const router = curi(history, [{ name: "Test", path: "" }]);
      router.respond(
        () => {
          const wrapper = render(router, () => (
            <Link to="Test" details={{ hash: "thing" }}>
              Test
            </Link>
          ));
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
          wrapper.find("a").simulate("click", leftClickEvent);
          const mockLocation = mockNavigate.mock.calls[0][0];
          expect(mockLocation).toMatchObject({
            pathname: "/",
            hash: "thing"
          });
          done();
        },
        { once: true }
      );
    });

    describe("onClick", () => {
      it("calls onClick prop func if provided", done => {
        const history = InMemory();
        const mockNavigate = jest.fn();
        history.navigate = mockNavigate;
        const onClick = jest.fn();
        const router = curi(history, [{ name: "Test", path: "" }]);

        router.respond(
          () => {
            const wrapper = render(router, () => (
              <Link to="Test" onClick={onClick}>
                Test
              </Link>
            ));
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
            wrapper.find("a").simulate("click", leftClickEvent);
            expect(onClick.mock.calls.length).toBe(1);
            expect(mockNavigate.mock.calls.length).toBe(1);
            done();
          },
          { once: true }
        );
      });

      it("does not call history.navigate if onClick prevents default", done => {
        const history = InMemory();
        const mockNavigate = jest.fn();
        history.navigate = mockNavigate;
        const onClick = jest.fn(event => {
          event.preventDefault();
        });
        const router = curi(history, [{ name: "Test", path: "" }]);
        router.respond(
          () => {
            const wrapper = render(router, () => (
              <Link to="Test" onClick={onClick}>
                Test
              </Link>
            ));
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
            wrapper.find("a").simulate("click", leftClickEvent);
            expect(onClick.mock.calls.length).toBe(1);
            expect(mockNavigate.mock.calls.length).toBe(0);
            done();
          },
          { once: true }
        );
      });
    });

    it("doesn't call history.navigate for modified clicks", done => {
      const history = InMemory();
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;

      const router = curi(history, [{ name: "Test", path: "" }]);
      router.respond(
        () => {
          const wrapper = render(router, () => <Link to="Test">Test</Link>);
          const modifiedClickEvent = {
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
            const eventCopy = Object.assign({}, modifiedClickEvent);
            eventCopy[m] = true;
            wrapper.find("a").simulate("click", eventCopy);
            expect(mockNavigate.mock.calls.length).toBe(0);
          });
          done();
        },
        { once: true }
      );
    });

    it("doesn't call history.navigate if event.preventDefault has been called", done => {
      const history = InMemory();
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;

      const router = curi(history, [{ name: "Test", path: "" }]);

      router.respond(
        () => {
          const wrapper = render(router, () => <Link to="Test">Test</Link>);
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
          wrapper.find("a").simulate("click", preventedEvent);
          expect(mockNavigate.mock.calls.length).toBe(0);
          done();
        },
        { once: true }
      );
    });
  });
});
