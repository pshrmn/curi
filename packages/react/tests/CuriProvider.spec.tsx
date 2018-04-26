import "jest";
import React from "react";
import ReactDOM from "react-dom";
import curi from "@curi/core";
import InMemory from "@hickory/in-memory";

import CuriProvider from "../src/CuriProvider";
import { Curious } from "../src/Context";

import { Response, Navigation } from "@curi/core";

describe("<CuriProvider>", () => {
  let node;
  const routes = [{ name: "Home", path: "" }, { name: "About", path: "about" }];

  beforeEach(() => {
    node = document.createElement("div");
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  describe("render", () => {
    it("calls render function when it renders", () => {
      const history = InMemory();
      const router = curi(history, [{ name: "Catch All", path: "(.*)" }]);

      const fn = jest.fn(() => {
        return null;
      });
      ReactDOM.render(<CuriProvider router={router}>{fn}</CuriProvider>, node);
      expect(fn.mock.calls.length).toBe(1);
    });

    it("re-calls render prop when the location changes", done => {
      const history = InMemory();
      const router = curi(history, routes);
      let pushedHistory = false;
      let firstCall = true;
      const fn = jest.fn(({ response }) => {
        if (firstCall) {
          expect(response.name).toBe("Home");
          firstCall = false;
        } else {
          expect(response.name).toBe("About");
          done();
        }
        return null;
      });

      ReactDOM.render(<CuriProvider router={router}>{fn}</CuriProvider>, node);
      history.navigate("/about");
    });

    it("passes { response, navigation, router } to render prop", () => {
      const history = InMemory();
      const fn = jest.fn(({ response, navigation, router: routerProp }) => {
        expect(response).toMatchObject({
          name: "Home"
        });
        expect(navigation).toMatchObject({
          action: "PUSH"
        });
        expect(routerProp).toBe(router);
        return null;
      });

      const router = curi(history, routes);
      ReactDOM.render(<CuriProvider router={router}>{fn}</CuriProvider>, node);
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

      router.respond(({ response, navigation }) => {
        emittedResponse = response;
        emittedNavigation = navigation;
        ReactDOM.render(
          <CuriProvider router={router}>
            {() => <ContextLogger />}
          </CuriProvider>,
          node
        );
      });
    });
  });
});
