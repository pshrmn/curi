import "jest";
import React from "react";
import { shallow, mount } from "enzyme";
import PropTypes from "prop-types";
import curi from "@curi/core";
import InMemory from "@hickory/in-memory";
import ResponsiveBase from "../src/ResponsiveBase";
import { Response, Navigation } from "@curi/core";

describe("<ResponsiveBase>", () => {
  const routes = [{ name: "Home", path: "" }, { name: "About", path: "about" }];

  describe("render", () => {
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
        response => {
          const wrapper = mount(<ResponsiveBase router={router} render={fn} />);
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
        (response, navigation) => {
          const wrapper = mount(<ResponsiveBase router={router} render={fn} />);
        },
        { once: true }
      );
    });
  });

  describe("context", () => {
    it("sets response, navigation, and router on context.curi", done => {
      let emittedResponse;
      let emittedNavigation;
      const history = InMemory();
      const router = curi(history, routes);

      const ContextLogger: React.ComponentType = (props, context) => {
        expect(context.curi.response).toBe(emittedResponse);
        expect(context.curi.router).toBe(router);
        expect(context.curi.navigation).toBe(emittedNavigation);
        done();
        return null;
      };
      ContextLogger.contextTypes = {
        curi: PropTypes.object
      };

      router.respond(
        (response, navigation) => {
          emittedResponse = response;
          emittedNavigation = navigation;
          const wrapper = mount(
            <ResponsiveBase router={router} render={() => <ContextLogger />} />
          );
        },
        { once: true }
      );
    });
  });
});
