import { browser } from "@hickory/browser";
import { create_router } from "@curi/router";
import { curi_store } from "@curi/svelte";
import { Store } from "svelte/store";
import { parse, stringify } from "qs";

import routes from "./routes";
import app from "./components/App.html";

const router = create_router(browser, routes, {
  emit_redirects: false,
  history: {
    query: { parse, stringify }  
  }
});
const store = curi_store(router);

const target = document.getElementById("root");
const view = new app({ target, store });
