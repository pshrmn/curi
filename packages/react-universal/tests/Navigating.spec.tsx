import "jest";
import React from "react";
import ReactDOM from "react-dom";
import InMemory from "@hickory/in-memory";
import { curi } from "@curi/router";

// resolved by jest
import { curiProvider, Navigating } from "@curi/react-universal";

describe("<Navigating>", () => {
  let node;
  const routes = [
    { name: "Home", path: "" },
    { name: "Sync", path: "sync" },
    {
      name: "Slow",
      path: "slow",
      resolve: {
        data() {
          return new Promise(resolve => {
            setTimeout(resolve, 1000, "slow");
          });
        }
      }
    },
    {
      name: "Fast",
      path: "fast",
      resolve: {
        data() {
          return new Promise(resolve => {
            setTimeout(resolve, 50, "slow");
          });
        }
      }
    },
    { name: "Catch All", path: "(.*)" }
  ];

  beforeEach(() => {
    node = document.createElement("div");
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  describe("mount", () => {
    it("cancel is undefined", () => {
      const history = InMemory();
      const router = curi(history, routes);
      const Router = curiProvider(router);
      ReactDOM.render(
        <Router>
          {() => (
            <Navigating>
              {cancel => {
                expect(cancel).toBeUndefined();
                return null;
              }}
            </Navigating>
          )}
        </Router>,
        node
      );
    });
  });

  describe("while navigating", () => {
    describe("to synchronous routes", () => {
      it("cancel is undefined", () => {
        const history = InMemory();
        const router = curi(history, routes);
        const Router = curiProvider(router);
        const children = jest.fn(() => null);
        ReactDOM.render(
          <Router>{() => <Navigating>{children}</Navigating>}</Router>,
          node
        );
        const { response: beforeResponse } = router.current();
        expect(beforeResponse.name).toBe("Home");

        expect(children.mock.calls.length).toBe(1);

        router.navigate({ name: "Sync" });

        expect(children.mock.calls.length).toBe(2);
        const { response: afterResponse } = router.current();
        expect(afterResponse.name).toBe("Sync");
      });
    });

    describe("to asynchronous routes", () => {
      it("cancel is a function", done => {
        const history = InMemory();
        const router = curi(history, routes);
        const Router = curiProvider(router);
        const children = jest.fn(() => null);
        ReactDOM.render(
          <Router>{() => <Navigating>{children}</Navigating>}</Router>,
          node
        );
        const { response: beforeResponse } = router.current();
        expect(beforeResponse.name).toBe("Home");

        router.navigate({ name: "Fast" });

        expect(typeof children.mock.calls[1][0]).toBe("function");
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
    it("cancels the navigation", done => {
      const history = InMemory();
      const router = curi(history, routes);
      const Router = curiProvider(router);
      let cancelFn;
      const children = jest.fn(cancel => {
        if (cancel === undefined) {
          return null;
        }
        cancelFn = cancel;
        return null;
      });
      ReactDOM.render(
        <Router>{() => <Navigating>{children}</Navigating>}</Router>,
        node
      );
      const { response: beforeResponse } = router.current();
      expect(beforeResponse.name).toBe("Home");
      expect(children.mock.calls[0][0]).toBeUndefined();

      router.navigate({ name: "Slow" });

      expect(children.mock.calls[1][0]).toBeDefined();

      cancelFn();
      setTimeout(() => {
        expect(children.mock.calls[2][0]).toBeUndefined();
        done();
      }, 25);
    });

    it("does nothing if calling function after navigation finishes", done => {
      const history = InMemory();
      const router = curi(history, routes);
      const Router = curiProvider(router);
      let cancelFn;
      const children = jest.fn(cancel => {
        if (cancel === undefined) {
          return null;
        }
        cancelFn = cancel;
        return null;
      });
      ReactDOM.render(
        <Router>{() => <Navigating>{children}</Navigating>}</Router>,
        node
      );
      const { response: beforeResponse } = router.current();
      expect(beforeResponse.name).toBe("Home");

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
