import { inMemory } from "@hickory/in-memory";
import { createRouter, prepareRoutes } from "@curi/router";

import app from "./app.svelte";

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

/*
 * This test verifies that the Link does not update the wrapper's
 * state after the Link has been destroyed.
 *
 * The test relies on the wrapper calling a global method (console.warn)
 * when it updates. console.warn is mocked so that we can track its calls
 * to determine if it is called the expected number of times.
 */

let routes = prepareRoutes([
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

let router = createRouter(inMemory, routes);

export default function render(done) {
  let realWarn = console.warn;
  let stateTracker = (console.warn = jest.fn());

  let target = document.createElement("div");
  let application = new app.default({ target, props: { router } });

  router.once(
    ({ response }) => {
      expect(stateTracker.mock.calls.length).toBe(2);
      console.warn = realWarn;
      done();
    },
    { initial: false }
  );

  let a = target.querySelector("a");

  expect(stateTracker.mock.calls.length).toBe(1);

  a.click();
  sleep().then(() => {
    expect(stateTracker.mock.calls.length).toBe(2);
    application.$destroy();
  });
}
