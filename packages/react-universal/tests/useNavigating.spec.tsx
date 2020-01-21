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
  let routes = prepareRoutes([
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
  ]);

  beforeEach(() => {
    node = document.createElement("div");
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  describe("mount", () => {
    it("cancel is undefined", () => {
      let router = createRouter(inMemory, routes);
      let Router = createRouterComponent(router);

      function Nav() {
        let result = useNavigating();
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
        let router = createRouter(inMemory, routes);
        let Router = createRouterComponent(router);

        let children = jest.fn((arg: any) => null);
        function Nav() {
          let result = useNavigating();
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

        let { response: beforeResponse } = router.current();
        expect(beforeResponse.name).toBe("Home");

        expect(children.mock.calls.length).toBe(1);

        act(() => {
          let url = router.url({ name: "Sync" });
          router.navigate({ url });
        });

        expect(children.mock.calls.length).toBe(1);
        let { response: afterResponse } = router.current();
        expect(afterResponse.name).toBe("Sync");
      });
    });

    describe("to asynchronous routes", () => {
      it("cancel is a function", async () => {
        let router = createRouter(inMemory, routes);
        let Router = createRouterComponent(router);

        let children = jest.fn((arg: any) => null);
        function Nav() {
          let result = useNavigating();
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

        let { response: beforeResponse } = router.current();
        expect(beforeResponse.name).toBe("Home");

        act(() => {
          let url = router.url({ name: "Fast" });
          router.navigate({ url });
        });

        expect(typeof children.mock.calls[1][0]).toBe("function");
      });

      it("is undefined once navigation finishes", async () => {
        let router = createRouter(inMemory, routes);
        let Router = createRouterComponent(router);
        let children = jest.fn((arg: any) => null);
        function Nav() {
          let result = useNavigating();
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

        let { response: beforeResponse } = router.current();
        expect(beforeResponse.name).toBe("Home");

        await act(async () => {
          let url = router.url({ name: "Fast" });
          router.navigate({ url });
          await sleep(100);
        });

        let { response: afterResponse } = router.current();
        expect(afterResponse.name).toBe("Fast");
        expect(children.mock.calls[2][0]).toBeUndefined();
      });
    });
  });

  describe("calling the cancel function", () => {
    it("cancels the navigation, which triggers a call of the children function", async () => {
      let router = createRouter(inMemory, routes);
      let Router = createRouterComponent(router);
      let cancelFn;
      let children = jest.fn(cancel => {
        if (cancel === undefined) {
          return null;
        }
        cancelFn = cancel;
        return null;
      });

      function Nav() {
        let result = useNavigating();
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

      let { response: beforeResponse } = router.current();
      expect(beforeResponse.name).toBe("Home");
      expect(children.mock.calls[0][0]).toBeUndefined();

      act(() => {
        let url = router.url({ name: "Slow" });
        router.navigate({ url });
      });

      expect(children.mock.calls[1][0]).toBeDefined();

      await act(async () => {
        cancelFn();
      });

      expect(children.mock.calls[2][0]).toBeUndefined();
    });

    it("does nothing if calling function after navigation finishes", async () => {
      let router = createRouter(inMemory, routes);
      let Router = createRouterComponent(router);
      let cancelFn;
      let children = jest.fn(cancel => {
        if (cancel === undefined) {
          return null;
        }
        cancelFn = cancel;
        return null;
      });
      function Nav() {
        let result = useNavigating();
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

      let { response: beforeResponse } = router.current();
      expect(beforeResponse.name).toBe("Home");

      await act(async () => {
        let url = router.url({ name: "Fast" });
        router.navigate({ url });
        // sleep while we wait for the Fast route to render
        await sleep(100);
      });

      let { response: afterResponse } = router.current();

      expect(afterResponse.name).toBe("Fast");
      let childrenCalls = children.mock.calls.length;

      await act(async () => {
        cancelFn();
      });

      // children is not called against after cancelling
      expect(children.mock.calls.length).toBe(childrenCalls);
    });
  });
});
