import Vue from 'vue';
import Link from './Link';

const CuriPlugin = {

  install: function(Vue, options) {
    Vue.Curi = options.config;
    Vue.component(Link.name, Link);
  }
};

export default CuriPlugin;
