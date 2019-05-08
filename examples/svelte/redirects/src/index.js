import { browser } from "@hickory/browser";
import { createRouter, announce } from "@curi/router";
import { parse, stringify } from "qs";

import routes from "./routes";
import app from "./components/App.svelte";

const router = createRouter(browser, routes, {
  invisibleRedirects: true,
  history: {
    query: { parse, stringify }
  },
  sideEffects: [
    announce(({ response }) => {
      return `Navigated to ${response.location.pathname}`;
    })
  ]
});

const target = document.getElementById("root");
const view = new app({ target, props: { router } });
