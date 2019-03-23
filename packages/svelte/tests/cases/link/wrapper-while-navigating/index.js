import { InMemory } from "@hickory/in-memory";
import { create_router, prepare_routes } from "@curi/router";
import { curi_store } from "@curi/svelte";

import app from "./app.html";
import cleanText from "../../../utils/cleanText";

const routes = prepare_routes([
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
]);

const router = create_router(InMemory, routes);
const store = curi_store(router);

export default function render(done) {
  const target = document.createElement("div");
  new app({ target, store });

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
