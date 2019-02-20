import { Browser } from "@hickory/browser";
import { curi } from "@curi/router";
import { curiStore } from "@curi/svelte";
import { Store } from "svelte/store";
import active from "@curi/route-active";

import routes from "./routes";
import app from "./components/App.html";

const history = Browser();
const router = curi(history, routes, {
  route: [active()]
});
const store = curiStore(router);

const target = document.getElementById("root");
const view = new app({ target, store });
