import Vue from "vue";
import Browser from "@hickory/browser";
import curi from "@curi/core";
import { CuriPlugin } from "@curi/vue";

import routes from "./routes";
import App from "./components/App";

const history = Browser();
const router = curi(history, routes);

Vue.use(CuriPlugin, { router });

router.respond(
  (response, navigation) => {
    const vm = new Vue({
      el: "#root",
      template: "<app />",
      components: { app: App }
    });
  },
  { once: true }
);
