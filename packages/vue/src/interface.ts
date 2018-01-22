import Vue from "vue";
import { CuriRouter, Response, Navigation } from "@curi/core";

export interface ReactiveResponse {
  response: Response;
  navigation: Navigation;
}

declare module "vue/types/vue" {
  interface Vue {
    $curi: ReactiveResponse;
    $router: CuriRouter;
  }
}
