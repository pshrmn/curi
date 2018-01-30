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
    it("renders a <TouchableHighlight> by default", done => {
      const history = InMemory();
      const router = curi(history, [{ name: "Test", path: "" }]);

      router.respond(
        () => {
          const tree = renderer.create(
            <CuriProvider
              router={router}
              render={() => (
                <Link to="Test">
                  <Text>Test</Text>
                </Link>
              )}
            />
          );
          const anchor = tree.root.findByType(TouchableHighlight);
          expect(anchor).toBeDefined();
          done();
        },
        { once: true }
      );
    });

    it("when provided, it renders the component instead of an anchor", done => {
      const history = InMemory();
      const router = curi(history, [{ name: "Test", path: "" }]);
      const StyledAnchor = props => (
        <TouchableHighlight style={{ borderColor: "orange" }} {...props} />
      );

      router.respond(
        () => {
          const tree = renderer.create(
            <CuriProvider
              router={router}
              render={() => (
                <Link to="Test" anchor={StyledAnchor}>
                  <Text>Test</Text>
                </Link>
              )}
            />
          );
          const anchor = tree.root.find(StyledAnchor);
          expect(anchor).toBeDefined();
          done();
        },
        { once: true }
      );
    });
  });

  describe("to", () => {
    it("uses the pathname from current response's location if 'to' is not provided", done => {
      const history = InMemory({ locations: ["/the-initial-location"] });
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;
      const routes = [];
      const router = curi(history, routes);
      router.respond(
        () => {
          const tree = renderer.create(
            <CuriProvider
              router={router}
              render={() => (
                <Link to={null}>
                  <Text>Test</Text>
                </Link>
              )}
            />
          );
          const anchor = tree.root.findByType(TouchableHighlight);
          anchor.props.onPress(fakeEvent());
          expect(mockNavigate.mock.calls[0][0].pathname).toBe(
            "/the-initial-location"
          );
          done();
        },
        { once: true }
      );
    });
  });

  describe("params", () => {
    it("uses params to generate the location to navigate to", done => {
      const history = InMemory();
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;

      const router = curi(history, [{ name: "Park", path: "/park/:name" }]);
      const params = { name: "Glacier" };
      router.respond(
        () => {
          const tree = renderer.create(
            <CuriProvider
              router={router}
              render={() => (
                <Link to="Park" params={params}>
                  <Text>Test</Text>
                </Link>
              )}
            />
          );
          const anchor = tree.root.findByType(TouchableHighlight);
          anchor.props.onPress(fakeEvent());
          expect(mockNavigate.mock.calls[0][0].pathname).toBe("/park/Glacier");
          done();
        },
        { once: true }
      );
    });

    it("updates location to navigate to when props change", done => {
      const history = InMemory();
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;

      const router = curi(history, [{ name: "Park", path: "/park/:name" }]);

      router.respond(
        () => {
          const params = { name: "Glacier" };
          const tree = renderer.create(
            <CuriProvider
              router={router}
              render={() => (
                <Link to="Park" params={params}>
                  <Text>Test</Text>
                </Link>
              )}
            />
          );
          const anchor = tree.root.findByType(TouchableHighlight);
          anchor.props.onPress(fakeEvent());
          expect(mockNavigate.mock.calls[0][0].pathname).toBe("/park/Glacier");

          const newParams = { name: "Yellowstone" };
          tree.update(
            <CuriProvider
              router={router}
              render={() => (
                <Link to="Park" params={newParams}>
                  <Text>Test</Text>
                </Link>
              )}
            />
          );
          anchor.props.onPress(fakeEvent());
          expect(mockNavigate.mock.calls[1][0].pathname).toBe(
            "/park/Yellowstone"
          );
          done();
        },
        { once: true }
      );
    });
  });

  describe("details", () => {
    it("merges the details prop with the generated pathname when navigating", done => {
      const history = InMemory();
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;

      const router = curi(history, [{ name: "Test", path: "test" }]);

      router.respond(
        () => {
          const tree = renderer.create(
            <CuriProvider
              router={router}
              render={() => (
                <Link to="Test" details={{ query: "one=two", hash: "hashtag" }}>
                  <Text>Test</Text>
                </Link>
              )}
            />
          );
          const anchor = tree.root.findByType(TouchableHighlight);
          anchor.props.onPress(fakeEvent());
          expect(mockNavigate.mock.calls[0][0]).toMatchObject({
            pathname: "/test",
            query: "one=two",
            hash: "hashtag"
          });
          done();
        },
        { once: true }
      );
    });

    it("providing a pathname in details does not overwrite the generated pathname", done => {
      const history = InMemory();
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;

      const router = curi(history, [{ name: "Test", path: "test" }]);
      router.respond(
        () => {
          const tree = renderer.create(
            <CuriProvider
              router={router}
              render={() => (
                <Link to="Test" details={{ pathname: "/not-a-test" }}>
                  <Text>Test</Text>
                </Link>
              )}
            />
          );
          const anchor = tree.root.findByType(TouchableHighlight);
          anchor.props.onPress(fakeEvent());
          expect(mockNavigate.mock.calls[0][0].pathname).toBe("/test");
          done();
        },
        { once: true }
      );
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

      it("throws on mount", done => {
        const history = InMemory();
        const router = curi(history, [{ name: "Test", path: "test" }]);
        router.respond(
          () => {
            expect(() => {
              const tree = renderer.create(
                <CuriProvider
                  router={router}
                  render={() => (
                    <Link to="Test" active={{ merge }}>
                      <Text>Test</Text>
                    </Link>
                  )}
                />
              );
            }).toThrow(
              'You are attempting to use the "active" prop, but have not included the "active" ' +
                "addon (@curi/addon-active) in your Curi router."
            );
            done();
          },
          { once: true }
        );
      });

      it("throws if adding active prop on re-render", done => {
        const history = InMemory();
        const router = curi(history, [{ name: "Test", path: "test" }]);

        router.respond(
          () => {
            const tree = renderer.create(
              <CuriProvider
                router={router}
                render={() => (
                  <Link to="Test">
                    <Text>Test</Text>
                  </Link>
                )}
              />
            );
            expect(() => {
              tree.update(
                <CuriProvider
                  router={router}
                  render={() => (
                    <Link to="Test" active={{ merge }}>
                      <Text>Test</Text>
                    </Link>
                  )}
                />
              );
            }).toThrow(
              'You are attempting to use the "active" prop, but have not included the "active" ' +
                "addon (@curi/addon-active) in your Curi router."
            );

            done();
          },
          { once: true }
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
            const tree = renderer.create(
              <CuriProvider
                router={router}
                render={() => (
                  <Link
                    to="Test"
                    style={{ borderColor: "blue" }}
                    active={{ merge }}
                  >
                    <Text>Test</Text>
                  </Link>
                )}
              />
            );
            const anchor = tree.root.findByType(TouchableHighlight);
            expect(anchor.props.style).toMatchObject({ borderColor: "blue" });
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
            const tree = renderer.create(
              <CuriProvider
                router={router}
                render={() => (
                  <Link
                    to="Test"
                    style={{ borderColor: "blue" }}
                    active={{ merge }}
                  >
                    <Text>Test</Text>
                  </Link>
                )}
              />
            );

            const anchor = tree.root.findByType(TouchableHighlight);
            expect(anchor.props.style).toMatchObject({ borderColor: "red" });
            done();
          },
          { once: true }
        );
      });
    });

    describe("partial", () => {
      it("works with partial matches", done => {
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

        router.respond(
          () => {
            const tree = renderer.create(
              <CuriProvider
                router={router}
                render={() => (
                  <Link
                    to="Test"
                    style={{ backgroundColor: "green" }}
                    active={{ partial: true, merge }}
                  >
                    <Text>Test</Text>
                  </Link>
                )}
              />
            );

            const anchor = tree.root.findByType(TouchableHighlight);
            expect(anchor.props.style).toMatchObject({
              backgroundColor: "green",
              borderColor: "red"
            });
            done();
          },
          { once: true }
        );
      });
    });

    describe("extra", () => {
      function extra(location, details = {}) {
        return location.query === details["query"];
      }

      it("uses extra function to run additional active checks", done => {
        const history = InMemory({ locations: ["/test?test=ing"] });
        const router = curi(history, [{ name: "Test", path: "test" }], {
          addons: [createActiveAddon()]
        });

        router.respond(
          () => {
            const tree = renderer.create(
              <CuriProvider
                router={router}
                render={() => (
                  <Link
                    to="Test"
                    details={{ query: "test=ing" }}
                    active={{ merge, extra }}
                  >
                    <Text>Test</Text>
                  </Link>
                )}
              />
            );

            const anchor = tree.root.findByType(TouchableHighlight);
            expect(anchor.props.style).toMatchObject({ borderColor: "red" });
            done();
          },
          { once: true }
        );
      });

      it("active is false when pathname matches, but extra returns false", done => {
        const history = InMemory({ locations: ["/test?test=ing"] });
        const router = curi(history, [{ name: "Test", path: "test" }], {
          addons: [createActiveAddon()]
        });

        router.respond(
          () => {
            const tree = renderer.create(
              <CuriProvider
                router={router}
                render={() => (
                  <Link to="Test" active={{ merge, extra }}>
                    <Text>Test</Text>
                  </Link>
                )}
              />
            );

            const anchor = tree.root.findByType(TouchableHighlight);
            expect(anchor.props.style).toBeUndefined();
            done();
          },
          { once: true }
        );
      });
    });
  });

  describe("pressing a link", () => {
    it("calls history.navigate", done => {
      const history = InMemory();
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;

      const router = curi(history, [{ name: "Test", path: "" }]);

      router.respond(
        () => {
          const tree = renderer.create(
            <CuriProvider
              router={router}
              render={() => (
                <Link to="Test">
                  <Text>Test</Text>
                </Link>
              )}
            />
          );
          const anchor = tree.root.findByType(TouchableHighlight);
          anchor.props.onPress(fakeEvent());
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
          const tree = renderer.create(
            <CuriProvider
              router={router}
              render={() => (
                <Link to="Test" details={{ hash: "thing" }}>
                  <Text>Test</Text>
                </Link>
              )}
            />
          );
          const anchor = tree.root.findByType(TouchableHighlight);
          anchor.props.onPress(fakeEvent());
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

    describe("onPress", () => {
      it("calls onPress prop func if provided", done => {
        const history = InMemory();
        const mockNavigate = jest.fn();
        history.navigate = mockNavigate;
        const onPress = jest.fn();
        const router = curi(history, [{ name: "Test", path: "" }]);

        router.respond(
          () => {
            const tree = renderer.create(
              <CuriProvider
                router={router}
                render={() => (
                  <Link to="Test" onPress={onPress}>
                    <Text>Test</Text>
                  </Link>
                )}
              />
            );
            const anchor = tree.root.findByType(TouchableHighlight);
            anchor.props.onPress(fakeEvent());
            expect(mockNavigate.mock.calls.length).toBe(1);
            expect(onPress.mock.calls.length).toBe(1);
            expect(mockNavigate.mock.calls.length).toBe(1);
            done();
          },
          { once: true }
        );
      });

      it("does not call history.navigate if onPress prevents default", done => {
        const history = InMemory();
        const mockNavigate = jest.fn();
        history.navigate = mockNavigate;
        const onPress = jest.fn(event => {
          event.preventDefault();
        });
        const router = curi(history, [{ name: "Test", path: "" }]);
        router.respond(
          () => {
            const tree = renderer.create(
              <CuriProvider
                router={router}
                render={() => (
                  <Link to="Test" onPress={onPress}>
                    <Text>Test</Text>
                  </Link>
                )}
              />
            );
            const anchor = tree.root.findByType(TouchableHighlight);
            anchor.props.onPress(fakeEvent());
            expect(onPress.mock.calls.length).toBe(1);
            expect(mockNavigate.mock.calls.length).toBe(0);
            done();
          },
          { once: true }
        );
      });
    });

    it("doesn't call history.navigate if event.preventDefault has been called", done => {
      const history = InMemory();
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;

      const router = curi(history, [{ name: "Test", path: "" }]);

      router.respond(
        () => {
          const tree = renderer.create(
            <CuriProvider
              router={router}
              render={() => (
                <Link to="Test">
                  <Text>Test</Text>
                </Link>
              )}
            />
          );
          const anchor = tree.root.findByType(TouchableHighlight);
          anchor.props.onPress(fakeEvent({ defaultPrevented: true }));
          expect(mockNavigate.mock.calls.length).toBe(0);
          done();
        },
        { once: true }
      );
    });
  });
});
