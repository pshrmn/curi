import InMemory from "@hickory/in-memory";
import { curi, prepareRoutes } from "@curi/router";
import { curiStore } from "@curi/svelte";
import simulant from "simulant";

import app from "./app.html";

const routes = prepareRoutes([
  { name: "Home", path: "" },
  { name: "User", path: "u/:id" },
  { name: "Not Found", path: "(.*)" }
]);

const history = InMemory();
const router = curi(history, routes);
const store = curiStore(router);

export default function render() {
  const target = document.createElement("div");
  history.navigate = jest.fn();
  new app({ target, store });

  const a = target.querySelector("a");

  const modifiers = ["metaKey", "altKey", "ctrlKey", "shiftKey"];
  modifiers.forEach(m => {
    simulant.fire(a, "click", { [m]: true });
    expect(history.navigate.mock.calls.length).toBe(0);
  });
}
