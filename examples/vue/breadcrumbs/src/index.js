import Vue from "vue";
import { createRouter, announce } from "@curi/router";
import { CuriPlugin } from "@curi/vue";
import { browser } from "@hickory/browser";

import App from "./components/App";
import routes from "./routes";

let router = createRouter(browser, routes, {
  sideEffects: [
    announce(({ response }) => {
      return `Navigated to ${response.location.pathname}`;
    })
  ]
});

Vue.use(CuriPlugin, { router });

let vm = new Vue({
  el: "#app",
  template: "<app />",
  components: { app: App }
});
