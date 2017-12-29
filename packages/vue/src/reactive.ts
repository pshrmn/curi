import Vue from 'vue';

import { CuriConfig } from '@curi/core';
import { ReactiveCuriProps } from './interface';

export default function reactive(config: CuriConfig) {
  return new Vue({
    data: {
      config,
      response: null,
      action: null
    } as ReactiveCuriProps
  });
}
