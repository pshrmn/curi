import Vue from "vue";
import { browser } from "@hickory/browser";
import { createRouter } from "@curi/router";
import { CuriPlugin } from "@curi/vue";

import routes from "./routes";
import app from "./components/app";

const router = createRouter(browser, routes);

Vue.use(CuriPlugin, { router });

router.once(() => {
  const vm = new Vue({
    el: "#app",
    template: "<app />",
    components: { app }
  });
});
