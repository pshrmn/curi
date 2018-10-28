import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { curi, prepareRoutes } from "@curi/router";
import InMemory from "@hickory/in-memory";

// @ts-ignore (resolved by jest)
import { curiProvider, Curious } from "@curi/react-universal";

describe("curiProvider()", () => {
  let node;
  const routes = prepareRoutes([
    { name: "Home", path: "" },
    { name: "About", path: "about" },
    { name: "Catch All", path: "(.*)" }
  ]);

  beforeEach(() => {
    node = document.createElement("div");
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  describe("router argument", () => {});

  describe("children prop", () => {
    it("calls children() function when it renders", () => {
      const history = InMemory();
      const routes = prepareRoutes([{ name: "Catch All", path: "(.*)" }]);
      const router = curi(history, routes);

      const fn = jest.fn(() => {
        return null;
      });
      const Router = curiProvider(router);
      ReactDOM.render(<Router>{fn}</Router>, node);
      expect(fn.mock.calls.length).toBe(1);
    });

    it("re-renders when the location changes", done => {
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

      const Router = curiProvider(router);
      ReactDOM.render(<Router>{fn}</Router>, node);
      history.navigate("/about");
    });

    it("passes { response, navigation, router } to children()  prop", () => {
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
      const Router = curiProvider(router);
      ReactDOM.render(<Router>{fn}</Router>, node);
    });
  });

  describe("context", () => {
    it("makes response, navigation, and router available to <Curious>", () => {
      const history = InMemory();
      const router = curi(history, routes);

      const ContextLogger: React.ComponentType = () => (
        <Curious>
          {value => {
            expect(value.response).toBe(emittedResponse);
            expect(value.router).toBe(router);
            expect(value.navigation).toBe(emittedNavigation);
            return null;
          }}
        </Curious>
      );

      const Router = curiProvider(router);

      const {
        response: emittedResponse,
        navigation: emittedNavigation
      } = router.current();
      ReactDOM.render(<Router>{() => <ContextLogger />}</Router>, node);
    });
  });
});
