import Vue from "vue";
import { curi } from "@curi/router";
import { CuriPlugin } from "@curi/vue";
import { Browser } from "@hickory/browser";

import routes from "./routes";
import App from "./components/App";

const router = curi(Browser, routes);

Vue.use(CuriPlugin, { router });

const vm = new Vue({
  el: "#app",
  template: "<app />",
  components: { app: App }
});
