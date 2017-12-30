import Vue from 'vue';
import CuriPlugin from './plugin';
import reactiveCuri from './reactive';

import { CuriRouter, Response } from '@curi/core';
import { Action } from '@hickory/root';

export default function install(_Vue: typeof Vue, router: CuriRouter): void {
  let curi = reactiveCuri(router);
  _Vue.use(CuriPlugin, { curi });

  router.respond((response: Response, action: Action): void => {
    curi.response = response;
    curi.action = action;
  });
}
