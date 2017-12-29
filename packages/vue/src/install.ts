import Vue from 'vue';
import CuriPlugin from './plugin';
import reactiveCuri from './reactive';

import { CuriConfig, Response } from '@curi/core';
import { Action } from '@hickory/root';

export default function install(_Vue: typeof Vue, config: CuriConfig): void {
  let curi = reactiveCuri(config);
  _Vue.use(CuriPlugin, { curi });

  config.respond((response: Response, action: Action): void => {
    curi.response = response;
    curi.action = action;
  });
}
