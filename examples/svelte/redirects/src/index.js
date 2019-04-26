import { browser } from "@hickory/browser";
import { createRouter } from "@curi/router";
import { curiStores } from "@curi/svelte";
import { parse, stringify } from "qs";

import routes from "./routes";
import app from "./components/App.svelte";

const router = createRouter(browser, routes, {
  invisibleRedirects: true,
  history: {
    query: { parse, stringify }
  }
});
const stores = curiStores(router);

const target = document.getElementById("root");
const view = new app({ target, props: { stores } });
