import { inMemory } from "@hickory/in-memory";
import { createRouter, prepareRoutes } from "@curi/router";

import app from "./app.svelte";

let routes = prepareRoutes([
  { name: "Home", path: "" },
  { name: "User", path: "u/:id" },
  { name: "Not Found", path: "(.*)" }
]);

let router = createRouter(inMemory, routes);

export default function render() {
  let target = document.createElement("div");
  new app.default({ target, props: { router } });

  let a = target.querySelector("a");
  expect(a.classList.contains("test")).toBe(true);
  expect(a.getAttribute("target")).toBe("_blank");
}
