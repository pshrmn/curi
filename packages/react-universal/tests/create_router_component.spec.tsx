import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { create_router, prepare_routes } from "@curi/router";
import { InMemory } from "@hickory/in-memory";

import wait from "./utils/wait";

import { create_router_component, useCuri } from "@curi/react-universal";

describe("create_router_component()", () => {
  let node;
  const routes = prepare_routes([
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
      const routes = prepare_routes([{ name: "Catch All", path: "(.*)" }]);
      const router = create_router(InMemory, routes);

      const App = jest.fn(() => {
        return null;
      });
      const Router = create_router_component(router);
      ReactDOM.render(
        <Router>
          <App />
        </Router>,
        node
      );
      expect(App.mock.calls.length).toBe(1);
    });

    it("works with multiple children", () => {
      const routes = prepare_routes([{ name: "Catch All", path: "(.*)" }]);
      const router = create_router(InMemory, routes);

      const One = jest.fn(() => {
        return null;
      });
      const Two = jest.fn(() => {
        return null;
      });
      const Router = create_router_component(router);
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
      const router = create_router(InMemory, routes);

      let currentResponse;

      const App = jest.fn(() => {
        const { response, router } = useCuri();
        currentResponse = response;
        return null;
      });

      const Router = create_router_component(router);
      ReactDOM.render(
        <Router>
          <App />
        </Router>,
        node
      );

      expect(currentResponse.name).toBe("Home");

      await wait(15);

      router.navigate({ name: "About" });

      expect(currentResponse.name).toBe("About");
    });
  });

  describe("context", () => {
    it("makes response, navigation, and router available on content", () => {
      const router = create_router(InMemory, routes);

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

      const Router = create_router_component(router);

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
