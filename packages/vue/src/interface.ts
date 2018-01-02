import Vue from 'vue';
import { CuriRouter, Response } from '@curi/core';
import { Action } from '@hickory/root';

export interface ReactiveCuriProps {
  response: Response;
  action: Action;
}

declare module 'vue/types/vue' {
  interface Vue {
    $curi: ReactiveCuriProps;
    $router: CuriRouter;
  }
}
