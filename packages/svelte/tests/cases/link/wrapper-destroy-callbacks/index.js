import { inMemory } from "@hickory/in-memory";
import { createRouter, prepareRoutes } from "@curi/router";

import app from "./app.svelte";

/*
 * This test verifies that the Link does not update the wrapper's
 * state after the Link has been destroyed.
 *
 * The test relies on the wrapper calling a global method (console.warn)
 * when it updates. console.warn is mocked so that we can track its calls
 * to determine if it is called the expected number of times.
 */

const routes = prepareRoutes([
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

const router = createRouter(inMemory, routes);

export default function render(done) {
  const realWarn = console.warn;
  const stateTracker = (console.warn = jest.fn());

  const target = document.createElement("div");
  const application = new app.default({ target, props: { router } });
  const a = target.querySelector("a");

  expect(stateTracker.mock.calls.length).toBe(1);

  a.click();

  expect(stateTracker.mock.calls.length).toBe(2);

  application.destroy();

  router.once(
    ({ response }) => {
      expect(stateTracker.mock.calls.length).toBe(2);
      console.warn = realWarn;
      done();
    },
    { initial: false }
  );
}
