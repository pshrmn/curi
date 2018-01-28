import "jest";
import React from "react";
import PropTypes from "prop-types";
import { shallow, mount } from "enzyme";

import InMemory from "@hickory/in-memory";
import curi from "@curi/core";

import Curious from "../src/Curious";
import CuriBase from "../src/CuriBase";

describe("<Curious>", () => {
  describe("render props", () => {
    it("passes router", () => {
      const fakeRouter = { history: {} };
      const fakeResponse = { name: "Home", status: 200 };
      const fakeNavigation = { action: "PUSH" };
      const wrapper = shallow(
        <Curious
          render={({ router }) => {
            expect(router).toBe(fakeRouter);
            return null;
          }}
        />,
        {
          context: {
            curi: {
              router: fakeRouter,
              response: fakeResponse,
              navigation: fakeNavigation
            }
          }
        }
      );
    });

    it("passes response", () => {
      const fakeRouter = { history: {} };
      const fakeResponse = { name: "Home", status: 200 };
      const fakeNavigation = { action: "PUSH" };
      const wrapper = shallow(
        <Curious
          render={({ response }) => {
            expect(response).toBe(fakeResponse);
            return null;
          }}
        />,
        {
          context: {
            curi: {
              router: fakeRouter,
              response: fakeResponse,
              navigation: fakeNavigation
            }
          }
        }
      );
    });

    it("passes navigation", () => {
      const fakeRouter = { history: {} };
      const fakeResponse = { name: "Home", status: 200 };
      const fakeNavigation = { action: "POP" };

      const wrapper = shallow(
        <Curious
          render={({ navigation }) => {
            expect(navigation).toBe(fakeNavigation);
            return null;
          }}
        />,
        {
          context: {
            curi: {
              router: fakeRouter,
              response: fakeResponse,
              navigation: fakeNavigation
            }
          }
        }
      );
    });
  });

  describe("responsive", () => {
    let history, router;
    const routes = [
      { name: "Home", path: "" },
      { name: "About", path: "about" }
    ];

    beforeEach(() => {
      history = InMemory();
      router = curi(history, routes);
    });

    it("passes response/navigation/router from context on initial render", () => {
      router.respond(
        ({ response, navigation }) => {
          // initial render
          const wrapper = mount(
            <Curious
              responsive={true}
              render={({
                router: routerProp,
                response: responseProp,
                navigation: navigationProp
              }) => {
                expect(routerProp).toBe(router);
                expect(responseProp).toBe(response);
                expect(navigationProp).toBe(navigation);
                return null;
              }}
            />,
            {
              context: { curi: { router, response, navigation } }
            }
          );
        },
        { once: true }
      );
    });

    it("re-calls render when responses are emitted", done => {
      router.respond(
        ({ response, navigation }) => {
          // initial render
          const wrapper = mount(
            <Curious
              responsive={true}
              render={({ response }) => <div>{response.name}</div>}
            />,
            {
              context: { curi: { router, response, navigation } }
            }
          );
          expect(wrapper.text()).toBe("Home");

          history.push("/about");
          // push to queue because we need to wait for response to be emitted
          setTimeout(() => {
            expect(wrapper.text()).toBe("About");
            done();
          }, 0);
        },
        { once: true }
      );
    });

    it("prevents extra setState/render when mounting", done => {
      const fn = jest.fn(() => {
        return null;
      });
      router.respond(
        ({ response, navigation }) => {
          // initial render
          const wrapper = mount(<Curious responsive={true} render={fn} />, {
            context: { curi: { router, response, navigation } }
          });
          expect(fn.mock.calls.length).toBe(1);
          done();
        },
        { once: true }
      );
    });

    it("warns when trying to change the responsive prop", done => {
      const oError = console.error;
      console.error = jest.fn();
      router.respond(
        ({ response, navigation }) => {
          // initial render
          const wrapper = mount(
            <Curious
              responsive={true}
              render={({ response }) => <div>{response.name}</div>}
            />,
            {
              context: { curi: { router, response, navigation } }
            }
          );
          expect(wrapper.text()).toBe("Home");

          wrapper.setProps({ responsive: false });
          expect((console.error as jest.Mock).mock.calls[0][0]).toBe(
            'Warning: The "responsive" prop of <Curious> cannot be changed.'
          );
          console.error = oError;
          done();
        },
        { once: true }
      );
    });

    describe("router prop", () => {
      it("subscribes using router prop without responsive prop", done => {
        let renderCount = 0;
        router.respond(
          ({ response }) => {
            // initial render
            const wrapper = mount(
              <Curious
                router={router}
                render={({ response }) => {
                  expect(response.name).toBe("Home");
                  done();
                  return null;
                }}
              />
            );
          },
          { once: true }
        );
      });

      it("initial response/navigation are null when router hasn't resolved first response", done => {
        let firstCall = true;
        const router = curi(history, routes);
        const wrapper = shallow(
          <Curious
            router={router}
            render={({ response, navigation }) => {
              if (firstCall) {
                expect(response).toBe(null);
                expect(navigation).toBe(null);
                done();
                firstCall = false;
              }
              return null;
            }}
          />
        );
      });

      it("warns when trying to change the router prop", done => {
        const oError = console.error;
        console.error = jest.fn();
        const firstRouter = curi(history, routes);
        const secondRouter = curi(history, routes);
        firstRouter.respond(
          ({ response }) => {
            // initial render
            const wrapper = mount(
              <Curious
                router={firstRouter}
                render={({ response }) => {
                  return <div>{response.name}</div>;
                }}
              />
            );

            wrapper.setProps({ router: secondRouter });
            expect((console.error as jest.Mock).mock.calls[0][0]).toBe(
              'Warning: The "router" prop of <Curious> cannot be changed.'
            );
            console.error = oError;
            done();
          },
          { once: true }
        );
      });
    });

    it("unsubscribes when unmounting", () => {
      let unsubscriber;
      const fakeResponse = { name: "Home", status: 200 };
      const fakeRouter = {
        respond: jest.fn(() => {
          unsubscriber = jest.fn();
          return unsubscriber;
        }),
        current: () => ({
          response: fakeResponse,
          navigation: { action: "PUSH" }
        })
      };
      const fakeNavigation = { action: "REPLACE" };
      const wrapper = shallow(
        <Curious
          responsive={true}
          render={({ router }) => {
            expect(router).toBe(fakeRouter);
            return null;
          }}
        />,
        {
          context: {
            curi: {
              router: fakeRouter,
              response: fakeResponse,
              navigation: fakeNavigation
            }
          }
        }
      );
      expect(fakeRouter.respond.mock.calls.length).toBe(1);
      expect(unsubscriber.mock.calls.length).toBe(0);

      wrapper.unmount();
      expect(unsubscriber.mock.calls.length).toBe(1);
    });
  });
});
