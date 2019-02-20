import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { curi, prepareRoutes } from "@curi/router";
import { InMemory } from "@hickory/in-memory";

import wait from "./utils/wait";

// @ts-ignore (resolved by jest)
import { curiProvider, useCuri } from "@curi/react-universal";

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
    it("renders children", () => {
      const history = InMemory();
      const routes = prepareRoutes([{ name: "Catch All", path: "(.*)" }]);
      const router = curi(history, routes);

      const App = jest.fn(() => {
        return null;
      });
      const Router = curiProvider(router);
      ReactDOM.render(
        <Router>
          <App />
        </Router>,
        node
      );
      expect(App.mock.calls.length).toBe(1);
    });

    it("works with multiple children", () => {
      const history = InMemory();
      const routes = prepareRoutes([{ name: "Catch All", path: "(.*)" }]);
      const router = curi(history, routes);

      const One = jest.fn(() => {
        return null;
      });
      const Two = jest.fn(() => {
        return null;
      });
      const Router = curiProvider(router);
      ReactDOM.render(
        <Router>
          <One />
          <Two />
        </Router>,
        node
      );
      expect(One.mock.calls.length).toBe(1);
      expect(Two.mock.calls.length).toBe(1);
    });

    it("re-renders when the location changes", async () => {
      const history = InMemory();
      const router = curi(history, routes);
      let pushedHistory = false;
      let firstCall = true;

      let currentResponse;

      const App = jest.fn(() => {
        const { response, router } = useCuri();
        currentResponse = response;
        return null;
      });

      const Router = curiProvider(router);
      ReactDOM.render(
        <Router>
          <App />
        </Router>,
        node
      );

      expect(currentResponse.name).toBe("Home");

      await wait(15);

      history.navigate("/about");

      expect(currentResponse.name).toBe("About");
    });
  });

  describe("context", () => {
    it("makes response, navigation, and router available on content", () => {
      const history = InMemory();
      const router = curi(history, routes);

      const ContextLogger: React.ComponentType = () => {
        const {
          router: ctxRouter,
          response: ctxResponse,
          navigation: ctxNavigation
        } = useCuri();
        expect(ctxResponse).toBe(emittedResponse);
        expect(ctxRouter).toBe(router);
        expect(ctxNavigation).toBe(emittedNavigation);
        return null;
      };

      const Router = curiProvider(router);

      const {
        response: emittedResponse,
        navigation: emittedNavigation
      } = router.current();
      ReactDOM.render(
        <Router>
          <ContextLogger />
        </Router>,
        node
      );
    });
  });
});
