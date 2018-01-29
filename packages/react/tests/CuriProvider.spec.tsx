import "jest";
import React from "react";
import { shallow, mount } from "enzyme";
import curi from "@curi/core";
import InMemory from "@hickory/in-memory";

import CuriProvider from "../src/CuriProvider";
import { Consumer as Curious } from "../src/Context";

import { Response, Navigation } from "@curi/core";

describe("<CuriProvider>", () => {
  const routes = [{ name: "Home", path: "" }, { name: "About", path: "about" }];

  describe("render", () => {
    it("calls render function when it renders", () => {
      const history = InMemory();
      const router = curi(history, []);

      const fn = jest.fn(() => {
        return null;
      });
      const wrapper = shallow(<CuriProvider router={router} render={fn} />);
      expect(fn.mock.calls.length).toBe(1);
    });

    it("re-calls render prop when the location changes", done => {
      const history = InMemory();
      const router = curi(history, routes);
      let pushedHistory = false;

      const fn = jest.fn(({ response }) => {
        if (pushedHistory) {
          expect(response.name).toBe("About");
          done();
        } else {
          expect(response.name).toBe("Home");
        }
        return null;
      });

      router.respond(
        () => {
          const wrapper = mount(<CuriProvider router={router} render={fn} />);
          history.push("/about");
          pushedHistory = true;
        },
        { once: true }
      );
    });

    it("passes { response, navigation, router } to render prop", done => {
      const history = InMemory();
      const fn = jest.fn(({ response, navigation, router: routerProp }) => {
        expect(response).toMatchObject({
          name: "Home"
        });
        expect(navigation).toMatchObject({
          action: "PUSH"
        });
        expect(routerProp).toBe(router);
        done();
        return null;
      });

      const router = curi(history, routes);
      router.respond(
        () => {
          const wrapper = mount(<CuriProvider router={router} render={fn} />);
        },
        { once: true }
      );
    });
  });

  describe("context", () => {
    it("makes response, navigation, and router available to <Curious>", done => {
      let emittedResponse;
      let emittedNavigation;
      const history = InMemory();
      const router = curi(history, routes);

      const ContextLogger: React.ComponentType = () => (
        <Curious>
          {value => {
            expect(value.response).toBe(emittedResponse);
            expect(value.router).toBe(router);
            expect(value.navigation).toBe(emittedNavigation);
            done();
            return null;
          }}
        </Curious>
      );

      router.respond(
        ({ response, navigation }) => {
          emittedResponse = response;
          emittedNavigation = navigation;
          const wrapper = mount(
            <CuriProvider router={router} render={() => <ContextLogger />} />
          );
        },
        { once: true }
      );
    });
  });
});
