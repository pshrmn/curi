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

      const wrapper = shallow(
        <Curious
          render={({ router }) => {
            expect(router).toBe(fakeRouter);
            return null;
          }}
        />,
        {
          context: { curi: { router: fakeRouter, response: fakeResponse } }
        }
      );
    });

    it("passes response", () => {
      const fakeRouter = { history: {} };
      const fakeResponse = { name: "Home", status: 200 };

      const wrapper = shallow(
        <Curious
          render={({ response }) => {
            expect(response).toBe(fakeResponse);
            return null;
          }}
        />,
        {
          context: { curi: { router: fakeRouter, response: fakeResponse } }
        }
      );
    });

    it("passes action", () => {
      const fakeRouter = { history: {} };
      const fakeResponse = { name: "Home", status: 200 };
      const fakeAction = "POP";

      const wrapper = shallow(
        <Curious
          render={({ action }) => {
            expect(action).toBe(fakeAction);
            return null;
          }}
        />,
        {
          context: {
            curi: {
              router: fakeRouter,
              response: fakeResponse,
              action: fakeAction
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

    it("passes response/action/router from context on initial render", () => {
      router.respond(
        (response, action) => {
          // initial render
          const wrapper = mount(
            <Curious
              responsive={true}
              render={({
                router: routerProp,
                response: responseProp,
                action: actionProp
              }) => {
                expect(routerProp).toBe(router);
                expect(responseProp).toBe(response);
                expect(actionProp).toBe(action);
                return null;
              }}
            />,
            {
              context: { curi: { router, response, action } }
            }
          );
        },
        { once: true }
      );
    });

    it("re-calls render when responses are emitted", done => {
      router.respond(
        response => {
          // initial render
          const wrapper = mount(
            <Curious
              responsive={true}
              render={({ response }) => <div>{response.name}</div>}
            />,
            {
              context: { curi: { router, response } }
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

    it("warns when trying to change the responsive prop", done => {
      const oError = console.error;
      console.error = jest.fn();
      router.respond(
        response => {
          // initial render
          const wrapper = mount(
            <Curious
              responsive={true}
              render={({ response }) => <div>{response.name}</div>}
            />,
            {
              context: { curi: { router, response } }
            }
          );
          expect(wrapper.text()).toBe("Home");

          wrapper.setProps({ responsive: false });
          expect(console.error.mock.calls[0][0]).toBe(
            'Warning: The "responsive" prop of <Curious> cannot be changed.'
          );
          console.error = oError;
          done();
        },
        { once: true }
      );
    });

    describe("router prop", () => {
      it("subscribes using router prop", done => {
        let renderCount = 0;
        router.respond(
          response => {
            // initial render
            const wrapper = mount(
              <Curious
                responsive={true}
                router={router}
                render={({ response }) => {
                  if (renderCount++ === 0) {
                    expect(response).toBe(undefined);
                  } else {
                    expect(response.name).toBe("Home");
                    done();
                  }
                  return null;
                }}
              />
            );
          },
          { once: true }
        );
      });

      it("initial response/action are undefined when there is no context fallback", done => {
        let firstCall = true;
        router.respond(
          response => {
            const wrapper = shallow(
              <Curious
                responsive={true}
                router={router}
                render={({ response, action }) => {
                  if (firstCall) {
                    expect(response).toBeUndefined();
                    expect(action).toBeUndefined();
                    done();
                    firstCall = false;
                  }
                  return null;
                }}
              />
            );
          },
          { once: true }
        );
      });
    });

    it("unsubscribes when unmounting", () => {
      let unsubscriber;
      const fakeRouter = {
        respond: jest.fn(() => {
          unsubscriber = jest.fn();
          return unsubscriber;
        })
      };
      const fakeResponse = { name: "Home", status: 200 };

      const wrapper = shallow(
        <Curious
          responsive={true}
          render={({ router }) => {
            expect(router).toBe(fakeRouter);
            return null;
          }}
        />,
        {
          context: { curi: { router: fakeRouter, response: fakeResponse } }
        }
      );
      expect(fakeRouter.respond.mock.calls.length).toBe(1);
      expect(unsubscriber.mock.calls.length).toBe(0);

      wrapper.unmount();
      expect(unsubscriber.mock.calls.length).toBe(1);
    });
  });
});
