import { InMemory } from "@hickory/in-memory";
import { curi, prepare_routes } from "@curi/router";
import { curi_store } from "@curi/svelte";
import simulant from "simulant";

import app from "./app.html";

const routes = prepare_routes([
  { name: "Home", path: "" },
  { name: "User", path: "u/:id" },
  { name: "Not Found", path: "(.*)" }
]);

const router = curi(InMemory, routes);
const store = curi_store(router);

export default function render() {
  const target = document.createElement("div");
  const mockNavigate = jest.fn();
  router.history.navigate = mockNavigate;
  new app({ target, store });

  const a = target.querySelector("a");
  const event = simulant("click");
  event.preventDefault();
  simulant.fire(a, event);
  expect(mockNavigate.mock.calls.length).toBe(0);
}
