import { browser } from "@hickory/browser";
import { createRouter } from "@curi/router";
import { curiStores } from "@curi/svelte";

import routes from "./routes";
import app from "./components/App.svelte";

const router = createRouter(browser, routes);
const stores = curiStores(router);

const target = document.getElementById("root");
const view = new app({ target, props: { stores } });
