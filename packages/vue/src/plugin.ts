import { CuriConfig } from '@curi/core';
import { PluginObject, PluginFunction } from 'vue';

import Link from './Link';
import Block from './Block';
import { CuriPluginObject } from './interface';

export interface CuriPluginOptions {
  curi: CuriPluginObject;
}

const CuriPlugin: PluginObject<CuriPluginOptions> = {
  install: function(_Vue, options: CuriPluginOptions) {
    _Vue.component(Link.name, Link);
    _Vue.component(Block.name, Block);

    _Vue.mixin({
      created: function() {
        this.$curi = options.curi;
      }
    });
  }
};

export default CuriPlugin;
