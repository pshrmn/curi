import { inMemory } from "@hickory/in-memory";
import { createRouter, prepareRoutes } from "@curi/router";

import app from "./app.svelte";
import cleanText from "../../../utils/cleanText";

const routes = prepareRoutes({
  routes: [
    { name: "Home", path: "" },
    {
      name: "Test",
      path: "test",
      resolve() {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve("done");
          }, 100);
        });
      }
    },
    { name: "Not Found", path: "(.*)" }
  ]
});

const router = createRouter(inMemory, routes);

export default function render(done) {
  const target = document.createElement("div");
  new app.default({ target, props: { router } });

  const a = target.querySelector("a");
  expect(cleanText(a.textContent)).toBe("false Test");

  a.click();

  expect(cleanText(a.textContent)).toBe("true Test");

  router.once(
    ({ response }) => {
      expect(response.name).toBe("Test");
      expect(cleanText(a.textContent)).toBe("false Test");
      done();
    },
    { initial: false }
  );
}
