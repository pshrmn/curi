import { observable, action as mobxAction } from "mobx";

import { CuriRouter, Response } from "@curi/core";
import { Action } from "@hickory/root";

export default class CuriStore {
  router: CuriRouter;
  @observable response: Response;
  @observable action: Action;

  constructor(router: CuriRouter) {
    this.router = router;
    this.response = null;
    this.action = null;

    router.respond((response: Response, action: Action) => {
      this.update(response, action);
    });
  }

  @mobxAction.bound
  update(response: Response, action: Action) {
    this.response = response;
    this.action = action;
  }
}
