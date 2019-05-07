import { inMemory } from "@hickory/in-memory";
import { createRouter, prepareRoutes } from "@curi/router";

import app from "./app.svelte";

const routes = prepareRoutes([
  { name: "Home", path: "" },
  { name: "User", path: "u/:id" },
  { name: "Not Found", path: "(.*)" }
]);

const router = createRouter(inMemory, routes);

export default function render(done) {
  const target = document.createElement("div");

  const { navigation } = router.current();

  let calls = 0;

  new app.default({
    target,
    props: {
      router,
      check(value) {
        switch (calls++) {
          case 0:
            expect(value).toBe(navigation);
            break;
          case 1:
            expect(value).toMatchObject({
              action: "push",
              previous: {
                name: "Home"
              }
            });
            done();
        }
      }
    }
  });

  router.navigate({ url: "/u/1" });
}
