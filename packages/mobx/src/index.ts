import { observable, action as mobxAction } from "mobx";

import {
  CuriRouter,
  ResponseHandlerProps,
  Response,
  Navigation
} from "@curi/core";

export default class CuriStore {
  router: CuriRouter;
  @observable response: Response;
  @observable navigation: Navigation;

  constructor(router: CuriRouter) {
    this.router = router;
    this.response = null;
    this.navigation = null;

    router.respond(({ response, navigation }: ResponseHandlerProps) => {
      this.update(response, navigation);
    });
  }

  @mobxAction.bound
  update(response: Response, navigation: Navigation) {
    this.response = response;
    this.navigation = navigation;
  }
}
