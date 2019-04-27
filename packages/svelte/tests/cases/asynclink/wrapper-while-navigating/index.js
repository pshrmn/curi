import { inMemory } from "@hickory/in-memory";
import { createRouter, prepareRoutes } from "@curi/router";

import app from "./app.svelte";
import cleanText from "../../../utils/cleanText";

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

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

  router.once(
    ({ response }) => {
      sleep().then(() => {
        expect(response.name).toBe("Test");
        expect(cleanText(a.textContent)).toBe("false Test");
        done();
      });
    },
    { initial: false }
  );

  const a = target.querySelector("a");
  expect(cleanText(a.textContent)).toBe("false Test");

  a.click();
  sleep().then(() => {
    expect(cleanText(a.textContent)).toBe("true Test");
  });
}
