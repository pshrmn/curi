import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { InMemory } from "@hickory/in-memory";
import { curi, prepareRoutes } from "@curi/router";

import wait from "./utils/wait";

// @ts-ignore (resolved by jest)
import { curiProvider, useNavigating } from "@curi/react-universal";

describe("useNavigating", () => {
  let node;
  const routes = prepareRoutes([
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
      const router = curi(InMemory, routes);
      const Router = curiProvider(router);

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
        const router = curi(InMemory, routes);
        const Router = curiProvider(router);

        const children = jest.fn(() => null);
        function Nav() {
          const result = useNavigating();
          return children(result);
        }
        ReactDOM.render(
          <Router>
            <Nav />
          </Router>,
          node
        );

        const { response: beforeResponse } = router.current();
        expect(beforeResponse.name).toBe("Home");

        expect(children.mock.calls.length).toBe(1);

        await wait(15);

        router.navigate({ name: "Sync" });

        expect(children.mock.calls.length).toBe(2);
        const { response: afterResponse } = router.current();
        expect(afterResponse.name).toBe("Sync");
      });
    });

    describe("to asynchronous routes", () => {
      it("cancel is a function", async () => {
        const router = curi(InMemory, routes);
        const Router = curiProvider(router);

        const children = jest.fn(() => null);
        function Nav() {
          const result = useNavigating();
          return children(result);
        }
        ReactDOM.render(
          <Router>
            <Nav />
          </Router>,
          node
        );

        const { response: beforeResponse } = router.current();
        expect(beforeResponse.name).toBe("Home");

        await wait(15);

        router.navigate({ name: "Fast" });
        expect(typeof children.mock.calls[1][0]).toBe("function");
      });

      it("is undefined once navigation finishes", async done => {
        const router = curi(InMemory, routes);
        const Router = curiProvider(router);
        const children = jest.fn(() => null);
        function Nav() {
          const result = useNavigating();
          return children(result);
        }
        ReactDOM.render(
          <Router>
            <Nav />
          </Router>,
          node
        );

        const { response: beforeResponse } = router.current();
        expect(beforeResponse.name).toBe("Home");

        await wait(15);

        router.navigate({ name: "Fast" });

        router.once(
          ({ response }) => {
            expect(response.name).toBe("Fast");
            expect(children.mock.calls[2][0]).toBeUndefined();
            done();
          },
          { initial: false }
        );
      });
    });
  });

  describe("calling the cancel function", () => {
    it("cancels the navigation", async done => {
      const router = curi(InMemory, routes);
      const Router = curiProvider(router);
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
      ReactDOM.render(
        <Router>
          <Nav />
        </Router>,
        node
      );

      const { response: beforeResponse } = router.current();
      expect(beforeResponse.name).toBe("Home");
      expect(children.mock.calls[0][0]).toBeUndefined();

      await wait(15);

      router.navigate({ name: "Slow" });

      expect(children.mock.calls[1][0]).toBeDefined();

      cancelFn();
      setTimeout(() => {
        expect(children.mock.calls[2][0]).toBeUndefined();
        done();
      }, 25);
    });

    it("does nothing if calling function after navigation finishes", async done => {
      const router = curi(InMemory, routes);
      const Router = curiProvider(router);
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
      ReactDOM.render(
        <Router>
          <Nav />
        </Router>,
        node
      );
      const { response: beforeResponse } = router.current();
      expect(beforeResponse.name).toBe("Home");

      await wait(15);

      router.navigate({ name: "Fast" });
      router.once(
        ({ response }) => {
          expect(response.name).toBe("Fast");
          const childrenCalls = children.mock.calls.length;

          cancelFn();

          setTimeout(() => {
            // children is not called against after cancelling
            expect(children.mock.calls.length).toBe(childrenCalls);
            done();
          }, 25);
        },
        { initial: false }
      );
    });
  });
});
