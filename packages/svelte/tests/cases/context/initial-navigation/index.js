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

  let { navigation } = router.current();

  new app.default({
    target,
    props: {
      router,
      check(value) {
        expect(value).toBe(navigation);
      }
    }
  });
}
