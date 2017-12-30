import Vue from 'vue';

import { CuriRouter } from '@curi/core';
import { ReactiveCuriProps } from './interface';

export default function reactive(router: CuriRouter) {
  return new Vue({
    data: {
      router,
      response: null,
      action: null
    } as ReactiveCuriProps
  });
}
