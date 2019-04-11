import { inMemory } from "@hickory/in-memory";
import { createRouter, prepareRoutes } from "@curi/router";
import { curiStore } from "@curi/svelte";
import simulant from "simulant";

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
  const mockNavigate = jest.fn();
  router.history.navigate = mockNavigate;
  new app({ target, store });

  const a = target.querySelector("a");
  const event = simulant("click");
  simulant.fire(a, event);
  expect(mockNavigate.mock.calls.length).toBe(1);
}
