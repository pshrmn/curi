import { CuriConfig } from '@curi/core';
import Vue, { PluginObject, VueConstructor } from 'vue';

import Link from './Link';
import Block from './Block';
import { ReactiveCuriProps } from './interface';

export interface CuriPluginOptions {
  curi: ReactiveCuriProps;
}

const CuriPlugin: PluginObject<CuriPluginOptions> = {
  install: function(_Vue: typeof Vue, options: CuriPluginOptions) {
    _Vue.component(Link.name, Link);
    _Vue.component(Block.name, Block);

    _Vue.mixin({
      beforeCreate: function() {
        this.$curi = options.curi;
      }
    });
  }
};

export default CuriPlugin;
