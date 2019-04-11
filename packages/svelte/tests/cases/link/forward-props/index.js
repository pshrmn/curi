import { inMemory } from "@hickory/in-memory";
import { createRouter, prepareRoutes } from "@curi/router";
import { curiStore } from "@curi/svelte";

import app from "./app.html";

const routes = prepareRoutes([
  { name: "Home", path: "" },
  { name: "User", path: "u/:id" },
  { name: "Not Found", path: "(.*)" }
]);

const router = createRouter(inMemory, routes);
const store = curiStore(router);

export default function render() {
  const target = document.createElement("div");
  new app({ target, store });

  const a = target.querySelector("a");
  expect(a.classList.contains("test")).toBe(true);
  expect(a.getAttribute("target")).toBe("_blank");
}
