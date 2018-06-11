import Vue, { PluginObject } from "vue";

import Link from "./Link";
import Block from "./Block";

import focus from "./focus";

import { CuriRouter } from "@curi/router";
import { ReactiveResponse } from "./interface";

export interface CuriPluginOptions {
  router: CuriRouter;
}

const CuriPlugin: PluginObject<CuriPluginOptions> = {
  install: function(_Vue: typeof Vue, options: CuriPluginOptions) {
    _Vue.component(Link.name, Link);
    _Vue.component(Block.name, Block);

    _Vue.directive("curi-focus", focus);

    // create a reactive object so that components will receive
    // the new response/navigation when a new response is emitted
    const reactive: ReactiveResponse = new Vue({
      data: { response: null, navigation: null }
    });

    options.router.respond(
      ({ response, navigation }) => {
        reactive.response = response;
        reactive.navigation = navigation;
      },
      { observe: true }
    );

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
