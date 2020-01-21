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
  let routes = prepareRoutes([
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
      let routes = prepareRoutes([{ name: "Catch All", path: "(.*)" }]);
      let router = createRouter(inMemory, routes);

      let App = jest.fn(() => {
        return null;
      });
      let Router = createRouterComponent(router);
      ReactDOM.render(
        <Router>
          <App />
        </Router>,
        node
      );
      expect(App.mock.calls.length).toBe(1);
    });

    it("works with multiple children", () => {
      let routes = prepareRoutes([{ name: "Catch All", path: "(.*)" }]);
      let router = createRouter(inMemory, routes);

      let One = jest.fn(() => {
        return null;
      });
      let Two = jest.fn(() => {
        return null;
      });
      let Router = createRouterComponent(router);
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
      let router = createRouter(inMemory, routes);

      let currentResponse;

      let App = jest.fn(() => {
        let { response } = useResponse();
        currentResponse = response;
        return null;
      });

      let Router = createRouterComponent(router);

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
        let url = router.url({ name: "About" });
        router.navigate({ url });
      });

      expect(currentResponse.name).toBe("About");
    });
  });

  describe("context", () => {
    it("makes response, navigation, and router available on context", () => {
      let router = createRouter(inMemory, routes);

      let ContextLogger: React.ComponentType = () => {
        let {
          response: ctxResponse,
          navigation: ctxNavigation
        } = useResponse();
        let ctxRouter = useRouter();
        expect(ctxResponse).toBe(emittedResponse);
        expect(ctxRouter).toBe(router);
        expect(ctxNavigation).toBe(emittedNavigation);
        return null;
      };

      let Router = createRouterComponent(router);

      let {
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
