import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { createRouter, prepareRoutes } from "@curi/router";
import { inMemory } from "@hickory/in-memory";

import {
  createRouterComponent,
  useRouter,
  useResponse
} from "@curi/react-universal";

describe("createRouterComponent()", () => {
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

  describe("suspend argument", () => {});

  describe("children prop", () => {
    it("renders children", () => {
      const routes = prepareRoutes([{ name: "Catch All", path: "(.*)" }]);
      const router = createRouter(inMemory, routes);

      const App = jest.fn(() => {
        return null;
      });
      const Router = createRouterComponent(router);
      ReactDOM.render(
        <Router>
          <App />
        </Router>,
        node
      );
      expect(App.mock.calls.length).toBe(1);
    });

    it("works with multiple children", () => {
      const routes = prepareRoutes([{ name: "Catch All", path: "(.*)" }]);
      const router = createRouter(inMemory, routes);

      const One = jest.fn(() => {
        return null;
      });
      const Two = jest.fn(() => {
        return null;
      });
      const Router = createRouterComponent(router);
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
      const router = createRouter(inMemory, routes);

      let currentResponse;

      const App = jest.fn(() => {
        const { response } = useResponse();
        currentResponse = response;
        return null;
      });

      const Router = createRouterComponent(router);

      act(() => {
        ReactDOM.render(
          <Router>
            <App />
          </Router>,
          node
        );
      });

      expect(currentResponse.name).toBe("Home");

      act(() => {
        const url = router.url({ name: "About" });
        router.navigate({ url });
      });

      expect(currentResponse.name).toBe("About");
    });
  });

  describe("context", () => {
    it("makes response, navigation, and router available on context", () => {
      const router = createRouter(inMemory, routes);

      const ContextLogger: React.ComponentType = () => {
        const {
          response: ctxResponse,
          navigation: ctxNavigation
        } = useResponse();
        const ctxRouter = useRouter();
        expect(ctxResponse).toBe(emittedResponse);
        expect(ctxRouter).toBe(router);
        expect(ctxNavigation).toBe(emittedNavigation);
        return null;
      };

      const Router = createRouterComponent(router);

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
