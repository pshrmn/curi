import { inMemory } from "@hickory/in-memory";
import { createRouter, prepareRoutes } from "@curi/router";

import app from "./app.svelte";
import cleanText from "../../../utils/cleanText";

const routes = prepareRoutes({
  routes: [
    { name: "Home", path: "" },
    { name: "User", path: "u/:id" },
    { name: "Not Found", path: "(.*)" }
  ]
});

const router = createRouter(inMemory, routes);

export default function render() {
  const target = document.createElement("div");
  new app.default({ target, props: { router } });

  const a = target.querySelector("a");
  expect(cleanText(a.textContent)).toBe("false Home");
}
