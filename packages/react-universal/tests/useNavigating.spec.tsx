import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { inMemory } from "@hickory/in-memory";
import { createRouter, prepareRoutes } from "@curi/router";

import { sleep } from "../../../utils/tests";

import { createRouterComponent, useNavigating } from "@curi/react-universal";

describe("useNavigating", () => {
  let node;
  const routes = prepareRoutes({
    routes: [
      { name: "Home", path: "" },
      { name: "Sync", path: "sync" },
      {
        name: "Slow",
        path: "slow",
        resolve() {
          return new Promise(resolve => {
            setTimeout(resolve, 1000, "slow");
          });
        }
      },
      {
        name: "Fast",
        path: "fast",
        resolve() {
          return new Promise(resolve => {
            setTimeout(resolve, 50, "fast");
          });
        }
      },
      { name: "Catch All", path: "(.*)" }
    ]
  });

  beforeEach(() => {
    node = document.createElement("div");
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  describe("mount", () => {
    it("cancel is undefined", () => {
      const router = createRouter(inMemory, routes);
      const Router = createRouterComponent(router);

      function Nav() {
        const result = useNavigating();
        expect(result).toBeUndefined();
        return null;
      }
      ReactDOM.render(
        <Router>
          <Nav />
        </Router>,
        node
      );
    });
  });

  describe("while navigating", () => {
    describe("to synchronous routes", () => {
      it("cancel is undefined", async () => {
        const router = createRouter(inMemory, routes);
        const Router = createRouterComponent(router);

        const children = jest.fn((arg: any) => null);
        function Nav() {
          const result = useNavigating();
          return children(result);
        }

        act(() => {
          ReactDOM.render(
            <Router>
              <Nav />
            </Router>,
            node
          );
        });

        const { response: beforeResponse } = router.current();
        expect(beforeResponse.name).toBe("Home");

        expect(children.mock.calls.length).toBe(1);

        act(() => {
          router.navigate({ name: "Sync" });
        });

        expect(children.mock.calls.length).toBe(1);
        const { response: afterResponse } = router.current();
        expect(afterResponse.name).toBe("Sync");
      });
    });

    describe("to asynchronous routes", () => {
      it("cancel is a function", async () => {
        const router = createRouter(inMemory, routes);
        const Router = createRouterComponent(router);

        const children = jest.fn((arg: any) => null);
        function Nav() {
          const result = useNavigating();
          return children(result);
        }

        act(() => {
          ReactDOM.render(
            <Router>
              <Nav />
            </Router>,
            node
          );
        });

        const { response: beforeResponse } = router.current();
        expect(beforeResponse.name).toBe("Home");

        act(() => {
          router.navigate({ name: "Fast" });
        });

        expect(typeof children.mock.calls[1][0]).toBe("function");
      });

      it("is undefined once navigation finishes", async () => {
        const router = createRouter(inMemory, routes);
        const Router = createRouterComponent(router);
        const children = jest.fn((arg: any) => null);
        function Nav() {
          const result = useNavigating();
          return children(result);
        }

        await act(async () => {
          ReactDOM.render(
            <Router>
              <Nav />
            </Router>,
            node
          );
        });

        const { response: beforeResponse } = router.current();
        expect(beforeResponse.name).toBe("Home");

        await act(async () => {
          router.navigate({ name: "Fast" });
          await sleep(100);
        });

        const { response: afterResponse } = router.current();
        expect(afterResponse.name).toBe("Fast");
        expect(children.mock.calls[2][0]).toBeUndefined();
      });
    });
  });

  describe("calling the cancel function", () => {
    it("cancels the navigation, which triggers a call of the children function", async () => {
      const router = createRouter(inMemory, routes);
      const Router = createRouterComponent(router);
      let cancelFn;
      const children = jest.fn(cancel => {
        if (cancel === undefined) {
          return null;
        }
        cancelFn = cancel;
        return null;
      });

      function Nav() {
        const result = useNavigating();
        return children(result);
      }

      act(() => {
        ReactDOM.render(
          <Router>
            <Nav />
          </Router>,
          node
        );
      });

      const { response: beforeResponse } = router.current();
      expect(beforeResponse.name).toBe("Home");
      expect(children.mock.calls[0][0]).toBeUndefined();

      act(() => {
        router.navigate({ name: "Slow" });
      });

      expect(children.mock.calls[1][0]).toBeDefined();

      await act(async () => {
        cancelFn();
      });

      expect(children.mock.calls[2][0]).toBeUndefined();
    });

    it("does nothing if calling function after navigation finishes", async () => {
      const router = createRouter(inMemory, routes);
      const Router = createRouterComponent(router);
      let cancelFn;
      const children = jest.fn(cancel => {
        if (cancel === undefined) {
          return null;
        }
        cancelFn = cancel;
        return null;
      });
      function Nav() {
        const result = useNavigating();
        return children(result);
      }

      act(() => {
        ReactDOM.render(
          <Router>
            <Nav />
          </Router>,
          node
        );
      });

      const { response: beforeResponse } = router.current();
      expect(beforeResponse.name).toBe("Home");

      await act(async () => {
        router.navigate({ name: "Fast" });
        // sleep while we wait for the Fast route to render
        await sleep(100);
      });

      const { response: afterResponse } = router.current();

      expect(afterResponse.name).toBe("Fast");
      const childrenCalls = children.mock.calls.length;

      await act(async () => {
        cancelFn();
      });

      // children is not called against after cancelling
      expect(children.mock.calls.length).toBe(childrenCalls);
    });
  });
});
