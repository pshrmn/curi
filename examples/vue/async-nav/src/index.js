import Vue from "vue";
import { Browser } from "@hickory/browser";
import { curi } from "@curi/router";
import { CuriPlugin } from "@curi/vue";

import routes from "./routes";
import app from "./components/app";

const router = curi(Browser, routes);

Vue.use(CuriPlugin, { router });

router.once(() => {
  const vm = new Vue({
    el: "#app",
    template: "<app />",
    components: { app }
  });
});
