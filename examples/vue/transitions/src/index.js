import Vue from "vue";
import { Browser } from "@hickory/browser";
import { create_router } from "@curi/router";
import { CuriPlugin } from "@curi/vue";

import routes from "./routes";
import App from "./components/App";

const router = create_router(Browser, routes);

Vue.use(CuriPlugin, { router });

const vm = new Vue({
  el: "#app",
  template: "<app />",
  components: { app: App }
});
