import Vue from "vue";
import Browser from "@hickory/browser";
import { curi } from "@curi/router";
import { CuriPlugin } from "@curi/vue";
import { parse, stringify } from "qs";

import routes from "./routes";
import store from "./store";
import App from "./components/App";

const history = Browser({
  query: { parse, stringify }
});
const router = curi(history, routes);

Vue.use(CuriPlugin, { router });

const vm = new Vue({
  el: "#app",
  store,
  template: "<app />",
  components: { app: App }
});
