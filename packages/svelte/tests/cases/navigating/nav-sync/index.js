import { inMemory } from "@hickory/in-memory";
import { createRouter, prepareRoutes } from "@curi/router";

import app from "./app.svelte";

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
        setTimeout(resolve, 50, "slow");
      });
    }
  },
  { name: "Catch All", path: "(.*)" }
]);

let router = createRouter(inMemory, routes);

export default function render() {
  let target = document.createElement("div");
  new app.default({ target, props: { router } });

  let button = target.querySelector("button");

  let { response: beforeResponse } = router.current();
  expect(beforeResponse.name).toBe("Home");

  expect(button.textContent).toBe("No op");

  let url = router.url({ name: "Sync" });
  router.navigate({ url });

  expect(button.textContent).toBe("No op");

  let { response: afterResponse } = router.current();
  expect(afterResponse.name).toBe("Sync");
}
