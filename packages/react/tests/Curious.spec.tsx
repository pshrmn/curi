import "jest";
import React from "react";
import { shallow, mount } from "enzyme";
import Curious from "../src/Curious";

describe("<Curious>", () => {
  describe("render props", () => {
    it("passes router", () => {
      const fakeRouter = { history: {} };
      const fakeResponse = { name: "Home", status: 200 };
      const TestComponent = () => (
        <Curious
          render={({ router }) => {
            expect(router).toBe(fakeRouter);
            return null;
          }}
        />
      );

      const wrapper = shallow(<TestComponent />, {
        context: { curi: { router: fakeRouter, response: fakeResponse } }
      });
    });

    it("passes response", () => {
      const fakeRouter = { history: {} };
      const fakeResponse = { name: "Home", status: 200 };
      const TestComponent = () => (
        <Curious
          render={({ response }) => {
            expect(response).toBe(fakeResponse);
            return null;
          }}
        />
      );

      const wrapper = shallow(<TestComponent />, {
        context: { curi: { router: fakeRouter, response: fakeResponse } }
      });
    });

    it("passes action", () => {
      const fakeRouter = { history: {} };
      const fakeResponse = { name: "Home", status: 200 };
      const fakeAction = "POP";
      const TestComponent = () => (
        <Curious
          render={({ action }) => {
            expect(action).toBe(fakeAction);
            return null;
          }}
        />
      );

      const wrapper = shallow(<TestComponent />, {
        context: {
          curi: {
            router: fakeRouter,
            response: fakeResponse,
            action: fakeAction
          }
        }
      });
    });
  });
});
