import { InMemory } from "@hickory/in-memory";
import { create_router, prepare_routes } from "@curi/router";
import { curi_store } from "@curi/svelte";

import app from "./app.html";

const routes = prepare_routes([
  { name: "Home", path: "" },
  { name: "User", path: "u/:id" },
  { name: "Not Found", path: "(.*)" }
]);

const router = create_router(InMemory, routes, {
  history: {
    locations: ["/u/2"]
  }
});
const store = curi_store(router);

export default function render() {
  const target = document.createElement("div");
  new app({ target, store });
  const a = target.querySelector("a");
  expect(a.getAttribute("href")).toBe("#is-a-band");
}
