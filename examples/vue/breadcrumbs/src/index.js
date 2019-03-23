import Vue from "vue";
import { create_router } from "@curi/router";
import { CuriPlugin } from "@curi/vue";
import { Browser } from "@hickory/browser";
import ancestors from "@curi/route-ancestors";

import App from "./components/App";
import routes from "./routes";

/*
 * A simple router interaction that will enable adding a dynamic title
 * to routes, which can be useful for creating links. This
 * relies on the user adding a "title" property to their routes'
 * "extra" property. This should be a function that receives
 * parameters and returns a string. This is most likely route
 * params, but you can pass an object containing any values that
 * you want.
 */
function titleText() {
  let routes = {};
  return {
    name: "title",
    register: route => {
      let { name, extra } = route;
      routes[name] = extra && extra.title;
    },
    get: (name, params) => {
      const titleFn = routes[name];
      return titleFn ? titleFn(params) : name;
    },
    reset: () => {
      routes = {};
    }
  };
}

const router = create_router(Browser, routes, {
  route: [ancestors(), titleText()]
});

Vue.use(CuriPlugin, { router });

const vm = new Vue({
  el: "#app",
  template: "<app />",
  components: { app: App }
});
