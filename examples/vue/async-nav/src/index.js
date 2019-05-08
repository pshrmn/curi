import Vue from "vue";
import { browser } from "@hickory/browser";
import { createRouter, announce } from "@curi/router";
import { CuriPlugin } from "@curi/vue";

import routes from "./routes";
import app from "./components/app";

const router = createRouter(browser, routes, {
  sideEffects: [
    announce(({ response }) => {
      return `Navigated to ${response.location.pathname}`;
    })
  ]
});

Vue.use(CuriPlugin, { router });

router.once(() => {
  const vm = new Vue({
    el: "#app",
    template: "<app />",
    components: { app }
  });
});
