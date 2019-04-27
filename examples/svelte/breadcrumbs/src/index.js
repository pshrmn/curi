import { browser } from "@hickory/browser";
import { createRouter } from "@curi/router";

import routes from "./routes";
import app from "./components/App.svelte";

const router = createRouter(browser, routes);


const target = document.getElementById("root");
const view = new app({ target, props: { router } });
