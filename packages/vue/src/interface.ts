import Vue from 'vue';
import { CuriConfig, Response } from '@curi/core';
import { Action } from '@hickory/root';

export interface CuriPluginObject {
  config: CuriConfig;
  response: Response;
  action: Action;
}

declare module 'vue/types/vue' {
  interface Vue {
    $curi: CuriPluginObject;
  }
}
