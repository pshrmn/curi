import Vue from 'vue';
import CuriPlugin from './plugin';
import { CuriConfig, Response } from '@curi/core';
import { Action } from '@hickory/root';
import { CuriPluginObject } from './interface';

export default function install(_Vue: typeof Vue, config: CuriConfig): void {
  let curi: CuriPluginObject = { config, response: null, action: null };
  _Vue.use(CuriPlugin, { curi });

  config.subscribe((response: Response, action: Action): void => {
    curi.response = response;
    curi.action = action;
  });
}
