import Vue from "vue";
import Browser from "@hickory/browser";
import { CuriPlugin } from "@curi/vue";
import curi from "@curi/core";

import App from "./components/App";
import routes from "./routes";

const history = Browser();
const router = curi(history, routes);

Vue.use(CuriPlugin, { router });

router.respond(() => {
  const vm = new Vue({
    el: "#root",
    template: "<app />",
    components: { app: App }
  });
});
