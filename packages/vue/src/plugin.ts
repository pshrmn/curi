import { CuriConfig } from '@curi/core';
import Vue, { PluginObject, PluginFunction, VueConstructor } from 'vue';

import Link from './Link';
import Block from './Block';
import { CuriPluginObject } from './interface';

export interface CuriPluginOptions {
  curi: CuriPluginObject;
}

interface VueUtil {
  defineReactive(
    obj: Object,
    key: string,
    val: any,
    customSetter?: Function,
    shallow?: boolean
  ): any;
}

interface VueWithUtil extends VueConstructor<Vue> {
  util: VueUtil;
}

const CuriPlugin: PluginObject<CuriPluginOptions> = {
  install: function(_Vue: VueWithUtil, options: CuriPluginOptions) {
    _Vue.component(Link.name, Link);
    _Vue.component(Block.name, Block);

    _Vue.mixin({
      beforeCreate: function() {
        _Vue.util.defineReactive(this, '$curi', options.curi);
      }
    });
  }
};

export default CuriPlugin;
