import { browser } from "@hickory/browser";
import { createRouter } from "@curi/router";
import { curiStore } from "@curi/svelte";
import { parse, stringify } from "qs";

import routes from "./routes";
import app from "./components/App.html";

const router = createRouter(browser, routes, {
  invisibleRedirects: true,
  history: {
    query: { parse, stringify }
  }
});
const store = curiStore(router);

const target = document.getElementById("root");
const view = new app({ target, store });
