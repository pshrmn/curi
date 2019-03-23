import { InMemory } from "@hickory/in-memory";
import { create_router, prepare_routes } from "@curi/router";
import { curi_store } from "@curi/svelte";

import app from "./app.html";

const routes = prepare_routes([
  { name: "Home", path: "" },
  { name: "Sync", path: "sync" },
  {
    name: "Slow",
    path: "slow",
    resolve() {
      return new Promise(resolve => {
        setTimeout(resolve, 1000, "slow");
      });
    }
  },
  {
    name: "Fast",
    path: "fast",
    resolve() {
      return new Promise(resolve => {
        setTimeout(resolve, 50, "slow");
      });
    }
  },
  { name: "Catch All", path: "(.*)" }
]);

const router = create_router(InMemory, routes);
const store = curi_store(router);

export default function render(done) {
  const target = document.createElement("div");
  new app({ target, store });

  const button = target.querySelector("button");

  const { response: beforeResponse } = router.current();
  expect(beforeResponse.name).toBe("Home");

  expect(button.textContent).toBe("No op");

  router.navigate({ name: "Fast" });

  expect(button.textContent).toBe("Cancel");

  router.once(
    ({ response }) => {
      expect(response.name).toBe("Fast");
      expect(button.textContent).toBe("No op");
      done();
    },
    { initial: false }
  );
}
