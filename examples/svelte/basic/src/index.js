import { browser } from "@hickory/browser";
import { create_router } from "@curi/router";
import { curi_store } from "@curi/svelte";

import routes from "./routes";
import app from "./components/App.html";

const router = create_router(browser, routes);
const store = curi_store(router);

const target = document.getElementById("root");
const view = new app({ target, store });
