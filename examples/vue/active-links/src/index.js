import Vue from "vue";
import { Browser } from "@hickory/browser";
import { curi } from "@curi/router";
import { CuriPlugin } from "@curi/vue";
import active from "@curi/route-active";

import routes from "./routes";
import App from "./components/App";

const router = curi(Browser, routes, {
  route: [active()]
});

Vue.use(CuriPlugin, { router });

const vm = new Vue({
  el: "#app",
  template: "<app />",
  components: { app: App }
});
