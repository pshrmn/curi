import Vue from "vue";
import { createRouter, announce } from "@curi/router";
import { CuriPlugin } from "@curi/vue";
import { browser } from "@hickory/browser";

import routes from "./routes";
import App from "./components/App";

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
  template: "<App />",
  components: { App }
});
