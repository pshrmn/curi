import { browser } from "@hickory/browser";
import { createRouter, announce } from "@curi/router";

import routes from "./routes";
import app from "./components/App.svelte";

let router = createRouter(browser, routes, {
  sideEffects: [
    announce(({ response }) => {
      return `Navigated to ${response.location.pathname}`;
    })
  ]
});

let target = document.getElementById("root");
let view = new app({ target, props: { router } });
