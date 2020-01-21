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
  expect(button.textContent).toBe("No op");
}
