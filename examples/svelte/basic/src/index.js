import Browser from "@hickory/browser";
import curi from "@curi/core";
import { Store } from "svelte/store";

import routes from "./routes";
import app from "./components/App.html";

const history = Browser();
const router = curi(history, routes);
const store = new Store({
  router,
  curi: { response: undefined, navigation: undefined }
});

let view;
const target = document.getElementById("root");

router.respond((response, navigation) => {
  store.set({ curi: { response, navigation } });
});

router.respond(
  () => {
    view = new app({ target, store });
  },
  { once: true }
);
