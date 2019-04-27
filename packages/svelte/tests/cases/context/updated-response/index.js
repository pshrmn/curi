import { inMemory } from "@hickory/in-memory";
import { createRouter, prepareRoutes } from "@curi/router";

import app from "./app.svelte";

const routes = prepareRoutes({
  routes: [
    { name: "Home", path: "" },
    { name: "User", path: "u/:id" },
    { name: "Not Found", path: "(.*)" }
  ]
});

const router = createRouter(inMemory, routes);

export default function render(done) {
  const target = document.createElement("div");

  const { response } = router.current();

  let calls = 0;

  new app.default({
    target,
    props: {
      router,
      check(value) {
        switch (calls++) {
          case 0:
            expect(value).toBe(response);
            break;
          case 1:
            expect(value).toMatchObject({
              name: "User",
              params: { id: "1" }
            });
            done();
        }
      }
    }
  });

  router.navigate({ url: "/u/1" });
}
