import InMemory from "@hickory/in-memory";
import { curi, prepareRoutes } from "@curi/router";
import simulant from "simulant";
import { curiStore } from "@curi/svelte";

import Navigating from "../src/Navigating.html";
import Cancel from "./fixtures/Cancel.html";

describe("<Navigating>", () => {
  let node;
  const routes = prepareRoutes([
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
  ]);

  beforeEach(() => {
    node = document.createElement("div");
  });

  afterEach(() => {
    node.innerHTML = "";
  });

  describe("onmount", () => {
    it("cancel is undefined, so renders a comment", () => {
      const history = InMemory();
      const router = curi(history, routes);
      const store = curiStore(router);

      const nav = new Navigating({
        target: node,
        store,
        data: {
          component: Cancel
        }
      });
      const button = node.querySelector("button");
      expect(button.textContent).toBe("No op");
    });
  });

  describe("while navigating", () => {
    describe("to synchronous routes", () => {
      it("cancel is undefined, so renders a comment", () => {
        const history = InMemory();
        const router = curi(history, routes);
        const store = curiStore(router);

        const nav = new Navigating({
          target: node,
          store,
          data: {
            component: Cancel
          }
        });
        const button = node.querySelector("button");

        const { response: beforeResponse } = router.current();
        expect(beforeResponse.name).toBe("Home");

        expect(button.textContent).toBe("No op");

        router.navigate({ name: "Sync" });

        expect(button.textContent).toBe("No op");

        const { response: afterResponse } = router.current();
        expect(afterResponse.name).toBe("Sync");
      });
    });

    describe("to asynchronous routes", () => {
      it("cancel is a function, renders slot", done => {
        const history = InMemory();
        const router = curi(history, routes);
        const store = curiStore(router);

        const nav = new Navigating({
          target: node,
          store,
          data: {
            component: Cancel
          }
        });
        const button = node.querySelector("button");

        const { response: beforeResponse } = router.current();
        expect(beforeResponse.name).toBe("Home");

        expect(button.textContent).toBe("No op");

        router.navigate({ name: "Fast" });

        expect(button.textContent).toBe("Cancel");

        router.once(
          ({ response }) => {
            expect(response.name).toBe("Fast");
            expect(button.textContent).toBe("No op");
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
      const store = curiStore(router);

      const nav = new Navigating({
        target: node,
        store,
        data: {
          component: Cancel
        }
      });
      const button = node.querySelector("button");

      const { response: beforeResponse } = router.current();
      expect(beforeResponse.name).toBe("Home");
      expect(button.textContent).toBe("No op");

      router.navigate({ name: "Slow" });

      expect(button.textContent).toBe("Cancel");
      button.click();

      setTimeout(() => {
        const { response: afterResponse } = router.current();
        expect(beforeResponse.name).toBe("Home");
        expect(button.textContent).toBe("No op");
        done();
      }, 25);
    });
  });
});
