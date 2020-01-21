import Vue from "vue";
import { browser } from "@hickory/browser";
import { createRouter, announce } from "@curi/router";
import { CuriPlugin } from "@curi/vue";

import routes from "./routes";
import app from "./components/app";

let router = createRouter(browser, routes, {
  sideEffects: [
    announce(({ response }) => {
      return `Navigated to ${response.location.pathname}`;
    })
  ]
});

Vue.use(CuriPlugin, { router });

router.once(() => {
  let vm = new Vue({
    el: "#app",
    template: "<app />",
    components: { app }
  });
});
