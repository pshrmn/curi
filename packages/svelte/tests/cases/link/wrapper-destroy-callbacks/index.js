import InMemory from "@hickory/in-memory";
import { curi, prepareRoutes } from "@curi/router";
import { curiStore } from "@curi/svelte";

import app from "./app.html";
import cleanText from "../../../utils/cleanText";

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

const history = InMemory();
const router = curi(history, routes);
const store = curiStore(router);

export default function render(done) {
  const realWarn = console.warn;
  const stateTracker = (console.warn = jest.fn());

  const target = document.createElement("div");
  const application = new app({ target, store });
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
