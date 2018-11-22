import InMemory from "@hickory/in-memory";
import { curi, prepareRoutes } from "@curi/router";
import { curiStore } from "@curi/svelte";

import app from "./app.html";
import cleanText from "../../../utils/cleanText";

const routes = prepareRoutes([
  { name: "Home", path: "" },
  {
    name: "Test",
    path: "test",
    resolve: {
      test: () => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve("done");
          }, 100);
        });
      }
    }
  },
  { name: "Not Found", path: "(.*)" }
]);

const history = InMemory();
const router = curi(history, routes);
const store = curiStore(router);

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
