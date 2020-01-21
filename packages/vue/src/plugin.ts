import Vue, { PluginObject } from "vue";

import Link from "./Link";
import AsyncLink from "./AsyncLink";
import focus from "./focus";

import { CuriRouter } from "@curi/types";
import { ReactiveResponse } from "./interface";

export interface CuriPluginOptions {
  router: CuriRouter;
}

let CuriPlugin: PluginObject<CuriPluginOptions> = {
  install: function(_Vue: typeof Vue, options: CuriPluginOptions) {
    _Vue.component(Link.name, Link);
    _Vue.component(AsyncLink.name, AsyncLink);

    _Vue.directive("curi-focus", focus);

    // create a reactive object so that components will receive
    // the new response/navigation when a new response is emitted
    let reactive: ReactiveResponse = new Vue({
      data: options.router.current()
    });

    options.router.observe(({ response, navigation }) => {
      reactive.response = response;
      reactive.navigation = navigation;
    });

    _Vue.mixin({
      beforeCreate: function() {
        this.$curi = reactive;
      }
    });

    Object.defineProperty(_Vue.prototype, "$router", {
      get() {
        return options.router;
      }
    });
  }
};

export default CuriPlugin;
