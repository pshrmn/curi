import Vue from "vue";
import { createRouter } from "@curi/router";
import { CuriPlugin } from "@curi/vue";
import { browser } from "@hickory/browser";

import routes from "./routes";
import App from "./components/App";

const router = createRouter(browser, routes);

Vue.use(CuriPlugin, { router });

const vm = new Vue({
  el: "#app",
  template: "<App />",
  components: { App }
});
