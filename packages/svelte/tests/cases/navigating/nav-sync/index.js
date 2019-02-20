import { InMemory } from "@hickory/in-memory";
import { curi, prepareRoutes } from "@curi/router";
import { curiStore } from "@curi/svelte";

import app from "./app.html";

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
        setTimeout(resolve, 50, "slow");
      });
    }
  },
  { name: "Catch All", path: "(.*)" }
]);

const history = InMemory();
const router = curi(history, routes);
const store = curiStore(router);

export default function render() {
  const target = document.createElement("div");
  new app({ target, store });

  const button = target.querySelector("button");

  const { response: beforeResponse } = router.current();
  expect(beforeResponse.name).toBe("Home");

  expect(button.textContent).toBe("No op");

  router.navigate({ name: "Sync" });

  expect(button.textContent).toBe("No op");

  const { response: afterResponse } = router.current();
  expect(afterResponse.name).toBe("Sync");
}
