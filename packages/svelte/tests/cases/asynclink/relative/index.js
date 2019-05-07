import { inMemory } from "@hickory/in-memory";
import { createRouter, prepareRoutes } from "@curi/router";

import app from "./app.svelte";

const routes = prepareRoutes([
  { name: "Home", path: "" },
  { name: "User", path: "u/:id" },
  { name: "Not Found", path: "(.*)" }
]);

const router = createRouter(inMemory, routes, {
  history: {
    locations: [{ url: "/u/2" }]
  }
});

export default function render() {
  const target = document.createElement("div");
  new app.default({ target, props: { router } });
  const a = target.querySelector("a");
  expect(a.getAttribute("href")).toBe("#is-a-band");
}
