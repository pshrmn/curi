import { inMemory } from "@hickory/in-memory";
import { createRouter, prepareRoutes } from "@curi/router";
import simulant from "simulant";

import app from "./app.svelte";

let routes = prepareRoutes([
  { name: "Home", path: "" },
  { name: "User", path: "u/:id" },
  { name: "Not Found", path: "(.*)" }
]);

let router = createRouter(inMemory, routes);

export default function render() {
  let target = document.createElement("div");
  let mockNavigate = jest.fn();
  router.history.navigate = mockNavigate;
  new app.default({ target, props: { router } });

  let a = target.querySelector("a");
  let event = simulant("click");
  simulant.fire(a, event);
  expect(mockNavigate.mock.calls.length).toBe(1);
}
