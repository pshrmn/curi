import Vue from "vue";
import curi from "@curi/core";
import { CuriPlugin } from "@curi/vue";
import Browser from "@hickory/browser";

import routes from "./routes";
import App from "./components/App";

const history = Browser();
const router = curi(history, routes);

Vue.use(CuriPlugin, { router });

const vm = new Vue({
  el: "#app",
  template: "<app />",
  components: { app: App }
});
