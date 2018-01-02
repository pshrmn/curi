import Vue from 'vue';

import { CuriRouter } from '@curi/core';
import { ReactiveCuriProps } from './interface';

export default function reactive() {
  return new Vue({
    data: {
      response: null,
      action: null
    } as ReactiveCuriProps
  });
}
