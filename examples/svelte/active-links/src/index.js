import { Browser } from "@hickory/browser";
import { curi } from "@curi/router";
import { curi_store } from "@curi/svelte";
import active from "@curi/route-active";

import routes from "./routes";
import app from "./components/App.html";

const router = curi(Browser, routes, {
  route: [active()]
});
const store = curi_store(router);

const target = document.getElementById("root");
const view = new app({ target, store });
