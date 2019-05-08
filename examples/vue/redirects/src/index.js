import Vue from "vue";
import { browser } from "@hickory/browser";
import { createRouter, announce } from "@curi/router";
import { CuriPlugin } from "@curi/vue";
import { parse, stringify } from "qs";

import routes from "./routes";
import store from "./store";
import App from "./components/App";

const router = createRouter(browser, routes, {
  history: {
    query: { parse, stringify }
  },
  sideEffects: [
    announce(({ response }) => {
      return `Navigated to ${response.location.pathname}`;
    })
  ]
});

Vue.use(CuriPlugin, { router });

const vm = new Vue({
  el: "#app",
  store,
  template: "<app />",
  components: { app: App }
});
