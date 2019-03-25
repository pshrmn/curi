import Vue from "vue";
import { browser } from "@hickory/browser";
import { create_router } from "@curi/router";
import { CuriPlugin } from "@curi/vue";
import { parse, stringify } from "qs";

import routes from "./routes";
import store from "./store";
import App from "./components/App";

const router = create_router(browser, routes, {
  history: {
    query: { parse, stringify }
  }
});

Vue.use(CuriPlugin, { router });

const vm = new Vue({
  el: "#app",
  store,
  template: "<app />",
  components: { app: App }
});
